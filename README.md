# Threadit Social Platform

Threadit is a premium, state-of-the-art Reddit-style social media platform engineered with absolute performance, reliability, and security in mind. It is structured as a robust monorepo built using TypeScript, Node.js, React, and Supabase.

---

## 🛠️ Tech Stack & Services

### **Frontend**
* **Core**: React 19, TypeScript
* **Routing**: Wouter (Single Page App routing)
* **Styling**: Tailwind CSS
* **State Management**: Zustand
* **Animation**: Framer Motion
* **API Client**: Axios + TanStack React Query

### **Backend**
* **Framework**: Node.js + Express
* **Database Driver**: Drizzle ORM
* **Logging**: Pino HTTP (Structured logger)
* **Security & Performance**: Helmet, CORS, Compression

### **Infrastructure**
* **Database**: PostgreSQL (Supabase)
* **Payment Gateway**: Razorpay (Direct Orders & HMAC Signature Verification)
* **Frontend Hosting**: Vercel
* **Backend Hosting**: Render / Docker Containers

---

## 📁 Project Structure

```text
├── artifacts/
│   ├── reddit-app/         # Frontend React + Vite app
│   ├── api-server/         # Express API Server
│   └── mockup-sandbox/     # Isolated UI sandbox and mockups
├── lib/
│   ├── db/                 # Database schema definitions and Drizzle migration scripts
│   ├── api-spec/           # Reusable API routes specs
│   └── api-zod/            # Zod validation schemas
├── package.json            # Monorepo Workspace configuration
└── pnpm-workspace.yaml     # Workspace packages manifest
```

---

## 🚀 Getting Started

### **1. Install Dependencies**
Ensure you have `pnpm` installed globally:
```bash
npm install -g pnpm
pnpm install
```

### **2. Setup Environment Variables**
Copy the environment template files and fill in your keys:
```bash
cp .env.production.example .env
```

### **3. Start Development Server**
Launch both frontend and backend in parallel development mode:
```bash
pnpm run dev
```

* **Frontend**: [http://localhost:5173](http://localhost:5173)
* **Backend**: [http://localhost:5000](http://localhost:5000)
* **Sandbox**: [http://localhost:5174](http://localhost:5174)

### **4. Build for Production**
Generate production-ready optimized build bundles:
```bash
pnpm run build
```
