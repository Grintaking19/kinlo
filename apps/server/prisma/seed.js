import config from "../src/config/config.js";
import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";

const adapter = new PrismaPg({
  connectionString: config.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log:
    config.NODE_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
});

// Seed data configuration
const NUM_USERS = 15;
const NUM_FOLLOWS_PER_USER = 5;
const MAX_POSTS_PER_USER = 10;
const MAX_COMMENTS_PER_POST = 5;
const REPLY_PROBABILITY = 0.3;

// Pick a random subset of an array
function pickRandom(arr, count) {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

async function clearDatabase() {
  console.log("Clearing database...");

  // Order matters due to foreign key constraints
  // children should be deleted before parents
  await prisma.like.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.story.deleteMany();
  await prisma.media.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();
}

async function seedUsers() {
  console.log(`Seeding ${NUM_USERS} users...`);
  const users = [];
  for (let i = 0; i < NUM_USERS; i++) {
    const fullName = faker.person.fullName();
    const user = await prisma.user.create({
      data: {
        clerkId: `user_${faker.string.alphanumeric(24)}`,
        email: faker.internet.email(),
        fullName: `${fullName}`,
        avatarUrl: faker.image.avatar(),
        bio: faker.helpers.maybe(() => faker.lorem.sentence(), {
          probability: 0.7,
        }),
        location: faker.helpers.maybe(() => faker.location.city(), {
          probability: 0.5,
        }),
        work: faker.helpers.maybe(() => faker.person.jobTitle(), {
          probability: 0.5,
        }),
        education: faker.helpers.maybe(
          () => `${faker.location.city()} University`,
          { probability: 0.5 },
        ),
        birthday: faker.helpers.maybe(
          () => faker.date.birthdate({ min: 18, max: 65 }),
          { probability: 0.5 },
        ),
      },
    });
    users.push(user);
  }
  return users;
}

async function seedFollows(users) {
  console.log(`Seeding follows...`);
  const pairs = new Set();
  const data = [];
  for (const user of users) {
    const condidates = users.filter((usr) => usr.id !== user.id);
    const follows = pickRandom(condidates, NUM_FOLLOWS_PER_USER);
    for (const followee of follows) {
      const pairKey = `${user.id}-${followee.id}`;
      if (!pairs.has(pairKey)) {
        pairs.add(pairKey);
        data.push({
          followerId: user.id,
          followeeId: followee.id,
        });
      }
    }
  }
  await prisma.follow.createMany({ data, skipDuplicates: true });
  console.log(`Seeded ${data.length} follows.`);
}

async function seedPosts(users) {
  console.log(`Seeding posts...`);
  const posts = [];
  for (const user of users) {
    const numPosts = faker.number.int({ min: 1, max: MAX_POSTS_PER_USER });
    for (let i = 0; i < numPosts; i++) {
      const post = await prisma.post.create({
        data: {
          userId: user.id,
          content: faker.lorem.paragraphs({ min: 1, max: 3 }),
          createdAt: faker.date.recent({ days: 30 }),
        },
      });
      posts.push(post);
    }
  }
  console.log(`Seeded ${posts.length} posts.`);
  return posts;
}

async function seedComments(posts, users) {
  console.log(`Seeding comments...`);
  let count = 0;
  for (const post of posts) {
    const numComments = faker.number.int({
      min: 0,
      max: MAX_COMMENTS_PER_POST,
    });
    for (let i = 0; i < numComments; i++) {
      const user = faker.helpers.arrayElement(users);
      const comment = await prisma.comment.create({
        data: {
          postId: post.id,
          userId: user.id,
          content: faker.lorem.sentences({ min: 1, max: 2 }),
        },
      });
      count++;
      // Optionally, add replies to comments
      if (faker.datatype.boolean({ probability: REPLY_PROBABILITY })) {
        const replier = faker.helpers.arrayElement(users);
        await prisma.comment.create({
          data: {
            postId: post.id,
            userId: replier.id,
            content: faker.lorem.sentences({ min: 1, max: 2 }),
            parentCommentId: comment.id,
          },
        });
        count++;
      }
    }
  }
  console.log(`Seeded ${count} comments.`);
}

async function main() {
  await clearDatabase();
  const users = await seedUsers();
  await seedFollows(users);
  const posts = await seedPosts(users);
  await seedComments(posts, users);
  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Error occurred while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
