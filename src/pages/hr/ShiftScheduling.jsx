import { useState } from 'react'
import { useApp, ACTIONS } from '../../context/AppContext'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Badge from '../../components/ui/Badge'
import { SHIFT_TYPES } from '../../data/seedData'
import styles from '../Pages.module.css'

const EMPTY = { empId:'', date:'', startTime:'09:00', endTime:'17:00', shiftType:'Morning' }

export default function ShiftScheduling(){
  const { shifts, employees, dispatch, showToast } = useApp()
  const [showModal, setModal] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [search, setSearch] = useState('')

  const enriched = shifts
    .map(s=>({...s, emp:employees.find(e=>e.id===s.empId)}))
    .filter(s=>!search||s.emp?.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>b.date.localeCompare(a.date))

  const field = k=>({ value:form[k], onChange:e=>setForm(f=>({...f,[k]:e.target.value})) })

  const handleAdd = () => {
    if(!form.empId||!form.date||!form.startTime||!form.endTime){ showToast('Fill all fields','danger'); return }
    dispatch({type:ACTIONS.ADD_SHIFT, payload:{...form, empId:Number(form.empId)}})
    const emp = employees.find(e=>e.id===Number(form.empId))
    dispatch({type:ACTIONS.ADD_NOTIFICATION, payload:{userId:`emp${form.empId}`, type:'shift', msg:`New shift scheduled: ${form.date} ${form.startTime}–${form.endTime}`, time:new Date().toISOString().slice(0,16)}})
    showToast(`Shift added for ${emp?.name}`,'success')
    setModal(false); setForm(EMPTY)
  }

  const typeColor = t=>t==='Early'?'info':t==='Morning'?'accent':t==='Late'?'warning':'muted'

  return (
    <div className={styles.section}>
      <div className={styles.filterBar}>
        <input className={styles.searchInput} placeholder="Search employee…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <Button variant="primary" onClick={()=>setModal(true)}>+ Assign Shift</Button>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead><tr><th>Employee</th><th>Date</th><th>Start</th><th>End</th><th>Shift Type</th><th>Actions</th></tr></thead>
          <tbody>
            {enriched.length===0&&<tr><td colSpan={6} className={styles.emptyRow}>No shifts scheduled</td></tr>}
            {enriched.map(s=>(
              <tr key={s.id}>
                <td><div className={styles.empCell}><div className={styles.empAvatar}>{s.emp?.avatar}</div><strong>{s.emp?.name}</strong></div></td>
                <td className="mono">{s.date}</td>
                <td className="mono">{s.startTime}</td>
                <td className="mono">{s.endTime}</td>
                <td><Badge variant={typeColor(s.shiftType)}>{s.shiftType}</Badge></td>
                <td><Button size="sm" variant="danger" onClick={()=>{dispatch({type:ACTIONS.REMOVE_SHIFT,payload:s.id});showToast('Shift removed','success')}}>Remove</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={()=>setModal(false)} title="Assign New Shift">
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Employee</label>
            <select className={styles.formInput} {...field('empId')}>
              <option value="">Select employee</option>
              {employees.map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Date</label>
            <input className={styles.formInput} type="date" {...field('date')}/>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Start Time</label>
            <input className={styles.formInput} type="time" {...field('startTime')}/>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>End Time</label>
            <input className={styles.formInput} type="time" {...field('endTime')}/>
          </div>
          <div className={styles.formGroup} style={{gridColumn:'1/-1'}}>
            <label className={styles.formLabel}>Shift Type</label>
            <select className={styles.formInput} {...field('shiftType')}>
              {SHIFT_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.modalActions}>
          <Button onClick={()=>setModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAdd}>Assign Shift</Button>
        </div>
      </Modal>
    </div>
  )
}
