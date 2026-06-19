# PayrollPro — Employee Payroll & Attendance Dashboard

A full-featured HR management web app built with **React 19**. It simulates a real company payroll system with two user roles — an **HR Manager** who manages staff, attendance, and payroll, and an **Employee** who clocks in/out and views their own payslip.

This project was built as a portfolio piece to demonstrate practical, business-level frontend engineering skills — not a toy clone, but a system with real RBAC, state management, routing, and data export.

---

## Table of Contents

- [What This Project Demonstrates](#what-this-project-demonstrates)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [How to Download / Clone](#how-to-download--clone)
- [How to Run Locally](#how-to-run-locally)
- [Demo Login Accounts](#demo-login-accounts)
- [How to Build for Production](#how-to-build-for-production)
- [How to Deploy](#how-to-deploy)
- [Payroll Calculation Logic](#payroll-calculation-logic)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## What This Project Demonstrates

| Skill | Where it shows up |
|---|---|
| Role-Based Access Control (RBAC) | Login page + protected routes redirect users based on role |
| Global state management | `Context API` + `useReducer` (no prop drilling) |
| Client-side routing | `React Router v7` with protected/guarded routes |
| Component architecture | Reusable `Button`, `Badge`, `Modal`, `StatCard`, `Toast` components |
| CSS architecture | CSS Modules — scoped styles, no class name collisions |
| Real-time UI | Live clock with `setInterval` + proper cleanup in `useEffect` |
| CRUD operations | Add / edit / remove employees |
| Data filtering & search | Search and filter on Employees and Attendance pages |
| File export | Generates and downloads a real `.csv` payroll file using the Blob API |
| Business logic | UK-style payroll deductions (Income Tax 20% + National Insurance 12%) |
| Accessibility | Semantic HTML, `aria-*` attributes, keyboard-dismissible modals |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| UI Library | [React](https://react.dev) | 19.2 |
| Routing | [React Router](https://reactrouter.com) | 7.18 |
| Build Tool | [Vite](https://vitejs.dev) | 8.0 |
| Styling | CSS Modules (vanilla CSS, no framework) | — |
| Linting | ESLint | 10.3 |
| Package Manager | npm | 9+ |
| Language | JavaScript (JSX) | ES2022+ |

No UI component library (no MUI/Bootstrap/Tailwind) is used — every component, including the design system (colors, spacing, typography tokens), was built from scratch in `src/styles/global.css`.

---

## Features

### HR Manager view
- **Overview** — live KPI cards: total employees, total hours, gross payroll, net payroll
- **Employees** — add, edit, and remove staff; search by name/email; filter by department
- **Attendance Log** — every clock-in/out record; search by name, filter by month
- **Payroll** — automatic tax/NI deduction calculations per employee, monthly totals, and **one-click CSV export**

### Employee view
- **Clock In / Out** — live ticking clock, session timer, one-tap clock-in/out that writes directly to the attendance log
- **My Payslip** — auto-generated payslip showing hours worked, gross pay, tax, NI, and net pay

### Shared
- Toast notifications for every action (add employee, clock in, export CSV, errors, etc.)
- Fully responsive layout (sidebar collapses on smaller screens)
- Protected routes — employees can't access HR pages and vice versa, even by typing the URL directly

---

## Project Structure

```
payrollpro/
├── index.html                     # HTML entry point
├── package.json                   # Dependencies + scripts
├── vite.config.js                 # Vite configuration
├── eslint.config.js               # Linting rules
│
├── public/                        # Static assets
│
└── src/
    ├── main.jsx                   # React app entry — mounts <App /> with BrowserRouter
    ├── App.jsx                    # Top-level router, protected routes, dashboard layout
    ├── App.module.css             # Layout shell styling
    │
    ├── context/
    │   └── AppContext.jsx         # Global state: auth, employees, attendance, toasts (useReducer)
    │
    ├── data/
    │   └── seedData.js            # Seed/demo data: employees, attendance records, demo users
    │
    ├── utils.js                   # Pay calculations, currency/date formatting, CSV generator
    │
    ├── styles/
    │   └── global.css             # Design tokens — colors, spacing, typography (CSS variables)
    │
    ├── components/
    │   ├── Sidebar.jsx            # Role-aware navigation sidebar
    │   ├── Sidebar.module.css
    │   └── ui/                    # Reusable UI primitives
    │       ├── Button.jsx / .module.css
    │       ├── Badge.jsx / .module.css
    │       ├── StatCard.jsx / .module.css
    │       ├── Modal.jsx / .module.css
    │       └── Toast.jsx / .module.css
    │
    └── pages/
        ├── Login.jsx               # Role selection + sign-in (RBAC entry point)
        ├── Login.module.css
        ├── Overview.jsx            # HR — dashboard summary
        ├── Employees.jsx           # HR — employee CRUD table
        ├── Attendance.jsx          # HR — attendance log table
        ├── Payroll.jsx             # HR — payroll table + CSV export
        ├── ClockPage.jsx           # Employee — clock in/out + shift log
        ├── Clock.module.css
        ├── Payslip.jsx             # Employee — payslip view
        ├── Payslip.module.css
        └── Pages.module.css        # Shared table/filter-bar styling across HR pages
```

---

## Prerequisites

Before you start, make sure you have these installed on your computer:

| Tool | Minimum Version | Check with | Download |
|---|---|---|---|
| Node.js | 18.x or higher | `node -v` | [nodejs.org](https://nodejs.org) |
| npm | 9.x or higher (comes with Node.js) | `npm -v` | included with Node.js |
| Git | any recent version | `git -v` | [git-scm.com](https://git-scm.com) |

> If `node -v` or `npm -v` returns "command not found," install Node.js from the link above — npm comes bundled with it.

---

## How to Download / Clone

### Option A — Clone with Git (recommended)

```bash
git clone https://github.com/YOUR_USERNAME/payrollpro.git
cd payrollpro
```

### Option B — Download as ZIP (no Git required)

1. Go to the GitHub repository page
2. Click the green **Code** button
3. Click **Download ZIP**
4. Extract the ZIP file anywhere on your computer
5. Open a terminal and `cd` into the extracted `payrollpro` folder

---

## How to Run Locally

Once you're inside the project folder (`cd payrollpro`):

```bash
# Step 1 — Install all dependencies
npm install

# Step 2 — Start the local development server
npm run dev
```

After running `npm run dev`, your terminal will show something like:

```
  VITE v8.0.12  ready in 320 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **http://localhost:5173** in your browser — the app will load with hot-reload enabled (any code change refreshes the browser automatically).

To stop the server, press `Ctrl + C` in the terminal.

---

## Demo Login Accounts

The app uses simulated/demo accounts — no real backend or database, no signup needed. Just pick a role and account on the login screen:

| Name | Role | What they can access |
|---|---|---|
| Sarah Johnson | HR Manager | Overview, Employees, Attendance, Payroll |
| James Carter | Employee | Clock In/Out, My Payslip |
| Priya Patel | Employee | Clock In/Out, My Payslip |
| Marcus Brown | Employee | Clock In/Out, My Payslip |
| Aisha Khan | Employee | Clock In/Out, My Payslip |

All data resets when you refresh the page, since it's stored in memory (React state) rather than a database — this is intentional for a portfolio/demo project.

---

## How to Build for Production

To create an optimized, production-ready build:

```bash
npm run build
```

This generates a `dist/` folder containing static HTML/CSS/JS files ready to be hosted anywhere.

To preview the production build locally before deploying:

```bash
npm run preview
```

---

## How to Deploy

### Deploy to Vercel (recommended — free, fastest)

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts — Vercel auto-detects Vite and configures everything.

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Click **Deploy**

### Deploy to GitHub Pages

```bash
npm run build
npm install -g gh-pages
gh-pages -d dist
```

---

## Payroll Calculation Logic

Every payslip and payroll row uses this formula (`src/utils.js`):

```js
const gross = hoursWorked * hourlyRate
const tax   = gross * 0.20   // 20% Income Tax
const ni    = gross * 0.12   // 12% National Insurance
const net   = gross - tax - ni
```

---

## Available Scripts

| Command | What it does |
|---|---|
| `npm install` | Installs all project dependencies |
| `npm run dev` | Starts the local dev server with hot reload |
| `npm run build` | Builds an optimized production bundle into `/dist` |
| `npm run preview` | Serves the production build locally to test before deploying |
| `npm run lint` | Runs ESLint to check code quality |

---

## Troubleshooting

**`npm install` fails or hangs**
Delete `node_modules` and `package-lock.json`, then try again:
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use**
Vite will automatically try the next available port (5174, 5175, etc.) — check your terminal output for the actual URL.

**Blank white page after `npm run dev`**
Open your browser's developer console (F12) and check for errors — usually a missing dependency. Re-run `npm install`.

**"command not found: npm"**
Node.js isn't installed. Download and install it from [nodejs.org](https://nodejs.org), then restart your terminal.

---

## Author

**Koushik Kuppala**
Frontend Developer — React.js · Next.js · TypeScript

- LinkedIn: [linkedin.com/in/YOUR_PROFILE](https://linkedin.com)
- Portfolio: [your-portfolio-link.vercel.app](https://vercel.com)
- GitHub: [github.com/YOUR_USERNAME](https://github.com)

---

## License

This project is open source and available for portfolio/educational use.
