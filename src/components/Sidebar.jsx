import { NavLink } from 'react-router-dom'
import { useApp, ACTIONS } from '../context/AppContext'
import styles from './Sidebar.module.css'

// ── Icons (inline SVG paths) ──────────────────────────────────
const ICONS = {
  overview:    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  employees:   'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
  attendance:  'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  payroll:     'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  clock:       'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  payslip:     'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
}

const HR_NAV = [
  { to: '/overview',   label: 'Overview',    icon: 'overview' },
  { to: '/employees',  label: 'Employees',   icon: 'employees' },
  { to: '/attendance', label: 'Attendance',  icon: 'attendance' },
  { to: '/payroll',    label: 'Payroll',     icon: 'payroll' },
]

const EMP_NAV = [
  { to: '/clock',   label: 'Clock In / Out', icon: 'clock' },
  { to: '/payslip', label: 'My Payslip',     icon: 'payslip' },
]

function NavIcon({ path }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Sidebar() {
  const { currentUser, dispatch } = useApp()
  if (!currentUser) return null

  const nav = currentUser.role === 'hr' ? HR_NAV : EMP_NAV
  const sectionLabel = currentUser.role === 'hr' ? 'Management' : 'My Account'

  return (
    <aside className={styles.sidebar} aria-label="Main navigation">
      {/* Logo */}
      <div className={styles.logo}>
        <h1 className={styles.logoTitle}>PayrollPro</h1>
        <p className={styles.logoSub}>HR Management System</p>
      </div>

      {/* Navigation */}
      <nav>
        <p className={styles.sectionLabel}>{sectionLabel}</p>
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <NavIcon path={ICONS[item.icon]} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className={styles.footer}>
        <div className={styles.userChip}>
          <div className={`${styles.avatar} ${styles[currentUser.role]}`}>
            {currentUser.avatar}
          </div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{currentUser.name}</p>
            <span className={styles.userRole}>
              {currentUser.role === 'hr' ? 'HR Manager' : 'Employee'}
            </span>
          </div>
          <button
            className={styles.logoutBtn}
            onClick={() => dispatch({ type: ACTIONS.LOGOUT })}
            title="Sign out"
            aria-label="Sign out"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
