# Social Media Academy – Final Project Report

GitHub repo: https://github.com/StevenChengCCC/Social-Media-Academy  
Demo site: https://www.socialmediaacademy.click/  *(if currently deployed)*

---

## 1. Link to final report markdown file

This file (`final_report.md`) serves as the final written report for the project.  
GitHub link (once committed):  
`https://github.com/StevenChengCCC/Social-Media-Academy/blob/main/final_report.md`

---

## 2. Summary of the project (1–3 sentences)

Social Media Academy is a web application that teaches users how to understand and safely navigate social media by explaining online slang, sensitive language, and basic safety concepts. The site provides a slang dictionary, a contribution + moderation workflow, and a leaderboard that rewards helpful contributions while protecting user privacy through UUID-based identities. The application is built and deployed with AWS Amplify and is designed to be a friendly “training ground” for platforms like Instagram, TikTok, YouTube, and Discord.

---

## 3. Diagrams, demo video, gifs, etc.

- **ERD / data model diagram**  
  - Rock–Paper–Scissors game, users, pages, sessions, and rounds ERD:  
![Screenshot 2025-12-08 at 18.11.48.png](Screenshot%202025-12-08%20at%2018.11.48.png)
- **System / architecture sketch (text)**  
  - React SPA frontend hosted on AWS Amplify → backend APIs → database for users, slang entries, submissions, leaderboard, game rounds, and page sessions.

## 4. What did you learn in this project?

- How to design and implement a full-stack feature set that goes beyond “toy CRUD,” including submission workflows, admin moderation, and a contribution-based leaderboard.
- How to deploy a modern React application using AWS Amplify, connect it to GitHub, and reason about build pipelines, hosting, and environment configuration.
- How to translate HCI / UX research questions (e.g., making online spaces safer and more understandable) into concrete product features and data models.

---

## 5. Does your project integrate with AI in any interesting way?

The current deployed version of Social Media Academy does **not** directly call AI models in the user-facing flows yet. However, the data model and UX are designed so that AI assistance could be added later, for example:

- Suggesting candidate definitions or example sentences for new slang submissions.
- Automatically flagging potentially sensitive or unsafe content for admin review.
- Recommending related slang terms or safety tips based on what a user is currently reading.

---

## 6. How did you use AI to assist in building your project?

I used AI (primarily ChatGPT) as a development assistant throughout the project in several ways:
- **Frontend and architecture guidance** – Asked for help structuring React components, thinking through routing, and understanding how best to use AWS Amplify (CI/CD, hosting, and environment configuration).
- **Debugging and “rubber ducking”** – Used AI to reason through error messages, deployment issues, and small logic bugs more quickly than by trial-and-error alone.
- **Copywriting and UX text** – Refined explanatory text for the dictionary, privacy explanations, buttons that hide/reveal sensitive content, and high-level documentation so the site is easier for non-technical users to understand. (my english is not good)

All final design and implementation decisions were still made by me, but AI tools made it faster to explore options and iterate.

---

## 7. Why this project is interesting to me

This project sits exactly at the intersection of things I care about: computer science, human–computer interaction, and inclusive digital spaces. As an international student who had to learn both a new language and a new online culture, I know how confusing and overwhelming social media can be. Working in Dr. Xinru Page’s lab also showed me how design choices can accidentally exclude neurodivergent users. Social Media Academy lets me turn those experiences into a concrete product: a safer, more understandable “training space” where people can learn the language and unwritten rules of social media before they are thrown into real platforms.

---

## 8. Key learnings from the project (at least 3)

1. **Product thinking matters as much as code.**  
   Designing the slang submission + moderation + leaderboard flow forced me to think about incentives, abuse prevention, and user motivation, not just database fields and API routes.

2. **Privacy needs to be designed into the data model early.**  
   Committing to UUID-based user identities and avoiding direct exposure of emails/usernames in analytics changed how I structured the tables and queries, but it led to a cleaner and safer design.

3. **Cloud deployment is a living part of the project, not an afterthought.**  
   Working with AWS Amplify (and occasionally breaking my build) taught me how important it is to understand hosting, CI/CD, and environment variables, even for student projects.

4. **Documentation is a real feature.**  
   Writing markdown design docs, ERD descriptions, and summaries made it much easier to explain the project to others and to keep myself aligned on what I was building.

---

## 9. Architecture, scaling, performance, and authentication

- **Hosting & scaling**
  - The frontend is a React single-page application hosted via AWS Amplify, which in turn uses S3 + CloudFront under the hood. This gives me automatic horizontal scaling for static assets and global CDN caching without manual server management.
- **Backend behavior**
  - The app is designed so that most reads (slang dictionary, leaderboard, pages) are lightweight and cacheable.
  - Writes (submissions, approvals, game rounds) are relatively low volume and can be handled by a single backend/API instance in typical class-project scenarios, but the design could be moved behind a managed service (e.g., API Gateway + Lambda or a containerized service) for higher traffic.
- **Authentication**
  - Authentication is managed through AWS Amplify / Cognito, providing hosted sign-up / sign-in, password management, and token-based authentication.
  - Each authenticated user is then mapped to an internal UUID that is used everywhere in the data model; this prevents direct use of raw identity fields in analytics tables, logs, and leaderboard data.
- **Concurrency & consistency**
  - Operations like “approve slang submission and update leaderboard” are modeled as single logical transactions at the application level: when an admin approves a submission, the system inserts the slang into the main dictionary and increments the user’s contribution count.
  - For the current project scale, a single-writer pattern is sufficient; in a higher-traffic scenario, a message queue or background job could be used to decouple moderation actions from leaderboard updates.
- **Failover & reliability (conceptual)**
  - Because the frontend is static and hosted via CloudFront/S3, it is inherently resilient: even if the backend is temporarily unavailable, users can still load the site, navigate pages, and see cached data.
  - For production-level reliability, I would add monitoring, health checks on backend APIs, and a simple “degraded mode” message when write operations fail.

---

## 11. Sharing permission

**Yes, share.**  
I am comfortable with the instructors sharing this repo or taking a pull request from this project as an example for future students.
