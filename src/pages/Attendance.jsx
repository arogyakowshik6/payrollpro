import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { fmtGBP, fmt } from '../utils'
import { PAYROLL_MONTHS } from '../data/seedData'
import styles from './Pages.module.css'

export default function Attendance() {
  const { employees, attendance } = useApp()
  const [search, setSearch]   = useState('')
  const [month, setMonth]     = useState('')

  const filtered = attendance.filter(r => {
    const emp = employees.find(e => e.id === r.empId)
    if (!emp) return false
    const q = search.toLowerCase()
    return (
      (!q     || emp.name.toLowerCase().includes(q)) &&
      (!month || r.date.startsWith(month))
    )
  })

  // Sort newest first
  const sorted = [...filtered].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className={styles.section}>
      <div className={styles.filterBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search attendance records"
        />
        <select
          className={styles.selectInput}
          value={month}
          onChange={e => setMonth(e.target.value)}
          aria-label="Filter by month"
        >
          <option value="">All Months</option>
          {PAYROLL_MONTHS.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Hours</th>
              <th>Pay (Gross)</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.emptyRow}>No attendance records found</td>
              </tr>
            )}
            {sorted.map(r => {
              const emp = employees.find(e => e.id === r.empId)
              if (!emp) return null
              const pay = r.hours * emp.rate
              return (
                <tr key={r.id}>
                  <td>
                    <div className={styles.empCell}>
                      <div className={styles.empAvatar}>{emp.avatar}</div>
                      <strong>{emp.name}</strong>
                    </div>
                  </td>
                  <td className={styles.muted}>{r.date}</td>
                  <td className="mono">{r.clockIn}</td>
                  <td className="mono">{r.clockOut ?? <span style={{color:'var(--warning)'}}>—</span>}</td>
                  <td className="mono">{fmt(r.hours, 1)} hrs</td>
                  <td className={`mono ${styles.success}`}>{fmtGBP(pay)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
