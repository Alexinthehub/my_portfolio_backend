# Portfolio Backend API

The backend API for my personal portfolio website. Built with Node.js, Express, and MongoDB. Handles all data storage, authentication, and email notifications.

🔗 **Live API:** [https://my-portfolio-backend-k2ym.onrender.com](https://my-portfolio-backend-k2ym.onrender.com)

---

## 🛠️ Tech Stack

| Layer              | Technology    |
| :----------------- | :------------ |
| **Runtime**        | Node.js       |
| **Framework**      | Express.js    |
| **Database**       | MongoDB Atlas |
| **ODM**            | Mongoose      |
| **Authentication** | JWT           |
| **Email**          | Resend API    |

---

## 📡 API Endpoints

| Method | Endpoint                         | Description              | Auth |
| :----- | :------------------------------- | :----------------------- | :--- |
| GET    | `/api/profile`                   | Get profile data         | ❌   |
| PUT    | `/api/profile`                   | Update profile           | ✅   |
| GET    | `/api/projects`                  | Get all projects         | ❌   |
| POST   | `/api/projects`                  | Add a project            | ✅   |
| DELETE | `/api/projects/:id`              | Delete a project         | ✅   |
| POST   | `/api/contact`                   | Send a contact message   | ❌   |
| GET    | `/api/contact`                   | Get all messages         | ✅   |
| DELETE | `/api/contact/:id`               | Delete a message         | ✅   |
| GET    | `/api/current-projects`          | Get current projects     | ❌   |
| POST   | `/api/current-projects`          | Add a current project    | ✅   |
| DELETE | `/api/current-projects/:id`      | Delete a current project | ✅   |
| PUT    | `/api/current-projects/:id/star` | Add a star to a project  | ❌   |
| GET    | `/api/certificates`              | Get all certificates     | ❌   |
| POST   | `/api/certificates`              | Add a certificate        | ✅   |
| DELETE | `/api/certificates/:id`          | Delete a certificate     | ✅   |
| POST   | `/api/admin/login`               | Admin login              | ❌   |

---

## 🗄️ Database Models

| Model              | Collection        | Description                                                |
| :----------------- | :---------------- | :--------------------------------------------------------- |
| **Profile**        | `profiles`        | User profile data (name, bio, skills, social links)        |
| **Project**        | `projects`        | Portfolio projects (title, description, tech stack, links) |
| **ContactMessage** | `contactmessages` | Messages from the contact form                             |
| **CurrentProject** | `currentprojects` | Vision page projects with status and star count            |
| **Certificate**    | `certificates`    | Certificates with issuer, date, verify link                |

---

## 🔐 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication.

### Login Flow

1. POST to `/api/admin/login` with email and password
2. Server validates credentials against `.env`
3. Server returns a JWT token
4. Include token in `Authorization: Bearer <token>` header for protected routes

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/Alexinthehub/my_portfolio_backend.git
cd my_portfolio_backend

# Install dependencies
npm install

# Create .env file (see below)
# Run the server
npm run dev
# API runs on http://localhost:5001
🔧 Environment Variables
Create a .env file in the root directory:

env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio_db
JWT_SECRET=your_super_secret_key
ADMIN_EMAIL=your_email@gmail.com
ADMIN_PASSWORD=your_secure_password
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
RESEND_SENDER_EMAIL=onboarding@resend.dev
RECIPIENT_EMAIL=your_email@gmail.com
📦 Deployment
This API is deployed on Render with automatic deployments from GitHub.

Live API: https://my-portfolio-backend-k2ym.onrender.com

Health Check: https://my-portfolio-backend-k2ym.onrender.com/api/health

📝 License
This project is open source and available under the MIT License.

Built with ❤️ by Alex Mwendwa
```
