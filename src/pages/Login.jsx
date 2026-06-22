import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp, ACTIONS } from '../context/AppContext'
import { DEMO_USERS } from '../data/seedData'
import Button from '../components/ui/Button'
import styles from './Login.module.css'

export default function Login(){
  const { dispatch, showToast } = useApp()
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('hr')
  const [selectedUserId, setSelectedUserId] = useState(0)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setSelectedUserId(role==='hr'?0:1)
    setPin(''); setPinError(false)
  }

  const handlePinDigit = (digit) => {
    if(pin.length>=4) return
    const next = pin+digit
    setPin(next); setPinError(false)
    if(next.length===4) validatePin(next)
  }

  const handlePinClear = () => { setPin(''); setPinError(false) }
  const handlePinBack  = () => { setPin(p=>p.slice(0,-1)); setPinError(false) }

  const validatePin = (enteredPin) => {
    const user = DEMO_USERS.find(u=>u.id===selectedUserId)
    if(!user) return
    if(enteredPin!==user.pin){
      setPinError(true); setPin('')
      setShake(true); setTimeout(()=>setShake(false),500)
      showToast('Incorrect PIN. Try again.','danger')
      return
    }
    dispatch({type:ACTIONS.LOGIN, payload:user})
    navigate(user.role==='hr'?'/overview':'/clock')
  }

  const empUsers = DEMO_USERS.filter(u=>u.role==='emp')
  const selectedUser = DEMO_USERS.find(u=>u.id===selectedUserId)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>P</div>
          <div>
            <h1 className={styles.brandName}>PayrollPro</h1>
            <p className={styles.brandSub}>HR Management System</p>
          </div>
        </div>

        <p className={styles.instructions}>Select your role and enter your PIN</p>

        <div className={styles.roleGrid}>
          <button className={`${styles.roleOption} ${selectedRole==='hr'?styles.roleHr:''}`} onClick={()=>handleRoleSelect('hr')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/></svg>
            <strong>HR Manager</strong>
            <span>Full access</span>
          </button>
          <button className={`${styles.roleOption} ${selectedRole==='emp'?styles.roleEmp:''}`} onClick={()=>handleRoleSelect('emp')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round"/></svg>
            <strong>Employee</strong>
            <span>My portal</span>
          </button>
        </div>

        {selectedRole==='emp' && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Select Your Account</label>
            <select className={styles.select} value={selectedUserId} onChange={e=>{setSelectedUserId(Number(e.target.value));setPin('');setPinError(false)}}>
              {empUsers.map(u=><option key={u.id} value={u.id}>{u.name} — {u.dept}</option>)}
            </select>
          </div>
        )}

        {selectedRole==='hr' && (
          <div className={styles.hrUser}>
            <div className={styles.hrAvatar}>SJ</div>
            <div><p style={{fontWeight:600,fontSize:14}}>Sarah Johnson</p><p style={{fontSize:12,color:'var(--text-muted)'}}>HR Manager · Full access</p></div>
          </div>
        )}

        {/* PIN pad */}
        <div className={styles.pinSection}>
          <label className={styles.label}>Enter 4-Digit PIN</label>
          <div className={`${styles.pinDisplay} ${shake?styles.shake:''} ${pinError?styles.pinError:''}`}>
            {[0,1,2,3].map(i=>(
              <div key={i} className={`${styles.pinDot} ${i<pin.length?styles.pinFilled:''}`} />
            ))}
          </div>
          <div className={styles.pinGrid}>
            {[1,2,3,4,5,6,7,8,9].map(d=>(
              <button key={d} className={styles.pinKey} onClick={()=>handlePinDigit(String(d))}>{d}</button>
            ))}
            <button className={styles.pinKey} onClick={handlePinClear}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
            <button className={styles.pinKey} onClick={()=>handlePinDigit('0')}>0</button>
            <button className={styles.pinKey} onClick={handlePinBack}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" y1="9" x2="12" y2="15"/><line x1="12" y1="9" x2="18" y2="15"/></svg></button>
          </div>
          {pinError && <p className={styles.pinHint}>Incorrect PIN — try again</p>}
             {/* {!pinError && <p className={styles.pinHint}>Hint: HR=0000 · James=1234 · Priya=2345 · Marcus=3456 · Aisha=4567</p>}*/ }
        </div>

        <p className={styles.note}>Demo app — no real data is stored or transmitted</p>
      </div>
    </div>
  )
}
