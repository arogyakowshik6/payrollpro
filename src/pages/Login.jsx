import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, ACTIONS } from '../context/AppContext'
import { DEMO_USERS } from '../data/seedData'
import Button from '../components/ui/Button'
import styles from './Login.module.css'

export default function Login() {
  const { dispatch, showToast } = useApp()
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('hr')
  const [selectedUserId, setSelectedUserId] = useState(0)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setSelectedUserId(role === 'hr' ? 0 : 1)
  }

  const handleLogin = () => {
    const user = DEMO_USERS.find(u => u.id === selectedUserId)
    if (!user) return

    // RBAC enforcement — only Sarah can be HR
    if (selectedRole === 'hr' && user.role !== 'hr') {
      showToast('Only the HR Manager account can use HR access.', 'danger')
      return
    }
    if (selectedRole === 'emp' && user.role !== 'emp') {
      showToast('Sarah Johnson logs in as HR Manager only.', 'danger')
      return
    }

    dispatch({ type: ACTIONS.LOGIN, payload: user })
    navigate(selectedRole === 'hr' ? '/overview' : '/clock')
  }

  const empUsers = DEMO_USERS.filter(u => u.role === 'emp')

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandMark}>P</div>
          <div>
            <h1 className={styles.brandName}>PayrollPro</h1>
            <p className={styles.brandSub}>HR Management System</p>
          </div>
        </div>

        <p className={styles.instructions}>Select your role to access the dashboard</p>

        {/* Role selection */}
        <div className={styles.roleGrid}>
          <button
            className={`${styles.roleOption} ${selectedRole === 'hr' ? styles.roleHr : ''}`}
            onClick={() => handleRoleSelect('hr')}
            aria-pressed={selectedRole === 'hr'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
            </svg>
            <strong>HR Manager</strong>
            <span>Full dashboard access</span>
          </button>

          <button
            className={`${styles.roleOption} ${selectedRole === 'emp' ? styles.roleEmp : ''}`}
            onClick={() => handleRoleSelect('emp')}
            aria-pressed={selectedRole === 'emp'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round"/>
              <line x1="12" y1="12" x2="12" y2="16"/>
              <line x1="10" y1="14" x2="14" y2="14"/>
            </svg>
            <strong>Employee</strong>
            <span>Clock in/out + payslip</span>
          </button>
        </div>

        {/* User select */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="user-select">
            {selectedRole === 'hr' ? 'HR Account' : 'Select Your Account'}
          </label>
          {selectedRole === 'hr' ? (
            <div className={styles.hrUser}>
              <div className={styles.hrAvatar}>SJ</div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14 }}>Sarah Johnson</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>HR Manager · Full access</p>
              </div>
            </div>
          ) : (
            <select
              id="user-select"
              className={styles.select}
              value={selectedUserId}
              onChange={e => setSelectedUserId(Number(e.target.value))}
            >
              {empUsers.map(u => (
                <option key={u.id} value={u.id}>{u.name} — {u.dept}</option>
              ))}
            </select>
          )}
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={handleLogin}>
          Sign In
        </Button>

        <p className={styles.note}>Demo app — no real data is stored or transmitted</p>
      </div>
    </div>
  )
}
