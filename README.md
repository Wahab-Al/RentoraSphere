
# RentoraSphere

A backend API for managing rental properties, contracts, and multi-role access control.

![Rentora Sphere Typing](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=00B4D8&width=435&lines=Welcome+to+Rentora+Sphere;Manage+Rentals+Seamlessly;Efficient+Resource+Tracking;Your+All-in-One+Rental+Solution)

 [![Postman Docs](https://img.shields.io/badge/Postman-Documentation-orange?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/51361413/2sBXcBnhaH)
 
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![npm version](https://img.shields.io/npm/v/your-package-name.svg)](https://www.npmjs.com/package/your-package-name)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red?logo=mongoose&logoColor=white)](https://mongoosejs.com)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud_DB-green?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
![Validation](https://img.shields.io/badge/validation-Zod-blue?style=flat-square&logo=zod)
[![JWT](https://img.shields.io/badge/JWT-Authentication-black?logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![Postman](https://img.shields.io/badge/Postman-API_Testing-orange?logo=postman&logoColor=white)](https://www.postman.com)
[![dotenv](https://img.shields.io/badge/dotenv-Environment_Variables-yellow?logo=dotenv&logoColor=black)](https://github.com/motdotla/dotenv)
[![argon2](https://img.shields.io/badge/argon2-Password_Hashing-blue)](https://www.npmjs.com/package/argon2)
[![NodeMailer](https://img.shields.io/badge/Nodemailer-Email_Service-green)](https://nodemailer.com)
[![Mailtrap](https://img.shields.io/badge/Mailtrap-Email_Testing-orange?logo=mailtrap&logoColor=white)](https://mailtrap.io)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232088FF.svg?style=flat-square&logo=githubactions&logoColor=white)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🔐 Security Stack
[![Helmet](https://img.shields.io/badge/Helmet-000000?logo=helmet&logoColor=white)](https://helmetjs.github.io/)
[![XSS Protection](https://img.shields.io/badge/XSS-Protection-blue?logo=security&logoColor=white)](https://owasp.org/www-community/attacks/xss/)
[![MongoDB Injection](https://img.shields.io/badge/NoSQL-Injection-green?logo=mongodb&logoColor=white)](https://owasp.org/www-community/attacks/NoSQL_Injection)
[![HPP](https://img.shields.io/badge/HPP-Protection-orange?logo=security&logoColor=white)](https://www.npmjs.com/package/hpp)
[![Rate Limiting](https://img.shields.io/badge/Rate-Limit-red?logo=fastapi&logoColor=white)](https://www.npmjs.com/package/express-rate-limit)

---

## The Problem

The real challenge wasn't just authentication. It was **authorization at the object level**: ensuring an owner can only manage their own units, a renter only sees their own contracts, and every state transition in a contract (request → approve/reject) is gated by the right party.

---

## The Solution

RentoraSphere models this as a three-role system with strict data isolation enforced at the query and service layer, not just at the route level.

Each role operates within a defined data boundary:

- **Renter** can browse units, submit rent requests, and track their own contracts
- **Owner** manages their listed units and has sole authority to approve or reject incoming contracts
- **sysManager** platform-wide admin access with no ownership restrictions

Contract state changes are handled through dedicated controllers (`approveContract`, `rejectContract`) with a subscriber pattern for side effects like email notifications keeping the business logic clean and the notification layer decoupled.

---

## Architecture

```
.
├── config/           # DB connection, environment setup
├── controllers/      # Route handlers, delegate to services
├── services/         # Business logic layer (contracts, units, users)
├── middlewares/      # Auth, RBAC enforcement, error handling, security
├── models/           # Mongoose schemas (User, Unit, Contract)
├── routes/           # Express routers
├── validators/       # Zod schemas for request validation
├── src/
│   └── server.js     # Entry point
└── .github/
    └── workflows/    # CI pipeline
```

The separation between controllers and services is intentional controllers handle request/response shaping, services own the actual data logic. This makes the business rules testable without spinning up an HTTP server.

---

## Tech Decisions

| Decision | Why |
|---|---|
| **argon2** over bcrypt | Better resistance against GPU-based attacks; current OWASP recommendation |
| **Zod** for validation | Schema-first validation with TypeScript-friendly inference; catches bad input before it hits the DB |
| **Mongoose** with explicit schemas | Enforces shape at the ORM layer; avoids schema drift in MongoDB |
| **express-rate-limit + hpp** | Prevents brute force and HTTP parameter pollution without external infrastructure |
| **Helmet + xss-clean + mongo-sanitize** | Defense-in-depth for common Node/Express attack vectors |
| **Nodemailer + Mailtrap** | Decoupled email service; Mailtrap keeps dev/staging environments safe from sending real emails |

---

## API Overview

Full documentation with request/response examples: **🌐[Postman Docs →](https://documenter.getpostman.com/view/51361413/2sBXcBnhaH)**

### Auth

| Method | Endpoint | Access |
|--------|----------|--------|
| `POST` | `/api/users/register` | Public |
| `POST` | `/api/users/login` | Public |
| `POST` | `/api/users/logout` | Authenticated |
| `POST` | `/api/users/logoutAll` | Authenticated |

### Units

| Method | Endpoint | Access |
|--------|----------|--------|
| `GET` | `/api/units/` | Public |
| `GET` | `/api/units/:id` | Public |
| `POST` | `/api/units/` | Owner only |
| `PATCH` | `/api/units/:id` | Owner (self) / sysManager |
| `DELETE` | `/api/units/:id` | Owner (self) / sysManager |

### Contracts

| Method | Endpoint | Access |
|--------|----------|--------|
| `POST` | `/api/contracts/request/:id` | Renter |
| `GET` | `/api/contracts/` | Parties involved / sysManager |
| `GET` | `/api/contracts/:id` | Parties involved / sysManager |
| `PATCH` | `/api/contracts/approve/:id` | Unit owner only |
| `PATCH` | `/api/contracts/reject/:id` | Unit owner only |

### Users

| Method | Endpoint | Access |
|--------|----------|--------|
| `GET` | `/api/users/` | Authenticated |
| `GET` | `/api/users/:id` | Authenticated |
| `PATCH` | `/api/users/:id` | Account owner |
| `DELETE` | `/api/users/:id` | Account owner / sysManager |

---

## Setup

**Clone and install**
```bash
git clone https://github.com/Wahab-Al/RentoraSphere.git
cd RentoraSphere
npm install
```

**Environment variables** — create a `.env` file:
```env
# Server
PORT=5001

# Database local or Atlas
MONGO_URI=mongodb://127.0.0.1:27017/rentorasphere
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/rentorasphere

# Auth
JWT_SECRET_KEY=your_secret_here

# Initial admin account
SYS_MANAGER_EMAIL=admin@rentora.com
SYS_MANAGER_PASS=AdminPassword123!

# Email (Mailtrap for dev)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
RENTORA_EMAIL=no-reply@rentora.com
```

**Run**
```bash
node src/server.js
```

---

## Security Stack

- JWT-based stateless auth with multi-session logout support
- argon2 password hashing
- Role-based access control (RBAC) with object-level isolation
- Helmet for HTTP security headers
- express-rate-limit for brute force protection
- mongo-sanitize to prevent NoSQL injection
- xss-clean for input sanitization
- hpp to prevent HTTP parameter pollution

---

## Screenshots: 📸
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/registerUser.png" alt="Register User" width="300"><img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/login.png" alt="Login" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/logout.png" alt="Logout" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/rentRequest.png" alt="Rent Request" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/rejectContract.png" alt="Reject Contract" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/approveContract.png" alt="Approve Contract" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/nodemailerRequest.png" alt="Email Request" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/nodemailerReject.png" alt="Email Reject" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/nodemailerApprove.png" alt="Email Approve" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/contractsList.png" alt="Contracts List" width="300">
<img src="https://raw.githubusercontent.com/Wahab-Al/RentoraSphere/8b54fc97d95d12763639aa628d99d080b1b8f267/postman/screenshots/UnitList.png" alt="Unit List" width="300">

## License

MIT
