import { useState } from 'react'
import { useApp, ACTIONS } from '../../context/AppContext'
import Button from '../../components/ui/Button'
import styles from '../Pages.module.css'

export default function SelfService(){
  const { currentUser, employees, dispatch, showToast } = useApp()
  const emp = employees.find(e=>e.id===currentUser?.empId)
  const [form, setForm] = useState({ name:emp?.name||'', email:emp?.email||'', phone:emp?.phone||'', address:emp?.address||'' })
  const [editing, setEditing] = useState(false)

  const field = k=>({ value:form[k], onChange:e=>setForm(f=>({...f,[k]:e.target.value})), disabled:!editing })

  const handleSave = ()=>{
    if(!form.name.trim()||!form.email.trim()){ showToast('Name and email required','danger'); return }
    dispatch({type:ACTIONS.UPDATE_SELF, payload:{id:emp.id, ...form}})
    showToast('Profile updated successfully!','success')
    setEditing(false)
  }

  return (
    <div className={styles.section}>
      <div style={{maxWidth:520}}>
        <div className={styles.sectionHeader}>
          <div><h3 className={styles.sectionTitle}>My Profile</h3><p className={styles.sectionSub}>Update your personal details</p></div>
          {!editing
            ? <Button onClick={()=>setEditing(true)}>Edit Profile</Button>
            : <div style={{display:'flex',gap:8}}><Button onClick={()=>setEditing(false)}>Cancel</Button><Button variant="primary" onClick={handleSave}>Save Changes</Button></div>}
        </div>

        <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:24}}>
          {/* Read-only info */}
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
            <div style={{width:52,height:52,borderRadius:'50%',background:'var(--accent-dim)',color:'var(--accent)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700}}>{emp?.avatar}</div>
            <div>
              <p style={{fontWeight:600,fontSize:15}}>{emp?.name}</p>
              <p style={{fontSize:12,color:'var(--text-muted)'}}>{emp?.jobTitle} · {emp?.dept}</p>
              <p style={{fontSize:12,color:'var(--text-muted)'}}>Joined {emp?.start}</p>
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <input className={styles.formInput} style={{opacity:editing?1:.7}} {...field('name')}/>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address</label>
              <input className={styles.formInput} type="email" style={{opacity:editing?1:.7}} {...field('email')}/>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone Number</label>
              <input className={styles.formInput} style={{opacity:editing?1:.7}} {...field('phone')}/>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Address</label>
              <input className={styles.formInput} style={{opacity:editing?1:.7}} {...field('address')}/>
            </div>
          </div>

          {/* Read-only employment info */}
          <div style={{marginTop:20,paddingTop:16,borderTop:'1px solid var(--border)'}}>
            <p className={styles.formLabel} style={{marginBottom:12}}>Employment Details (HR managed)</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {[['Department',emp?.dept],['Job Title',emp?.jobTitle],['Hourly Rate','£'+emp?.rate+'/hr'],['Start Date',emp?.start]].map(([l,v])=>(
                <div key={l}>
                  <p style={{fontSize:11,color:'var(--text-muted)',marginBottom:3}}>{l}</p>
                  <p style={{fontSize:13.5,fontWeight:500}}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
