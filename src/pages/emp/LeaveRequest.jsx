import { useState } from 'react'
import { useApp, ACTIONS } from '../../context/AppContext'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { LEAVE_TYPES } from '../../data/seedData'
import styles from '../Pages.module.css'

const EMPTY = { type:'Annual', startDate:'', endDate:'', reason:'' }

export default function LeaveRequest(){
  const { currentUser, leaves, employees, dispatch, showToast } = useApp()
  const emp = employees.find(e=>e.id===currentUser?.empId)
  const [form, setForm] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)

  const myLeaves = leaves.filter(l=>l.empId===currentUser?.empId)
    .sort((a,b)=>b.appliedOn.localeCompare(a.appliedOn))

  const calcDays = (start,end) => {
    if(!start||!end) return 0
    const d1=new Date(start), d2=new Date(end)
    return Math.max(1,Math.round((d2-d1)/(1000*60*60*24))+1)
  }

  const handleSubmit = () => {
    if(!form.startDate||!form.endDate||!form.reason.trim()){ showToast('Fill all fields','danger'); return }
    if(new Date(form.endDate)<new Date(form.startDate)){ showToast('End date must be after start date','danger'); return }
    const days = calcDays(form.startDate, form.endDate)
    dispatch({type:ACTIONS.ADD_LEAVE, payload:{
      empId:currentUser.empId, ...form, days,
      status:'pending', appliedOn:new Date().toISOString().split('T')[0]
    }})
    dispatch({type:ACTIONS.ADD_NOTIFICATION, payload:{
      userId:'hr', type:'leave',
      msg:`${emp?.name} has requested ${days} day${days>1?'s':''} ${form.type} leave`,
      time:new Date().toISOString().slice(0,16)
    }})
    showToast('Leave request submitted!','success')
    setForm(EMPTY)
  }

  const field = k=>({value:form[k], onChange:e=>setForm(f=>({...f,[k]:e.target.value}))})
  const statusVariant = s=>s==='approved'?'success':s==='rejected'?'danger':'warning'

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.sectionHeader}><div><h3 className={styles.sectionTitle}>Request Leave</h3><p className={styles.sectionSub}>Submit a new leave request for HR approval</p></div></div>
        <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:24,maxWidth:500}}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Leave Type</label>
              <select className={styles.formInput} {...field('type')}>
                {LEAVE_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className={styles.formGroup}/>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Start Date</label>
              <input type="date" className={styles.formInput} {...field('startDate')}/>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>End Date</label>
              <input type="date" className={styles.formInput} {...field('endDate')}/>
            </div>
            <div className={styles.formGroup} style={{gridColumn:'1/-1'}}>
              <label className={styles.formLabel}>Reason</label>
              <input className={styles.formInput} placeholder="Brief reason for leave…" {...field('reason')}/>
            </div>
          </div>
          {form.startDate&&form.endDate&&(
            <p style={{fontSize:12,color:'var(--accent)',margin:'8px 0 0'}}>
              Duration: {calcDays(form.startDate,form.endDate)} day{calcDays(form.startDate,form.endDate)>1?'s':''}
            </p>
          )}
          <div style={{marginTop:16}}>
            <Button variant="primary" onClick={handleSubmit}>Submit Request</Button>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}><h3 className={styles.sectionTitle}>My Leave History</h3></div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Applied</th><th>Status</th></tr></thead>
            <tbody>
              {myLeaves.length===0&&<tr><td colSpan={7} className={styles.emptyRow}>No leave requests yet</td></tr>}
              {myLeaves.map(l=>(
                <tr key={l.id}>
                  <td><Badge variant={l.type==='Annual'?'accent':l.type==='Sick'?'warning':'muted'}>{l.type}</Badge></td>
                  <td className="mono">{l.startDate}</td>
                  <td className="mono">{l.endDate}</td>
                  <td className="mono">{l.days}</td>
                  <td className={styles.muted}>{l.reason}</td>
                  <td className={styles.muted}>{l.appliedOn}</td>
                  <td><Badge variant={statusVariant(l.status)}>{l.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
