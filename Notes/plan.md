# Step 1: Define the Problem

### Problem Statement

Students often know their goal but don't know:

* What to learn
* In what order
* How long it will take
* What projects to build

As a result, they waste time consuming content instead of learning systematically.

---

# Step 2: Define the MVP

Ask yourself:

> If I had only 2 days, what is the smallest useful version?

For me:

### Input

User enters:

* Goal
* Current Level
* Study Hours Per Day

Example:

```text
Goal: MERN Developer

Level: Beginner

Hours: 2
```

---

### Output

AI returns:

```text
Week 1:
HTML

Week 2:
CSS

Week 3:
JavaScript

...
```

That's enough.

If this works:

✅ Project works

---

# Step 3: Decide Features

For V1:

### Feature 1

User Authentication

```text
Register
Login
Logout
```

You already know JWT and Cookies.

---

### Feature 2

Roadmap Generator

User submits:

```text
Goal
Level
Hours
```

Backend sends prompt to Gemini.

---

### Feature 3

Save Roadmap

Store generated roadmap.

---

### Feature 4

My Roadmaps

User can view previous roadmaps.

---

# Step 4: Database Design

You should already start thinking about models.

### User Model

```js
{
 fullname,
 email,
 password
}
```

---

### Roadmap Model

```js
{
 userId,
 goal,
 level,
 hours,
 roadmap,
 createdAt
}
```

Notice:

One user can have many roadmaps.

---

# Step 5: Routes

Think before coding.

### Auth

```text
POST /register

POST /login

GET /logout
```

---

### Roadmap

```text
POST /roadmap/generate

GET /roadmap/all

GET /roadmap/:id
```

---

# Step 6: Pages

Only 4 pages.

### Home

Generate roadmap.

---

### Login

Login form.

---

### Register

Register form.

---

### Dashboard

Saved roadmaps.

---

# Step 7: AI Flow

This is the important part.

User:

```text
Goal: MERN Developer

Level: Beginner

Hours: 2
```

↓

Backend

↓

Gemini Prompt

↓

Gemini Response

↓

Save Response

↓

Display Response

---

# Step 8: Things NOT To Build

This is important.

Do NOT build:

❌ Progress tracking

❌ Resume Analyzer

❌ Course Recommendation Engine

❌ Project Recommendation

❌ Chatbot

❌ Dark/Light Themes

❌ Notifications

❌ Admin Panel

These are future features.

---

If I were you, today's work would end with:

```text
Notion Page Created

Features Finalized

Routes Planned

Database Models Planned

Gemini Prompt Draft Ready
```

and **zero coding** until all of that is clear.

That's exactly how real projects avoid becoming messy halfway through.
