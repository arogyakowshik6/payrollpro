import { useApp } from '../../context/AppContext'
import { calcPerformance, downloadCSV, fmt } from '../../utils'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import styles from '../Pages.module.css'
import perfStyles from './Performance.module.css'

function MiniBar({ value, max=100, color='var(--accent)' }){
  return (
    <div className={perfStyles.barTrack}>
      <div className={perfStyles.barFill} style={{width:`${Math.min(100,(value/max)*100)}%`, background:color}}/>
    </div>
  )
}

export default function Performance(){
  const { employees, attendance, leaves, showToast } = useApp()

  const rows = employees.map(e=>({
    ...e, ...calcPerformance(e.id, attendance, leaves)
  }))

  const exportReport = ()=>{
    const headers=['Employee','Department','Total Days','Late Arrivals','Punctuality %','Overtime hrs','Leaves Taken']
    const data = rows.map(r=>[r.name,r.dept,r.totalDays,r.lateCount,r.punctuality+'%',r.overtime,r.leavesTaken])
    const csv = [headers,...data].map(r=>r.map(v=>`"${v}"`).join(',')).join('\n')
    downloadCSV(csv,'performance_report.csv')
    showToast('Performance report exported!','success')
  }

  const punctColor = p => p>=90?'var(--success)':p>=70?'var(--warning)':'var(--danger)'
  const punctVariant = p => p>=90?'success':p>=70?'warning':'danger'

  return (
    <div>
      <div className={styles.section} style={{paddingBottom:0}}>
        <div className={styles.filterBar}>
          <Button variant="success" onClick={exportReport}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI summary cards */}
      <div className={perfStyles.kpiGrid}>
        {rows.map(e=>(
          <div key={e.id} className={perfStyles.kpiCard}>
            <div className={perfStyles.kpiHeader}>
              <div className={styles.empAvatar}>{e.avatar}</div>
              <div>
                <p className={styles.empName}>{e.name}</p>
                <p className={styles.empTitle}>{e.dept}</p>
              </div>
              <Badge variant={punctVariant(e.punctuality)}>{e.punctuality}%</Badge>
            </div>
            <div className={perfStyles.kpiRows}>
              <div className={perfStyles.kpiRow}>
                <span>Punctuality</span>
                <div className={perfStyles.kpiRight}><MiniBar value={e.punctuality} color={punctColor(e.punctuality)}/><span>{e.punctuality}%</span></div>
              </div>
              <div className={perfStyles.kpiRow}>
                <span>Days Worked</span>
                <strong>{e.totalDays}</strong>
              </div>
              <div className={perfStyles.kpiRow}>
                <span>Late Arrivals</span>
                <strong style={{color:e.lateCount>0?'var(--warning)':'var(--success)'}}>{e.lateCount}</strong>
              </div>
              <div className={perfStyles.kpiRow}>
                <span>Overtime</span>
                <strong style={{color:'var(--accent)'}}>{e.overtime} hrs</strong>
              </div>
              <div className={perfStyles.kpiRow}>
                <span>Leaves Taken</span>
                <strong>{e.leavesTaken} days</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table view */}
      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Employee</th><th>Dept</th><th>Days Worked</th><th>Late</th><th>Punctuality</th><th>Overtime</th><th>Leaves</th><th>Rating</th></tr></thead>
            <tbody>
              {rows.map(r=>(
                <tr key={r.id}>
                  <td><div className={styles.empCell}><div className={styles.empAvatar}>{r.avatar}</div><strong>{r.name}</strong></div></td>
                  <td>{r.dept}</td>
                  <td className="mono">{r.totalDays}</td>
                  <td className="mono" style={{color:r.lateCount>0?'var(--warning)':'var(--success)'}}>{r.lateCount}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <MiniBar value={r.punctuality} color={punctColor(r.punctuality)}/>
                      <span className="mono">{r.punctuality}%</span>
                    </div>
                  </td>
                  <td className="mono" style={{color:'var(--accent)'}}>{r.overtime} hrs</td>
                  <td className="mono">{r.leavesTaken}</td>
                  <td><Badge variant={punctVariant(r.punctuality)}>{r.punctuality>=90?'Excellent':r.punctuality>=70?'Good':'Needs Review'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
