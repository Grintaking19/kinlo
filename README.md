# Kinlo

**Connect. Share. Belong.**
---

Kinlo is a modern full-stack social networking platform built to demonstrate production-grade software engineering. Beyond implementing core social features, the project focuses on scalability, maintainability, and distributed system design by evolving from a PERN monolith into an event-driven microservices architecture.

## Features

* 👤 **Modern identity & authentication** — Secure authentication powered by **Clerk** with support for email, social logins, profile management, and session handling. Authentication is decoupled from the application, allowing the platform to focus on business logic while maintaining enterprise-grade security.

* 📰 **Rich social experience** — Create text and image posts, like content, join conversations through comments, and share 24-hour stories. Kinlo is designed around meaningful interactions rather than simple content publishing.

* 🏠 **Personalized home feed** — Content is delivered through a follow-based timeline with efficient cursor pagination for smooth infinite scrolling. Future iterations evolve into a recommendation-driven feed powered by user activity and engagement signals.

* 💬 **Real-time communication** — Instant messaging is powered by **Socket.io**, enabling low-latency conversations without page refreshes. The real-time infrastructure is designed to expand into notifications, presence indicators, voice notes, and video calling.

* 📷 **Intelligent media pipeline** — Images are optimized and transformed using **ImageKit** for fast delivery. Future versions introduce a dedicated media service responsible for video uploads, streaming, and transcoding with AWS S3 and FFmpeg.

* 🔍 **Fast search & discovery** — Search users and content using PostgreSQL Full-Text Search, with a planned migration to dedicated search engines such as Meilisearch or Elasticsearch for scalable indexing and advanced discovery.

* 👥 **Communities & relationships** *(Planned)* — Build communities beyond individual connections through public groups, shared interests, mutual connections, and richer social graph features.

* ⚡ **Background processing** — Long-running operations such as media transformations, Clerk synchronization, and asynchronous workflows are executed through **Inngest**, keeping the application responsive while simplifying backend workflows.

* 🐇 **Event-driven architecture** *(Phase 2)* — Kinlo evolves from a modular PERN monolith into independently deployable microservices communicating through **RabbitMQ**, demonstrating real-world distributed system design and asynchronous event processing.

* 🏗️ **Scalable by design** — Rather than starting with unnecessary complexity, Kinlo intentionally demonstrates the architectural journey from a monolith to microservices, highlighting clean boundaries, database-per-service patterns, and API gateway design.

* 🧠 **Personalized recommendations** *(Phase 3)* — User interactions are analyzed to generate personalized feeds and content recommendations using background processing, Redis caching, and recommendation algorithms.

* 🎥 **Real-time voice & video** *(Phase 3)* — Expand conversations beyond text with voice notes, peer-to-peer audio/video calls, and real-time media streaming built on WebRTC technologies.

---
