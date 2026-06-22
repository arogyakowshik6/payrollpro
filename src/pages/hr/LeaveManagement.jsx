import { useState } from 'react'
import { useApp, ACTIONS } from '../../context/AppContext'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import styles from '../Pages.module.css'

export default function LeaveManagement(){
  const { leaves, employees, dispatch, showToast } = useApp()
  const [filter, setFilter] = useState('all')

  const filtered = leaves.filter(l=>filter==='all'||l.status===filter)
    .map(l=>({...l, emp:employees.find(e=>e.id===l.empId)}))
    .sort((a,b)=>b.appliedOn.localeCompare(a.appliedOn))

  const handle = (id, status, empName, days, type) => {
    dispatch({type:ACTIONS.UPDATE_LEAVE, payload:{id, status}})
    const msg = status==='approved'
      ? `${empName}'s ${type} leave approved (${days} day${days>1?'s':''})`
      : `${empName}'s ${type} leave rejected`
    dispatch({type:ACTIONS.ADD_NOTIFICATION, payload:{userId:'hr', type:'leave', msg, time:new Date().toISOString().slice(0,16)}})
    showToast(msg, status==='approved'?'success':'danger')
  }

  const statusVariant = s=>s==='approved'?'success':s==='rejected'?'danger':'warning'
  const typeVariant   = t=>t==='Annual'?'accent':t==='Sick'?'warning':'muted'

  const counts = { all:leaves.length, pending:leaves.filter(l=>l.status==='pending').length, approved:leaves.filter(l=>l.status==='approved').length, rejected:leaves.filter(l=>l.status==='rejected').length }

  return (
    <div className={styles.section}>
      <div className={styles.filterBar}>
        {['all','pending','approved','rejected'].map(f=>(
          <button key={f} className={`${styles.tabBtn} ${filter===f?styles.tabActive:''}`} onClick={()=>setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)} <span className={styles.tabCount}>{counts[f]}</span>
          </button>
        ))}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Applied</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={9} className={styles.emptyRow}>No leave requests found</td></tr>}
            {filtered.map(l=>(
              <tr key={l.id}>
                <td><div className={styles.empCell}><div className={styles.empAvatar}>{l.emp?.avatar}</div><strong>{l.emp?.name}</strong></div></td>
                <td><Badge variant={typeVariant(l.type)}>{l.type}</Badge></td>
                <td className="mono">{l.startDate}</td>
                <td className="mono">{l.endDate}</td>
                <td className="mono">{l.days}</td>
                <td className={styles.muted}>{l.reason}</td>
                <td className={styles.muted}>{l.appliedOn}</td>
                <td><Badge variant={statusVariant(l.status)}>{l.status}</Badge></td>
                <td>
                  {l.status==='pending'
                    ? <div className={styles.actionBtns}>
                        <Button size="sm" variant="success" onClick={()=>handle(l.id,'approved',l.emp?.name,l.days,l.type)}>Approve</Button>
                        <Button size="sm" variant="danger"  onClick={()=>handle(l.id,'rejected',l.emp?.name,l.days,l.type)}>Reject</Button>
                      </div>
                    : <span className={styles.muted}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
