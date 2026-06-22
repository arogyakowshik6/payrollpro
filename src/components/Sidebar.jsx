import { NavLink } from 'react-router-dom'
import { useApp, ACTIONS } from '../context/AppContext'
import styles from './Sidebar.module.css'

const I = { // icon paths
  overview:    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  employees:   'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0',
  attendance:  'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  payroll:     'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  leave:       'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  shifts:      'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  performance: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  analytics:   'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
  notif:       'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  clock:       'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  payslip:     'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  calendar:    'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  profile:     'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  history:     'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
}

const HR_NAV = [
  { section:'Management' },
  { to:'/overview',     label:'Overview',     icon:'overview' },
  { to:'/employees',    label:'Employees',    icon:'employees' },
  { to:'/attendance',   label:'Attendance',   icon:'attendance' },
  { to:'/payroll',      label:'Payroll',      icon:'payroll' },
  { section:'HR Tools' },
  { to:'/leave',        label:'Leave Mgmt',   icon:'leave' },
  { to:'/shifts',       label:'Shift Schedule',icon:'shifts' },
  { to:'/performance',  label:'Performance',  icon:'performance' },
  { to:'/analytics',    label:'Analytics',    icon:'analytics' },
  { section:'General' },
  { to:'/notifications',label:'Notifications',icon:'notif', badge:true },
]

const EMP_NAV = [
  { section:'My Work' },
  { to:'/clock',        label:'Clock In/Out', icon:'clock' },
  { to:'/leave-request',label:'Request Leave', icon:'leave' },
  { to:'/calendar',     label:'My Calendar',  icon:'calendar' },
  { section:'My Account' },
  { to:'/payslip',      label:'My Payslip',   icon:'payslip' },
  { to:'/payslip-history',label:'Payslip History',icon:'history' },
  { to:'/profile',      label:'My Profile',   icon:'profile' },
  { section:'General' },
  { to:'/notifications',label:'Notifications',icon:'notif', badge:true },
]

function Icon({ path }){
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={path} strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export default function Sidebar(){
  const { currentUser, dispatch, getUserNotifications } = useApp()
  if(!currentUser) return null

  const nav   = currentUser.role==='hr' ? HR_NAV : EMP_NAV
  const notifs = getUserNotifications(currentUser)
  const unread = notifs.filter(n=>!n.read).length

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1 className={styles.logoTitle}>PayrollPro</h1>
        <p className={styles.logoSub}>HR Management System</p>
      </div>
      <nav style={{flex:1,overflowY:'auto'}}>
        {nav.map((item,i)=>{
          if(item.section) return <p key={i} className={styles.sectionLabel}>{item.section}</p>
          return (
            <NavLink key={item.to} to={item.to} className={({isActive})=>`${styles.navItem} ${isActive?styles.active:''}`}>
              <Icon path={I[item.icon]}/>
              <span style={{flex:1}}>{item.label}</span>
              {item.badge && unread>0 && <span className={styles.navBadge}>{unread}</span>}
            </NavLink>
          )
        })}
      </nav>
      <div className={styles.footer}>
        <div className={styles.userChip}>
          <div className={`${styles.avatar} ${styles[currentUser.role]}`}>{currentUser.avatar}</div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{currentUser.name}</p>
            <span className={styles.userRole}>{currentUser.role==='hr'?'HR Manager':'Employee'}</span>
          </div>
          <button className={styles.logoutBtn} onClick={()=>dispatch({type:ACTIONS.LOGOUT})} title="Sign out">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
