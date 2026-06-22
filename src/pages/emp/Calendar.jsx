import { useApp } from '../../context/AppContext'
import Badge from '../../components/ui/Badge'
import styles from '../Pages.module.css'
import cStyles from './Calendar.module.css'

const TYPE_COLOR = { shift:'accent', leave:'warning', meeting:'success' }

export default function Calendar(){
  const { currentUser, calendarEvents, shifts } = useApp()
  const empId = currentUser?.empId

  const myEvents = calendarEvents.filter(e=>e.empId===empId)
  const myShifts = shifts.filter(s=>s.empId===empId).map(s=>({
    id:`shift-${s.id}`, empId:s.empId, title:`${s.shiftType} Shift`,
    date:s.date, time:`${s.startTime}–${s.endTime}`, type:'shift'
  }))

  const allEvents = [...myEvents, ...myShifts].sort((a,b)=>a.date.localeCompare(b.date))
  const grouped   = allEvents.reduce((acc,e)=>{ (acc[e.date]||(acc[e.date]=[])).push(e); return acc },{})

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div><h3 className={styles.sectionTitle}>My Calendar</h3><p className={styles.sectionSub}>Shifts, leave, and meetings synced from HR</p></div>
      </div>

      <div className={cStyles.legend}>
        {Object.entries(TYPE_COLOR).map(([t,v])=>(
          <div key={t} className={cStyles.legendItem}><Badge variant={v}>{t.charAt(0).toUpperCase()+t.slice(1)}</Badge></div>
        ))}
        <span style={{fontSize:11,color:'var(--text-muted)',marginLeft:4}}>Simulates Google Calendar integration</span>
      </div>

      {Object.keys(grouped).length===0 && (
        <div className={styles.emptyRow} style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',padding:40}}>
          No upcoming events scheduled
        </div>
      )}

      <div className={cStyles.timeline}>
        {Object.entries(grouped).sort(([a],[b])=>a.localeCompare(b)).map(([date,events])=>(
          <div key={date} className={cStyles.day}>
            <div className={cStyles.dayLabel}>
              <p className={cStyles.dayDate}>{new Date(date+'T00:00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})}</p>
            </div>
            <div className={cStyles.events}>
              {events.map(e=>(
                <div key={e.id} className={`${cStyles.event} ${cStyles[e.type]}`}>
                  <p className={cStyles.eventTitle}>{e.title}</p>
                  <p className={cStyles.eventTime}>{e.time}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
