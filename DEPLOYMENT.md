# Production Deployment Guide

This guide documents the exact step-by-step procedure to deploy the Threadit social platform to production using **Vercel** for the React frontend, **Render** for the Express backend, and **Supabase** for PostgreSQL database storage.

---

## 🌐 1. Frontend Deployment (Vercel)

### **Vercel Settings**
1. **Framework Preset**: `Other` or `Vite`
2. **Root Directory**: `artifacts/reddit-app` (or configure at the root level using our included [vercel.json](file:///d:/Projects/Reddit-Style-Social/vercel.json))
3. **Build Command**: `pnpm --filter @workspace/reddit-app build`
4. **Output Directory**: `dist/public` (or `artifacts/reddit-app/dist/public` if built from root)
5. **Install Command**: `pnpm install`

### **Required Production Environment Variables**
Configure these variables under Vercel project settings:
* `VITE_SUPABASE_URL`: Your production Supabase project API URL (e.g. `https://xxxx.supabase.co`).
* `VITE_SUPABASE_ANON_KEY`: Your production Supabase anonymous access key.
* `VITE_API_URL`: Your backend API Server base path on Render (e.g. `https://threadit-api.onrender.com/api`).
* `VITE_RAZORPAY_KEY_ID`: Your live Razorpay Public Key ID (starts with `rzp_live_` or `rzp_test_` during sandbox testing).

---

## 🎛️ 2. Backend Deployment (Render)

We provide two production-grade deployment options on Render: **Native Node.js Web Service** or **Docker Web Service**.

### **Option A: Native Node.js Web Service**
1. **Environment**: `Node`
2. **Build Command**: `pnpm install && pnpm --filter @workspace/api-server build && pnpm --filter @workspace/db build`
3. **Start Command**: `pnpm --filter @workspace/api-server start`
4. **Health Check Path**: `/health` (or `/api/health`)

### **Option B: Docker Web Service (Recommended)**
Render can build and host using the optimized multi-stage [api-server Dockerfile](file:///d:/Projects/Reddit-Style-Social/artifacts/api-server/Dockerfile) automatically.
1. **Environment**: `Docker`
2. **Docker Path**: `artifacts/api-server/Dockerfile`
3. **Docker Context**: `.` (Root Directory)

### **Required Production Environment Variables**
Configure these variables in your Render environment dashboard:
* `DATABASE_URL`: Production Postgres Connection String pointing to your Supabase instance.
* `SUPABASE_URL`: Production Supabase URL.
* `SUPABASE_SERVICE_ROLE_KEY`: Service role secret for secure server-side auth validation.
* `JWT_SECRET`: Random string for custom JWT validation.
* `RAZORPAY_KEY_ID`: Live Razorpay Key ID.
* `RAZORPAY_KEY_SECRET`: Live Razorpay Key Secret.
* `CORS_ORIGIN`: Set to your Vercel deployment URL (e.g. `https://threadit.vercel.app`) to strictly restrict API access to authorized domains.

---

## 🗄️ 3. Database Alignment & Migrations

The backend application contains automated database schema alignment logic. On initialization, it runs:
```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_plan TEXT NOT NULL DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS premium_until TIMESTAMP WITH TIME ZONE;
```
This guarantees that all payment-related columns are automatically created and structured on the production Postgres database upon the very first backend boot cycle!
