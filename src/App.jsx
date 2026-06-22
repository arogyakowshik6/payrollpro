import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Toast from './components/ui/Toast'

// Existing pages
import Login      from './pages/Login'
import Overview   from './pages/Overview'
import Employees  from './pages/Employees'
import Attendance from './pages/Attendance'
import Payroll    from './pages/Payroll'
import ClockPage  from './pages/ClockPage'
import Payslip    from './pages/Payslip'

// New HR pages
import LeaveManagement from './pages/hr/LeaveManagement'
import ShiftScheduling from './pages/hr/ShiftScheduling'
import Performance     from './pages/hr/Performance'
import Analytics       from './pages/hr/Analytics'
import Notifications   from './pages/hr/Notifications'

// New Employee pages
import LeaveRequest   from './pages/emp/LeaveRequest'
import Calendar       from './pages/emp/Calendar'
import SelfService    from './pages/emp/SelfService'
import PayslipHistory from './pages/emp/PayslipHistory'

import styles from './App.module.css'

const PAGE_META = {
  '/overview':        { title:'Overview',          sub:'Monthly summary across all staff' },
  '/employees':       { title:'Employees',         sub:'Manage staff records and hourly rates' },
  '/attendance':      { title:'Attendance Log',    sub:'Daily clock-in and clock-out records' },
  '/payroll':         { title:'Payroll',           sub:'Monthly pay calculations and CSV export' },
  '/leave':           { title:'Leave Management',  sub:'Approve or reject employee leave requests' },
  '/shifts':          { title:'Shift Scheduling',  sub:'Assign and manage employee shifts' },
  '/performance':     { title:'Performance',       sub:'KPIs: punctuality, overtime, and attendance' },
  '/analytics':       { title:'Analytics',         sub:'Payroll trends, attendance rates, dept costs' },
  '/notifications':   { title:'Notifications',     sub:'Role-based alerts and updates' },
  '/clock':           { title:'Clock In / Out',    sub:'Record your work hours' },
  '/leave-request':   { title:'Request Leave',     sub:'Submit and track your leave requests' },
  '/calendar':        { title:'My Calendar',       sub:'Shifts, leave and meetings — mock Google Calendar' },
  '/payslip':         { title:'My Payslip',        sub:'Your earnings breakdown for July 2025' },
  '/payslip-history': { title:'Payslip History',   sub:'View and download all past payslips' },
  '/profile':         { title:'My Profile',        sub:'Update your personal details' },
}

function ProtectedRoute({ children, requiredRole }){
  const { isLoggedIn, currentUser } = useApp()
  if(!isLoggedIn) return <Navigate to="/login" replace/>
  if(requiredRole && currentUser.role!==requiredRole)
    return <Navigate to={currentUser.role==='hr'?'/overview':'/clock'} replace/>
  return children
}

function Shell({ children }){
  const { currentUser } = useApp()
  const location = useLocation()
  const meta = PAGE_META[location.pathname]||{ title:'Dashboard', sub:'' }
  if(!currentUser) return null
  return (
    <div className={styles.shell}>
      <Sidebar/>
      <div className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <h2 className={styles.pageTitle}>{meta.title}</h2>
            <p className={styles.pageSub}>Welcome back, {currentUser.name} · {meta.sub}</p>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}

const HR  = (C) => <ProtectedRoute requiredRole="hr"><Shell><C/></Shell></ProtectedRoute>
const EMP = (C) => <ProtectedRoute requiredRole="emp"><Shell><C/></Shell></ProtectedRoute>
const ANY = (C) => <ProtectedRoute><Shell><C/></Shell></ProtectedRoute>

function AppRoutes(){
  const { isLoggedIn, currentUser } = useApp()
  return (
    <Routes>
      <Route path="/login" element={isLoggedIn?<Navigate to={currentUser.role==='hr'?'/overview':'/clock'} replace/>:<Login/>}/>
      {/* HR */}
      <Route path="/overview"    element={HR(Overview)}/>
      <Route path="/employees"   element={HR(Employees)}/>
      <Route path="/attendance"  element={HR(Attendance)}/>
      <Route path="/payroll"     element={HR(Payroll)}/>
      <Route path="/leave"       element={HR(LeaveManagement)}/>
      <Route path="/shifts"      element={HR(ShiftScheduling)}/>
      <Route path="/performance" element={HR(Performance)}/>
      <Route path="/analytics"   element={HR(Analytics)}/>
      {/* Employee */}
      <Route path="/clock"           element={EMP(ClockPage)}/>
      <Route path="/leave-request"   element={EMP(LeaveRequest)}/>
      <Route path="/calendar"        element={EMP(Calendar)}/>
      <Route path="/payslip"         element={EMP(Payslip)}/>
      <Route path="/payslip-history" element={EMP(PayslipHistory)}/>
      <Route path="/profile"         element={EMP(SelfService)}/>
      {/* Shared */}
      <Route path="/notifications" element={ANY(Notifications)}/>
      <Route path="*" element={<Navigate to="/login" replace/>}/>
    </Routes>
  )
}

export default function App(){
  return (
    <AppProvider>
      <AppRoutes/>
      <Toast/>
    </AppProvider>
  )
}
