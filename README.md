# PayrollPro — HR Management System

> A full-featured, enterprise-grade HR and payroll web application built with **React 19**. Simulates a real company payroll system with secure PIN-based authentication, two distinct user roles, and a comprehensive suite of HR tools — built as a portfolio project to demonstrate practical, business-level frontend engineering.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?logo=react-router&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-264DE4?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)

---

## Table of Contents

- [What This Project Demonstrates](#what-this-project-demonstrates)
- [Tech Stack](#tech-stack)
- [Full Feature List](#full-feature-list)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [How to Download / Clone](#how-to-download--clone)
- [How to Run Locally](#how-to-run-locally)
- [Demo Login Accounts and PINs](#demo-login-accounts-and-pins)
- [How to Build for Production](#how-to-build-for-production)
- [How to Deploy](#how-to-deploy)
- [Payroll Calculation Logic](#payroll-calculation-logic)
- [Multi-Currency Support](#multi-currency-support)
- [Available Scripts](#available-scripts)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

## What This Project Demonstrates

| Skill | Where it shows up |
|---|---|
| **Secure PIN Authentication** | 4-digit PIN numpad on login — no free account switching between employees |
| **Role-Based Access Control (RBAC)** | Protected routes redirect users by role at the router level |
| **Global State Management** | `Context API` + `useReducer` — single source of truth, zero prop drilling |
| **Client-Side Routing** | `React Router v7` — 16 routes, guarded by auth status and user role |
| **Component Architecture** | Reusable `Button`, `Badge`, `Modal`, `StatCard`, `Toast` with variant-based prop API |
| **CSS Architecture** | CSS Modules throughout — scoped styles, no class collisions, shared design token system |
| **Real-Time UI** | Live clock, session timer, elapsed counter — all using `setInterval` with `useEffect` cleanup |
| **CRUD Operations** | Add / edit / remove employees with modal form and input validation |
| **Data Filtering and Search** | Multi-field search and dropdown filters across Employees, Attendance, Leave, Shifts |
| **File Export** | Payroll and performance CSV download via the Blob API |
| **Business Logic** | UK payroll: 20% income tax + 12% National Insurance, multi-currency conversion |
| **Data Visualisation** | Bar charts and donut ring in pure SVG — no external chart library |
| **Leave Management Workflow** | Full request → approve/reject cycle with automatic notification trigger |
| **Shift Scheduling** | HR assigns shifts; employees see them on their personal calendar |
| **Performance KPIs** | Punctuality %, overtime, late arrivals — derived from live attendance data |
| **Notifications System** | Role-targeted alerts, unread badge counter, mark-as-read |
| **Multi-Currency Payroll** | GBP / USD / EUR / INR with mock exchange rates and dual-currency payslips |
| **Payslip History** | Employees can browse and view all past monthly payslips |
| **Self-Service Portal** | Employees update their own personal details independently |
| **Accessibility** | Semantic HTML, `aria-*` attributes, keyboard-dismissible modals |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| UI Library | [React](https://react.dev) | 19.2 |
| Routing | [React Router DOM](https://reactrouter.com) | 7.18 |
| Build Tool | [Vite](https://vitejs.dev) | 8.0 |
| Styling | CSS Modules — vanilla CSS, no framework | — |
| Linting | ESLint | 10.3 |
| Package Manager | npm | 9+ |
| Language | JavaScript (JSX) | ES2022+ |
| Charts | Pure SVG — no chart library | — |
| Icons | Inline SVG — no icon library | — |
| Fonts | Google Fonts — Inter + JetBrains Mono | — |

> No UI component library is used anywhere. Every component — the design system, color tokens, spacing, typography, charts, and all interactive elements — was built from scratch.

---

## Full Feature List

### HR Manager — 9 pages

| Page | What it does |
|---|---|
| **Overview** | KPI stat cards: total employees, total hours, gross payroll, net payroll. Employee summary table with hours and earnings per person. |
| **Employees** | Add, edit, and remove staff. Search by name or email. Filter by department. Full modal form with validation. |
| **Attendance Log** | All clock-in/out records across all employees. Search by name, filter by month. Late arrival flagged visually. |
| **Payroll** | Monthly payroll with automatic tax (20%) and NI (12%) per employee. Multi-currency local pay column. One-click CSV export. |
| **Leave Management** | View all leave requests (Annual / Sick / Unpaid). Approve or reject with one click. Status tabs. Auto-fires employee notification on action. |
| **Shift Scheduling** | Assign shifts (Early / Morning / Late / Night) per employee and date. Remove shifts. Auto-fires employee notification on assignment. |
| **Performance** | KPI card per employee: punctuality %, days worked, late arrivals, overtime hours, leaves taken. Progress bar visuals. Export as CSV. |
| **Analytics** | Five charts: payroll by employee (bar), attendance days (bar), monthly payroll trend (bar), departmental cost breakdown (SVG donut), late arrivals (bar). All pure SVG, no library. |
| **Notifications** | HR-targeted alerts for leave requests and system events. Unread count badge in sidebar. Mark individual or all as read. |

### Employee — 7 pages

| Page | What it does |
|---|---|
| **Clock In / Out** | Live clock, one-tap toggle. Real-time session duration counter. Clock-out auto-calculates hours and logs a new attendance record. Monthly stats. |
| **Request Leave** | Submit Annual / Sick / Unpaid leave with date range picker and automatic duration calculator. Leave history with approval status. Fires HR notification on submit. |
| **My Calendar** | Timeline of all shifts and leave events assigned/approved by HR — simulates Google Calendar integration. Colour-coded by type. |
| **My Payslip** | Current month payslip: hours worked, hourly rate, gross pay, income tax, NI deduction, net pay. Dual-currency if employee uses non-GBP currency. |
| **Payslip History** | Month selector sidebar showing all available payslips. Click any month to view the full dual-currency breakdown. |
| **My Profile** | Edit name, email, phone, and address. Employment details (rate, department, job title) shown as read-only — HR-managed only. |
| **Notifications** | Employee-targeted alerts: leave approved/rejected, new shift assigned, payslip ready. Mark as read. |

### System-wide

- **PIN Authentication** — 4-digit numpad, masked dot display, shake animation + error message on wrong PIN
- **RBAC Route Protection** — 16 routes guarded by both login status and role; wrong-role attempts redirect automatically
- **Toast Notifications** — action feedback on every interaction: clock in/out, leave submitted, employee added, CSV exported, errors
- **Responsive Layout** — sidebar collapses on smaller viewports
- **Design System** — CSS custom properties for all colours, spacing, radius, typography, and transitions

---

## Project Structure

```
payrollpro/
├── index.html                           # HTML entry point (single-page app shell)
├── package.json                         # Dependencies and npm scripts
├── vite.config.js                       # Vite build configuration
├── eslint.config.js                     # ESLint rules
│
├── public/                              # Static assets served as-is
│
└── src/
    ├── main.jsx                         # React root — mounts <App /> inside <BrowserRouter />
    ├── App.jsx                          # All 16 routes, protected route wrappers, dashboard shell
    ├── App.module.css                   # Dashboard layout: sidebar + topbar + content area
    │
    ├── utils.js                         # Pay calculations, currency conversion, CSV generation,
    │                                    # date/time formatting, performance calculation
    │
    ├── styles/
    │   └── global.css                   # Design token system — CSS custom properties for colours,
    │                                    # spacing scale, border radius, typography, transitions
    │
    ├── data/
    │   └── seedData.js                  # All demo data: employees, attendance records, leave requests,
    │                                    # shifts, notifications, calendar events, payslip history,
    │                                    # exchange rates, demo users with PINs
    │
    ├── context/
    │   └── AppContext.jsx               # Global state — Context API + useReducer.
    │                                    # State: auth, employees, attendance, leaves, shifts,
    │                                    # notifications, calendar events, payslip history, toast, clock.
    │                                    # Exports helper functions: getHoursForEmp,
    │                                    # getUserNotifications, getShiftsForEmp
    │
    ├── components/
    │   ├── Sidebar.jsx                  # Role-aware navigation — separate links for HR and Employee.
    │   ├── Sidebar.module.css           # Includes unread notification badge counter.
    │   │
    │   └── ui/                          # Reusable primitive components
    │       ├── Button.jsx               # variants: default | primary | success | danger
    │       ├── Button.module.css        # sizes: sm | md | lg | fullWidth
    │       ├── Badge.jsx                # Status pill: accent | success | warning | danger | muted
    │       ├── Badge.module.css
    │       ├── StatCard.jsx             # KPI metric card with label, large value, sub-text
    │       ├── StatCard.module.css      # valueColor: accent | success | warning | danger
    │       ├── Modal.jsx                # Controlled modal: Escape key + overlay click to close
    │       ├── Modal.module.css         # Slide-up and fade-in animation
    │       ├── Toast.jsx                # Auto-dismissing toast (3.2s), reads from global state
    │       └── Toast.module.css
    │
    └── pages/
        │
        ├── Login.jsx                    # Role selector + account picker + 4-digit PIN numpad
        ├── Login.module.css             # Shake animation on wrong PIN, masked dot indicators
        │
        ├── Overview.jsx                 # HR: KPI cards and employee summary table
        ├── Employees.jsx                # HR: CRUD table, add/edit modal, search, filter
        ├── Attendance.jsx               # HR: All attendance records, search and month filter
        ├── Payroll.jsx                  # HR: Monthly payroll, multi-currency column, CSV export
        ├── ClockPage.jsx                # Employee: Clock in/out, session timer, shift log
        ├── Clock.module.css
        ├── Payslip.jsx                  # Employee: Current month payslip, dual-currency
        ├── Payslip.module.css
        ├── Pages.module.css             # Shared: tables, filter bars, form grids, tab buttons,
        │                                # employee avatar cells, action button groups
        │
        ├── hr/                          # HR Manager exclusive pages
        │   ├── LeaveManagement.jsx      # Leave queue: approve/reject, status filter tabs
        │   ├── ShiftScheduling.jsx      # Assign/remove shifts, search by employee
        │   ├── Performance.jsx          # KPI cards + table + progress bars, CSV export
        │   ├── Performance.module.css
        │   ├── Analytics.jsx            # 5 pure SVG charts: bar charts + donut ring chart
        │   ├── Analytics.module.css
        │   ├── Notifications.jsx        # HR notification feed, mark as read
        │   └── Notifications.module.css
        │
        └── emp/                         # Employee exclusive pages
            ├── LeaveRequest.jsx         # Leave submission form + personal leave history
            ├── Calendar.jsx             # Timeline view: shifts, leave, meetings
            ├── Calendar.module.css
            ├── PayslipHistory.jsx       # Month selector + full payslip for selected month
            └── SelfService.jsx          # Edit personal details, read-only employment info
```

---

## Prerequisites

Before you start, make sure the following tools are installed on your computer:

| Tool | Minimum Version | How to check | Where to download |
|---|---|---|---|
| **Node.js** | 18.x or higher | `node -v` | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x or higher | `npm -v` | Included with Node.js — no separate install |
| **Git** | Any recent version | `git --version` | [git-scm.com](https://git-scm.com) |

> **Not sure if you have Node.js?** Open a terminal and run `node -v`. If you see "command not found", install Node.js from [nodejs.org](https://nodejs.org) — npm comes bundled with it automatically. After installing, close and reopen your terminal.

---

## How to Download / Clone

### Option A — Clone with Git (recommended)

```bash
git clone https://github.com/arogyakowshik6/payrollpro.git
cd payrollpro
```

### Option B — Download as ZIP (no Git required)

1. Go to the repository page on GitHub
2. Click the green **`< > Code`** button near the top right
3. Click **Download ZIP**
4. Find the ZIP in your Downloads folder and extract it:
   - **Windows:** Right-click → Extract All
   - **Mac:** Double-click the ZIP file
5. Open your terminal and navigate into the extracted folder:

```bash
cd payrollpro
```

---

## How to Run Locally

Once you are inside the project folder, run these two commands in order:

```bash
# Step 1 — Install all dependencies (only needed once after cloning)
npm install

# Step 2 — Start the development server
npm run dev
```

Your terminal will display something like this:

```
  VITE v8.0.12  ready in 320 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **http://localhost:5173** in your browser. The app will load instantly and any code change you make will refresh the browser automatically (hot module replacement — no manual refreshing needed).

To stop the server, press `Ctrl + C` in the terminal.

---

## Demo Login Accounts and PINs

The app uses demo accounts with no real backend, no database, and no signup required. On the login screen, select your role and account, then enter the 4-digit PIN on the numpad.

| Name | Role | PIN | Pages accessible |
|---|---|---|---|
| **Sarah Johnson** | HR Manager | `0000` | Overview, Employees, Attendance, Payroll, Leave Management, Shift Scheduling, Performance, Analytics, Notifications |
| **James Carter** | Employee | `1234` | Clock In/Out, Request Leave, My Calendar, My Payslip, Payslip History, My Profile, Notifications |
| **Priya Patel** | Employee | `2345` | Clock In/Out, Request Leave, My Calendar, My Payslip, Payslip History, My Profile, Notifications |
| **Marcus Brown** | Employee | `3456` | Clock In/Out, Request Leave, My Calendar, My Payslip, Payslip History, My Profile, Notifications |
| **Aisha Khan** | Employee | `4567` | Clock In/Out, Request Leave, My Calendar, My Payslip, Payslip History, My Profile, Notifications |

**Security note:** The PIN system prevents any user from logging into another employee's account. A wrong PIN triggers an error message and shake animation — the account does not open. This addresses a real trust and data integrity requirement in attendance management systems.

**Data note:** All data resets on page refresh because it lives in React state rather than a database. This is intentional for a portfolio and demo project.

---

## How to Build for Production

To generate a minified, optimised production build:

```bash
npm run build
```

This creates a `dist/` folder in the project root containing static HTML, CSS, and JavaScript files — ready to deploy to any hosting platform.

To preview the production build locally before deploying:

```bash
npm run preview
```

---

## How to Deploy

### Option 1 — Vercel (recommended — free, fastest, zero config)

```bash
# Install the Vercel CLI
npm install -g vercel

# Log in to Vercel (opens your browser)
vercel login

# Deploy from inside the project folder
vercel
```

Vercel auto-detects Vite and configures everything. Your app will be live at a `.vercel.app` URL within a minute.

---

### Option 2 — Netlify

1. Push your project to a GitHub repository
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click **Add new site** → **Import an existing project**
4. Connect your GitHub account and select this repository
5. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy site**

Your site will be live at a `.netlify.app` URL within a couple of minutes.

> For client-side routing to work correctly on Netlify, create a file at `public/_redirects` with this content:
> ```
> /*    /index.html   200
> ```

---

### Option 3 — GitHub Pages

```bash
# Build the app
npm run build

# Install the deployment tool
npm install -g gh-pages

# Deploy the dist folder
gh-pages -d dist
```

Then go to your repository on GitHub → **Settings** → **Pages** → set the source branch to `gh-pages`.

> **Important for GitHub Pages:** Before building, add `base: '/your-repo-name/'` to `vite.config.js`, replacing `your-repo-name` with your actual repository name. This is required so that assets load correctly from the subdirectory path GitHub Pages uses.

---

## Payroll Calculation Logic

Every payslip, payroll table row, and analytics chart uses the same calculation function in `src/utils.js`:

```js
// src/utils.js

const TAX_RATE = 0.20   // 20% UK Income Tax
const NI_RATE  = 0.12   // 12% National Insurance

function calcPay(hoursWorked, hourlyRate, currency = 'GBP') {
  const gross = hoursWorked * hourlyRate
  const tax   = gross * TAX_RATE
  const ni    = gross * NI_RATE
  const net   = gross - tax - ni

  const grossConv = convertCurrency(gross, currency)  // employee's local currency
  const netConv   = convertCurrency(net, currency)

  return { gross, tax, ni, net, hours: hoursWorked, grossConv, netConv, currency }
}
```

---

## Multi-Currency Support

Each employee has a preferred currency in their profile. The payroll system converts GBP values using mock exchange rates defined in `src/data/seedData.js`:

```js
// Mock exchange rates — base currency: GBP
export const EXCHANGE_RATES = {
  GBP: 1.0,
  USD: 1.27,
  EUR: 1.17,
  INR: 105.4,
}
```

**Where multi-currency appears across the app:**

| Location | What it shows |
|---|---|
| Payroll table | "Net (Local)" column — each employee's net in their own currency |
| My Payslip | Gross and net in both GBP and employee's preferred currency |
| Payslip History | Every historical payslip with dual-currency values |
| CSV export | Includes hourly rate, gross (GBP), and net (local) columns |

Demo currency assignments: James → GBP · Priya → GBP · Marcus → EUR · Aisha → USD

---

## Available Scripts

Run all commands from inside the project folder:

| Command | What it does |
|---|---|
| `npm install` | Downloads and installs all project dependencies into `node_modules/` |
| `npm run dev` | Starts the Vite development server with hot reload at `http://localhost:5173` |
| `npm run build` | Creates an optimised production build in the `dist/` folder |
| `npm run preview` | Serves the `dist/` folder locally so you can test the production version |
| `npm run lint` | Runs ESLint to check for code quality issues across all source files |

---

## Troubleshooting

**`npm install` fails, hangs, or shows errors**

Delete the existing `node_modules` folder and lock file, then retry from scratch:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

**Port 5173 is already in use**

Vite automatically tries the next available port (5174, 5175, and so on). Check your terminal output — it will tell you the exact URL it is using.

---

**The app shows a blank white page after `npm run dev`**

Open your browser's developer console:
- **Windows / Linux:** Press `F12`
- **Mac:** Press `Cmd + Option + I`

Look at the **Console** tab for red error messages. The most common cause is a missing dependency — re-running `npm install` fixes it in most cases.

---

**"command not found: npm" or "command not found: node"**

Node.js is not installed. Download the LTS version from [nodejs.org](https://nodejs.org), run the installer, then close and reopen your terminal before trying again.

---

**Deployed app shows blank page or broken links when navigating directly to a URL**

This is a single-page app routing issue. The server needs to serve `index.html` for all routes.

- **Vercel:** Handled automatically — no action needed.
- **Netlify:** Create `public/_redirects` containing `/*    /index.html   200`
- **GitHub Pages:** Requires a `404.html` redirect workaround — search "GitHub Pages SPA redirect" for instructions.

---

**All my data disappeared after refreshing the page**

This is expected behaviour. All data is stored in React state (in memory) — there is no backend or database. Refreshing the page resets everything back to the seed data defined in `src/data/seedData.js`. This is intentional for a portfolio and demo project.

---

## Author

**Kowshik Kuppala**
Frontend Developer — React.js · TypeScript · Next.js

- LinkedIn: [linkedin.com/in/YOUR_PROFILE](https://linkedin.com)
- Portfolio: [your-portfolio.vercel.app](https://vercel.com)
- GitHub: [github.com/arogyakowshik6](https://github.com/arogyakowshik6)

---

## License

This project is open source and free to use for portfolio and educational purposes.