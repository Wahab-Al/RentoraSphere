![Rentora Sphere Typing](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=00B4D8&width=435&lines=Welcome+to+Rentora+Sphere;Manage+Rentals+Seamlessly;Efficient+Resource+Tracking;Your+All-in-One+Rental+Solution)

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


# 🏢 Rentora Speher | Advanced Property Management API

**Rentora** is a robust property management backend designed to streamline the rental process between owners and tenants. This project focuses on **high data integrity**, **secure authentication**, and **seamless rental contract workflows**, providing a scalable foundation for modern real estate platforms.


## Live API Documentation 🚀
#### [🌐Explore Live Site](https://documenter.getpostman.com/view/51361413/2sBXcBnhaH)



## 🎯 Core Objectives
* **Streamlined Operations:** Automating the lifecycle of rental agreements from creation to termination.
* **Data Integrity:** Ensuring that all rental agreements, user roles, and financial records are validated.
* **Security First:** Implementing secure authentication and strict object-level authorization.

---

## 🚀 Key Technical Features

### 🔐 Secure Multi-Tenancy & Authorization
Rentora implements strict **Object-Level Authorization** to ensure data isolation:
* **Tenants:** Can only access their own rent requests and active contracts.
* **Owners:** Can manage their own units and have exclusive rights to approve/reject contracts for their properties.
* **System Managers:** Retain global administrative oversight.
* **ID Isolation:** Internal `.filter()` logic ensures users never retrieve data belonging to others.

### 📝 Contract Lifecycle Management
implemented is a robust state-machine logic for handling contracts:
* **Workflow:** Dedicated controllers for `rejectContract` and `approveContract`.
* **Subscribers Pattern:** Event-driven architecture to handle side effects like notifications when contract statuses change.
* **Validation:** Custom checks to prevent unauthorized data manipulation.

---

## 📚 API Documentation

The API follows RESTful principles. All protected endpoints require: 
- a valid **Bearer Token** in the Authorization header.
- Role-based access control (RBAC) is enforced where applicable (Renter(User), Owner, sysManager).

### 🔐 Authentication
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:5001/api/users/register` | Register a new user | Public |
| `POST` | `http://localhost:5001/api/users/login` | Authenticate & receive JWT | Public |
| `POST` | `http://localhost:5001/api/users/logout` | Invalidate current session token | Private/ Authenticated |
| `POST` | `http://localhost:5001/api/users/logoutAll` | Invalidate all active sessions for this user | Private/ Authenticated |

### 🏠 Units (Properties)
| Method | Endpoint | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:5001/api/units/` | List all available units | Public |
| `GET` | `http://localhost:5001/api/units/:id` | Get specific unit details | Public |
| `POST` | `http://localhost:5001/api/units/` | Add a new property unit | **Owner Only** |
| `PATCH` | `http://localhost:5001/api/units/:id` | Update unit details | **Owner (Self) / sysManager** |
| `DELETE` | `http://localhost:5001/api/units/:id` | Remove a unit listing | **Owner (Self) / sysManager** |

### 📜 Rent Contracts
| Method | Endpoint | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `POST` | `http://localhost:5001/api/contracts/request/:id` | Create a new rent request | **Renter** |
| `GET` | `http://localhost:5001/api/contracts/` | List filtered contracts | **Renter/Owner (Self) / sysManager** |
| `GET` | `http://localhost:5001/api/contracts/:id` | Get specific contract | **Parties involved / sysManager** |
| `PATCH` | `http://localhost:5001/api/contracts/approve/:id` | approve a contract | **Unit Owner Only** |
| `PATCH` | `http://localhost:5001/api/contracts/reject/:id` | Reject a contract | **Unit Owner Only** |

### 👤 Users
| Method | Endpoint | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `GET` | `http://localhost:5001/api/users/` | Get users profile info | Authorized Users |
| `GET` | `http://localhost:5001/api/users/:id` | Get user profile info | Authorized Users |
| `PATCH` | `http://localhost:5001/api/users/:id` | Update user profile info | Authorized Users |
| `DELETE`| `http://localhost:5001/api/users/:id` | Delete account | **Account Owner / sysManager** |


---

## Environement Setup(.env)
#### --- Server Configuration ---
PORT=`5001`

#### --- Database Configuration ---
##### Local Database (Uncomment to use)
MONGO_URI=`mongodb://127.0.0.1:27017/rentorasphere`
##### MongoDB Atlas (Cloud)
MONGO_URI=`mongodb+srv://<username>:<password>@cluster.mongodb.net/rentorasphere?retryWrites=true&w=majority`

#### --- Security & Authentication ---
JWT_SECRET_KEY=`your_super_secret_random_string_here`

#### --- Initial System Manager (sysManager) Credentials ---
SYS_MANAGER_EMAIL=`admin@rentora.com` 

SYS_MANAGER_PASS=`AdminPassword123!`

#### --- Email Service Configuration (Mailtrap) ---
EMAIL_HOST=`sandbox.smtp.mailtrap.io`

RENTORA_EMAIL=`no-reply@rentora.com`

EMAIL_PORT=`2525`

EMAIL_USER=`your_mailtrap_user_id`

EMAIL_PASS=`your_mailtrap_password`


## 🛠 Standard Response Patterns

### ✅ Success Response
```json
{
  "message": "Operation successful",
  "data": { ... }
}

```
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


---
# 🏗 Installation & Setup:

### Clone the Repository
```bash
git clone https://github.com/wahab-al/rentora-sphere.git

```
### Install Dependencies
npm install

## Run the Server:
node src/server.js

---
License: 📄⚖️
MIT  License

---
## 🧪 API Testing (Postman)
/docs/Rentora_Sphere.postman_collection.json

![Tests](https://img.shields.io/badge/Jest-coming_soon-yellow?style=flat-square&logo=jest)
[![Docker](https://img.shields.io/badge/docker-coming_soon-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)
