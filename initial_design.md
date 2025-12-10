# Social Media Academy – Initial Design Summary

## 1. What the site does

Social Media Academy is a learning website that helps users understand how to use social media safely and confidently, especially when they are unfamiliar with online slang or platform norms.

The main goals are:

- Provide a **slang dictionary** that explains common internet slang and abbreviations used on platforms like Instagram, TikTok, YouTube, and Discord.
- Teach **safety concepts** such as privacy, sensitive content, and how to avoid harmful interactions.
- Use light, game-like interactions (for example a Rock–Paper–Scissors mini-game) to keep the experience engaging instead of intimidating.

My motivation for building this site comes from my research experience (e.g., with Dr. Xinru Page’s lab), where I saw how confusing online spaces can be for international students and neurodivergent users. I want to turn that research and my coursework into a practical “academy” that actually helps people learn how to navigate social media.

---

## 2. Privacy and user identification (UUID)

To protect user privacy, the site does **not** rely on real names or raw emails for analytics and rankings.

- Every user is represented internally by a **UUID**.
- Page sessions, game rounds, slang submissions, and leaderboard entries are all tied to this UUID.
- The leaderboard shows contribution rankings without exposing sensitive personal information.

This lets me analyze behavior and reward contributions while still respecting anonymity.

---

## 3. Core features

1. **Slang Dictionary**
   - Browse slang terms with definitions, example sentences, and platform tags.
   - Support for hiding/revealing sensitive content with buttons so users are not forced to see it immediately.

2. **User Contributions + Admin Review**
   - Regular users can submit new slang entries (term, definition, example, platform, etc.).
   - Submissions are stored in a pending state.
   - Admin users review and either approve or reject these submissions.
   - Approved submissions become part of the main dictionary.

3. **Leaderboard / Ranking**
   - Tracks how many approved slang entries each user has contributed.
   - Displays a ranking list (by UUID-based identity) to encourage high-quality contributions.
   - Helps build a community feeling around teaching and learning slang.

4. **Game & Interaction Tracking**
   - A Rock–Paper–Scissors mini-game is used as a fun learning element.
   - Game rounds and page sessions are recorded so I can understand how people interact with the site.

---

## 4. Technologies used

- **Frontend**
  - React application.
  - UI for dictionary, contribution form, leaderboard, platform-specific learning pages, and mini-game.

- **Hosting & CI/CD**
  - **AWS Amplify** as the main entry point:
    - Connects to the GitHub repo.
    - Automatically builds and deploys the site on push.
    - Manages environment configuration and custom domain.

- **Authentication**
  - Amplify/Cognito (or similar) to handle sign-up and login.
  - Mapping from the authenticated identity to an internal UUID used throughout the database.

- **Backend & Data**
  - API layer for:
    - Fetching dictionary terms and leaderboard.
    - Submitting slang.
    - Admin approval actions.
    - Recording page sessions and game rounds.
  - Database tables for:
    - Users (UUID-based)
    - Pages and page_sessions
    - Games and game_rounds
    - Slang entries and submissions
    - Leaderboard entries

More implementation details and technologies (libraries, configuration, etc.) are in the code here:  
`https://github.com/StevenChengCCC/Social-Media-Academy`.
![Screenshot 2025-12-08 at 18.11.48.png](Screenshot%202025-12-08%20at%2018.11.48.png)