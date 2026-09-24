import type { Prisma} from "../../generated/prisma/client.js"

const authUserSelect = {
    id: true,
    username: true,
} satisfies Prisma.UserSelect

export type AuthUser = Prisma.UserGetPayload<{select : typeof authUserSelect}>
