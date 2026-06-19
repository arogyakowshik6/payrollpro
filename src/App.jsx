import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Toast from './components/ui/Toast'

// Pages
import Login      from './pages/Login'
import Overview   from './pages/Overview'
import Employees  from './pages/Employees'
import Attendance from './pages/Attendance'
import Payroll    from './pages/Payroll'
import ClockPage  from './pages/ClockPage'
import Payslip    from './pages/Payslip'

import styles from './App.module.css'

// ── Page metadata (for topbar titles) ────────────────────────
const PAGE_META = {
  '/overview':   { title: 'Overview',       sub: 'Monthly summary across all staff' },
  '/employees':  { title: 'Employees',      sub: 'Manage staff records and rates' },
  '/attendance': { title: 'Attendance Log', sub: 'Daily clock-in and clock-out records' },
  '/payroll':    { title: 'Payroll',        sub: 'Monthly pay calculations and export' },
  '/clock':      { title: 'Clock In / Out', sub: 'Record your work hours' },
  '/payslip':    { title: 'My Payslip',     sub: 'Your earnings breakdown for July 2025' },
}

// ── Protected route ───────────────────────────────────────────
function ProtectedRoute({ children, requiredRole }) {
  const { isLoggedIn, currentUser } = useApp()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to={currentUser.role === 'hr' ? '/overview' : '/clock'} replace />
  }
  return children
}

// ── Dashboard shell (sidebar + topbar + outlet) ───────────────
function DashboardShell({ children }) {
  const { currentUser } = useApp()
  const location = useLocation()
  const meta = PAGE_META[location.pathname] ?? { title: 'Dashboard', sub: '' }

  if (!currentUser) return null

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div>
            <h2 className={styles.pageTitle}>{meta.title}</h2>
            <p className={styles.pageSub}>Welcome back, {currentUser.name} · {meta.sub}</p>
          </div>
        </header>

        {/* Page content */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  )
}

// ── Routes ────────────────────────────────────────────────────
function AppRoutes() {
  const { isLoggedIn, currentUser } = useApp()

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={
          isLoggedIn
            ? <Navigate to={currentUser.role === 'hr' ? '/overview' : '/clock'} replace />
            : <Login />
        }
      />

      {/* HR-only routes */}
      <Route path="/overview"   element={<ProtectedRoute requiredRole="hr"><DashboardShell><Overview /></DashboardShell></ProtectedRoute>} />
      <Route path="/employees"  element={<ProtectedRoute requiredRole="hr"><DashboardShell><Employees /></DashboardShell></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute requiredRole="hr"><DashboardShell><Attendance /></DashboardShell></ProtectedRoute>} />
      <Route path="/payroll"    element={<ProtectedRoute requiredRole="hr"><DashboardShell><Payroll /></DashboardShell></ProtectedRoute>} />

      {/* Employee-only routes */}
      <Route path="/clock"   element={<ProtectedRoute requiredRole="emp"><DashboardShell><ClockPage /></DashboardShell></ProtectedRoute>} />
      <Route path="/payslip" element={<ProtectedRoute requiredRole="emp"><DashboardShell><Payslip /></DashboardShell></ProtectedRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

// ── Root ──────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
      <Toast />
    </AppProvider>
  )
}
