# 💧 SparkWash — Full-Stack Service Business App

A complete multi-location service business website with booking system, admin panel, and AI chat.

---

## 📁 Project Structure

```
service-app/
├── backend/          ← Node.js + Express API  → deploy to Render
│   ├── models/
│   │   ├── Booking.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── bookings.js
│   │   └── auth.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/         ← Next.js app           → deploy to Vercel
    ├── app/
    │   ├── page.jsx              (Home)
    │   ├── services/page.jsx
    │   ├── pricing/page.jsx
    │   ├── contact/page.jsx
    │   ├── booking/page.jsx
    │   ├── admin/
    │   │   ├── login/page.jsx
    │   │   └── dashboard/page.jsx
    │   ├── api/chat/route.js     (AI chatbot proxy)
    │   └── layout.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   ├── BookingForm.jsx
    │   ├── ChatBot.jsx
    │   └── FloatingButtons.jsx
    ├── .env.local.example
    └── package.json
```

---

## 🚀 Running Locally (Beginners Start Here)

### Prerequisites
- Node.js v18+ installed → https://nodejs.org
- A free MongoDB Atlas account → https://mongodb.com/atlas
- (Optional) An OpenAI API key → https://platform.openai.com

### Step 1 — Set up MongoDB Atlas
1. Sign up free at https://mongodb.com/atlas
2. Create a free **M0 cluster**
3. Click **Connect** → **Drivers** → copy the connection string
4. Replace `<password>` with your DB user password
5. Go to **Network Access** → add `0.0.0.0/0` (allow all IPs)

### Step 2 — Set up the Backend

```bash
cd backend
npm install

# Copy the example env file
cp .env.example .env

# Edit .env and fill in your values:
# MONGODB_URI=mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/serviceapp
# JWT_SECRET=any_long_random_string_here
# ADMIN_EMAIL=admin@yourbusiness.com
# ADMIN_PASSWORD=YourSecurePassword123

npm run dev
# Server starts at http://localhost:5000
```

### Step 3 — Create your Admin Account (do once)

Open your browser and visit:
```
http://localhost:5000/api/auth/seed
```
This creates the admin user from your .env credentials.

### Step 4 — Set up the Frontend

```bash
cd frontend
npm install

# Copy the example env file
cp .env.local.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NEXT_PUBLIC_WHATSAPP_NUMBER=12125550000
# NEXT_PUBLIC_PHONE_NUMBER=+12125550000
# OPENAI_API_KEY=sk-your-key-here   (optional — chatbot still works without it)

npm run dev
# Frontend starts at http://localhost:3000
```

---

## ☁️ Deployment

### Deploy Backend to Render (free)

1. Push the `backend/` folder to a GitHub repository
2. Go to https://render.com → **New** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `backend`  (if in a monorepo)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add Environment Variables in the Render dashboard:
   ```
   MONGODB_URI       = mongodb+srv://...
   JWT_SECRET        = your_secret_here
   ADMIN_EMAIL       = admin@yourbusiness.com
   ADMIN_PASSWORD    = YourPassword123
   FRONTEND_URL      = https://your-app.vercel.app
   PORT              = 5000
   ```
6. Click **Create Web Service** — wait ~2 min for deploy
7. Your backend URL will be: `https://your-service.onrender.com`
8. Visit `https://your-service.onrender.com/api/auth/seed` **once** to create admin

### Deploy Frontend to Vercel (free)

1. Push the `frontend/` folder to a GitHub repository
2. Go to https://vercel.com → **Add New Project**
3. Import your GitHub repository
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL         = https://your-service.onrender.com
   NEXT_PUBLIC_WHATSAPP_NUMBER = 12125550000
   NEXT_PUBLIC_PHONE_NUMBER    = +12125550000
   OPENAI_API_KEY              = sk-...
   ```
5. Click **Deploy** — done! Your site will be live at `https://your-app.vercel.app`

### Connect Frontend ↔ Backend

The only connection needed is:
- `NEXT_PUBLIC_API_URL` in Vercel = your Render backend URL
- `FRONTEND_URL` in Render = your Vercel frontend URL (for CORS)

---

## 🔑 Admin Panel

1. Go to `https://your-app.vercel.app/admin/login`
2. Login with the email/password from your `.env`
3. You can:
   - View all bookings across all branches
   - Filter by branch and status
   - Update booking status (pending → confirmed → completed)
   - Edit booking details
   - Delete bookings

---

## 🤖 AI Chatbot

The chatbot is powered by OpenAI GPT-3.5-turbo. It knows:
- All your services and prices
- Branch locations and hours
- How to guide customers to book

To customize it, edit the `SYSTEM_PROMPT` in:
`frontend/app/api/chat/route.js`

If you don't have an OpenAI key, the chatbot shows a friendly "not configured" message.

---

## 🎨 Customisation

### Change business name / branding
- Search and replace `SparkWash` across all files
- Update colours: the main blue is `#2563eb`, dark navy is `#1e3a8a`
- Update the emoji 💧 in Navbar and layout

### Change services / branches
- `frontend/components/BookingForm.jsx` — BRANCHES and SERVICES arrays
- `frontend/app/page.jsx` — branches and services sections
- `frontend/app/pricing/page.jsx` — pricing table
- `frontend/app/api/chat/route.js` — SYSTEM_PROMPT for the AI

### Change WhatsApp / phone numbers
- Update `NEXT_PUBLIC_WHATSAPP_NUMBER` and `NEXT_PUBLIC_PHONE_NUMBER` in `.env.local`

---

## 🛠 Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | Next.js 14 (App Router)|
| Backend    | Node.js + Express      |
| Database   | MongoDB + Mongoose     |
| Auth       | JWT (jsonwebtoken)     |
| AI Chat    | OpenAI GPT-3.5-turbo   |
| Frontend Host | Vercel (free)       |
| Backend Host  | Render (free)       |
| DB Host       | MongoDB Atlas (free)|

---

## ❓ Common Issues

**"Cannot connect to backend"**
→ Check that `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL exactly (no trailing slash)

**"Invalid token" on admin dashboard**
→ Log out and log back in. Tokens expire after 7 days.

**Chatbot not responding**
→ Make sure `OPENAI_API_KEY` is set in Vercel environment variables (not just `.env.local`)

**MongoDB connection error**
→ Check your Atlas connection string, and make sure your IP is whitelisted (use `0.0.0.0/0` for all IPs)

**Render backend "spinning up" slowly**
→ Free tier Render services sleep after 15 min of inactivity. First request takes ~30 sec to wake up. Upgrade to paid for always-on.
