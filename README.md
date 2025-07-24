# 🧾 Subscription Tracker – Backend

This is the **Express.js backend** for a Subscription Tracker app — a RESTful API that allows users to manage their subscriptions and automatically sends reminder emails **5, 7, and 2 days before** a subscription is due. It's designed to help users avoid missed renewals for services like Netflix, Spotify, and more.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** Custom (via middleware)
- **Development Tool:** Nodemon
- **Environment Variables:** Managed via `.env`

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/allyssasalvacion/subscription-tracker.git
   cd subscription-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file based on `.env.example` (see below)

4. **Run the server:**

   ▶️ For production:
   ```bash
   npm start
   ```

   🛠️ For development (with hot-reloading):
   ```bash
   npm run dev
   ```

---

## 🌐 API Endpoints

### 🔐 Auth Routes (`/auth`)
| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | `/auth/sign-up`  | Register a new user   |
| POST   | `/auth/sign-in`  | Log in a user         |
| POST   | `/auth/sign-out` | Log out a user        |

### 👤 User Routes (`/users`)
| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| GET    | `/users`         | Get all users                     |
| GET    | `/users/:id`     | Get a user by ID *(auth required)*|
| POST   | `/users`         | Create a new user *(placeholder)* |
| PUT    | `/users/:id`     | Update a user *(placeholder)*     |
| DELETE | `/users/:id`     | Delete a user *(placeholder)*     |

### 💳 Subscription Routes (`/subscriptions`)
| Method | Endpoint                          | Description                                |
|--------|-----------------------------------|--------------------------------------------|
| GET    | `/subscriptions`                 | Get all subscriptions                      |
| GET    | `/subscriptions/:id`             | Get subscription by ID *(auth required)*   |
| GET    | `/subscriptions/user/:id`        | Get all subscriptions for a user *(auth)*  |
| POST   | `/subscriptions`                 | Create a subscription *(auth required)*    |
| PUT    | `/subscriptions/:id`             | Update a subscription *(auth required)*    |
| PUT    | `/subscriptions/:id/cancel`      | Cancel a subscription *(auth required)*    |
| DELETE | `/subscriptions/:id`             | Delete a subscription *(auth required)*    |

### 🔁 Workflow Routes (`/subscription/reminder`)
| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/subscription/reminder`    | Trigger reminder logic   |

---

## 🧑‍💻 Author

**Allyssa Salvacion**  
🔗 [https://github.com/allyssasalvacion](https://github.com/allyssasalvacion)
