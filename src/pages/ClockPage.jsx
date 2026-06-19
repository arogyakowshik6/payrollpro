import { useState, useEffect } from 'react'
import { useApp, ACTIONS } from '../context/AppContext'
import { fmtGBP, fmt, fmtTime, fmtDate, fmtElapsed, calcPay } from '../utils'
import styles from './Clock.module.css'

export default function ClockPage() {
  const { currentUser, clockedInSince, attendance, employees, dispatch, showToast } = useApp()
  const [now, setNow] = useState(new Date())

  // Tick every second
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const emp = employees.find(e => e.id === currentUser?.empId)
  if (!emp) return <p style={{ padding: 28, color: 'var(--text-muted)' }}>Employee record not found.</p>

  const month = '2025-07'
  const myShifts = attendance.filter(r => r.empId === emp.id)
  const { hours: monthHours, gross: monthGross } = calcPay(
    attendance.filter(r => r.empId === emp.id && r.date.startsWith(month)).reduce((s, r) => s + r.hours, 0),
    emp.rate
  )

  const sessionSeconds = clockedInSince ? Math.floor((now - clockedInSince) / 1000) : 0
  const isClockedIn    = !!clockedInSince

  const handleToggle = () => {
    if (!isClockedIn) {
      dispatch({ type: ACTIONS.CLOCK_IN, payload: new Date() })
      showToast('Clocked in at ' + fmtTime(new Date()), 'success')
    } else {
      const clockOutTime = new Date()
      const hours = parseFloat(((clockOutTime - clockedInSince) / 3600000).toFixed(2))
      const record = {
        empId:    emp.id,
        date:     fmtDate(clockedInSince),
        clockIn:  fmtTime(clockedInSince),
        clockOut: fmtTime(clockOutTime),
        hours,
      }
      dispatch({ type: ACTIONS.CLOCK_OUT, payload: { record } })
      showToast(`Clocked out — ${fmt(hours, 2)} hrs recorded`, 'success')
    }
  }

  return (
    <div className={styles.layout}>
      {/* LEFT — Clock panel */}
      <div className={styles.left}>
        {/* Live clock */}
        <div className={styles.clockCard}>
          <p className={styles.clockLabel}>Live Clock</p>
          <p className={styles.clockTime}>{now.toLocaleTimeString('en-GB')}</p>
          <p className={styles.clockDate}>
            {now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          {/* Status badge */}
          <div className={`${styles.statusBadge} ${isClockedIn ? styles.in : styles.out}`}>
            <span className={styles.statusDot} />
            {isClockedIn ? 'Currently clocked in' : 'Not clocked in'}
          </div>

          {/* Session timer */}
          {isClockedIn && (
            <div className={styles.sessionTimer}>
              <span className={styles.timerLabel}>Session duration</span>
              <span className={styles.timerValue}>{fmtElapsed(sessionSeconds)}</span>
            </div>
          )}

          {/* Clock button */}
          <button
            className={`${styles.clockBtn} ${isClockedIn ? styles.btnOut : styles.btnIn}`}
            onClick={handleToggle}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>

          {clockedInSince && (
            <p className={styles.clockInfo}>Started at {fmtTime(clockedInSince)}</p>
          )}
        </div>

        {/* My monthly stats */}
        <div className={styles.statsRow}>
          <div className={styles.miniStat}>
            <p className={styles.miniLabel}>Hours This Month</p>
            <p className={styles.miniValue} style={{ color: 'var(--success)' }}>{fmt(monthHours, 1)} hrs</p>
          </div>
          <div className={styles.miniStat}>
            <p className={styles.miniLabel}>Gross Earned</p>
            <p className={styles.miniValue} style={{ color: 'var(--accent)' }}>{fmtGBP(monthGross)}</p>
          </div>
        </div>
      </div>

      {/* RIGHT — Shift log table */}
      <div className={styles.right}>
        <div className={styles.shiftHeader}>
          <h3 className={styles.shiftTitle}>My Shift Log</h3>
          <p className={styles.shiftSub}>{myShifts.length} shifts recorded</p>
        </div>
        <div className={styles.shiftTable}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Date', 'Clock In', 'Clock Out', 'Hours'].map(h => (
                  <th key={h} style={{ padding: '9px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myShifts.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
                    No shifts recorded yet — clock in to get started
                  </td>
                </tr>
              )}
              {[...myShifts].reverse().map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{r.date}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>{r.clockIn}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)' }}>{r.clockOut ?? '—'}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{fmt(r.hours, 1)} hrs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
