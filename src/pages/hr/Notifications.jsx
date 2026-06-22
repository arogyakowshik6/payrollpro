import { useApp, ACTIONS } from '../../context/AppContext'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import styles from '../Pages.module.css'
import nStyles from './Notifications.module.css'

const TYPE_META = {
  leave:   { icon:'🗓️', label:'Leave',   variant:'warning' },
  payslip: { icon:'💰', label:'Payslip', variant:'success' },
  shift:   { icon:'⏰', label:'Shift',   variant:'accent'  },
}

export default function Notifications(){
  const { currentUser, notifications, dispatch, getUserNotifications } = useApp()
  const myNotifs = getUserNotifications(currentUser)
  const unread   = myNotifs.filter(n=>!n.read).length

  const markRead = id => dispatch({type:ACTIONS.MARK_NOTIFICATION_READ, payload:id})
  const markAll  = ()  => dispatch({type:ACTIONS.MARK_ALL_READ})

  return (
    <div className={styles.section}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <div>
          <h3 style={{fontSize:14,fontWeight:600}}>Notifications</h3>
          <p style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>{unread} unread</p>
        </div>
        {unread>0 && <Button size="sm" onClick={markAll}>Mark all as read</Button>}
      </div>

      <div className={nStyles.list}>
        {myNotifs.length===0 && (
          <div className={nStyles.empty}>
            <span style={{fontSize:32}}>🔔</span>
            <p>No notifications yet</p>
          </div>
        )}
        {myNotifs.map(n=>{
          const meta = TYPE_META[n.type]||{icon:'📢',label:'Info',variant:'muted'}
          return (
            <div key={n.id} className={`${nStyles.item} ${n.read?nStyles.read:nStyles.unread}`} onClick={()=>markRead(n.id)}>
              <div className={nStyles.icon}>{meta.icon}</div>
              <div className={nStyles.body}>
                <p className={nStyles.msg}>{n.msg}</p>
                <p className={nStyles.time}>{n.time}</p>
              </div>
              <div className={nStyles.right}>
                <Badge variant={meta.variant}>{meta.label}</Badge>
                {!n.read && <div className={nStyles.dot}/>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
