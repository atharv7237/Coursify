# AI Course Builder - Version 1 Features

## 1. User Authentication & Authorization

Users will be able to create an account, log in securely, and access their personalized learning roadmaps. Authentication will be implemented using JWT tokens and cookies, while authorization will ensure that users can only access and manage their own generated roadmaps.

### Objectives

* User Registration
* User Login
* User Logout
* Protected Routes
* Secure Password Storage using bcrypt

---

## 2. Goal & Learning Preference Collection

The system will collect information from the user regarding their learning objectives and study preferences. This information will be used to generate a personalized roadmap.

### Data Collected

* Career Goal (e.g., MERN Developer, Data Analyst, DevOps Engineer)
* Current Skill Level (Beginner, Intermediate, Advanced)
* Daily Study Hours
* Preferred Learning Duration (optional future feature)

### Purpose

To understand the user's learning requirements and provide a roadmap tailored to their situation.

---

## 3. AI Prompt Generation

Based on the information provided by the user, the backend will dynamically generate a structured prompt for the AI model. The generated prompt will contain all necessary context to produce a high-quality learning roadmap.

### Example Input

* Goal: MERN Developer
* Level: Beginner
* Study Time: 2 Hours/Day

### Example Prompt

Create a detailed 12-week roadmap for a beginner who wants to become a MERN Stack Developer and can study 2 hours per day. Include weekly topics, milestones, and suggested projects.

### Purpose

To transform user preferences into an AI-friendly format that produces accurate and useful roadmaps.

---

## 4. Roadmap Generation & Display

The AI-generated roadmap will be displayed in a structured and easy-to-read format. Users should be able to clearly understand what they need to learn and in what sequence.

### Features

* Week-wise Learning Plan
* Learning Milestones
* Recommended Mini Projects
* Clean and Readable Layout

### Purpose

To provide users with a clear learning path instead of forcing them to search for resources and roadmaps manually.

---

# Version 1 Scope

The first version focuses only on generating and displaying personalized learning roadmaps.

### Included

* Authentication
* User Preference Collection
* AI Prompt Generation
* Roadmap Display

### Excluded (Future Versions)

* Progress Tracking
* AI Chatbot
* Course Recommendations
* Resume Analysis
* Internship Recommendations
* Project Suggestions
* Community Features
