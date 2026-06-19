# Routes - AI Course Builder (Version 1)

## Authentication Routes

### GET /

Displays the landing page containing:

* Login Form
* Registration Form

Purpose:
Allows new users to create an account and existing users to log in.

---

### POST /register

Handles user registration.

Request Body:

```json
{
  "fullname": "",
  "email": "",
  "password": ""
}
```

Responsibilities:

* Validate user input
* Check if user already exists
* Hash password using bcrypt
* Create user account
* Generate JWT token
* Store token in cookie

---

### POST /login

Handles user login.

Request Body:

```json
{
  "email": "",
  "password": ""
}
```

Responsibilities:

* Verify email exists
* Compare password using bcrypt
* Generate JWT token
* Store token in cookie

---

### GET /logout

Logs the user out.

Responsibilities:

* Clear JWT cookie
* Redirect to landing page

---

## Roadmap Routes

### GET /home

Protected Route

Displays roadmap generation form.

Fields:

* Domain
* Goal
* Current Level
* Daily Study Hours
* Target Duration (Months)

Purpose:
Collect learning requirements from the user.

---

### POST /roadmap

Protected Route

Generates a personalized roadmap.

Responsibilities:

* Collect user inputs
* Generate AI prompt
* Send prompt to Gemini
* Receive AI response
* Save roadmap to database
* Display generated roadmap

---

### GET /roadmaps

Protected Route

Displays all roadmaps created by the currently logged-in user.

Purpose:
Acts as a personal roadmap dashboard.

---

### GET /roadmaps/:roadmapId

Protected Route

Displays a specific roadmap.

Responsibilities:

* Verify roadmap belongs to logged-in user
* Fetch roadmap from database
* Render roadmap details

---

# Route Summary

GET     /
POST    /register
POST    /login
GET     /logout

GET     /home
POST    /roadmap

GET     /roadmaps
GET     /roadmaps/:roadmapId
