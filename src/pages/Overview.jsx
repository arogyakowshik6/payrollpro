import { useApp } from '../context/AppContext'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import { fmtGBP, fmt, calcPay } from '../utils'
import styles from './Pages.module.css'

export default function Overview() {
  const { employees, getHoursForEmp } = useApp()
  const month = '2025-07'

  // Aggregate stats
  const stats = employees.map(e => {
    const hours = getHoursForEmp(e.id, month)
    return { ...e, hours, ...calcPay(hours, e.rate) }
  })
  const totalHours  = stats.reduce((s, e) => s + e.hours, 0)
  const totalGross  = stats.reduce((s, e) => s + e.gross, 0)

  return (
    <div>
      {/* Stat cards */}
      <div className={styles.statsGrid}>
        <StatCard
          label="Total Employees"
          value={employees.length}
          sub="Active this month"
          valueColor="accent"
        />
        <StatCard
          label="Total Hours (July)"
          value={fmt(totalHours, 1) + ' hrs'}
          sub="Across all staff"
        />
        <StatCard
          label="Monthly Gross Payroll"
          value={fmtGBP(totalGross)}
          sub="Before tax & NI"
          valueColor="warning"
        />
        <StatCard
          label="Net Payroll"
          value={fmtGBP(totalGross * 0.68)}
          sub="After 20% tax + 12% NI"
          valueColor="success"
        />
      </div>

      {/* Table */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h3 className={styles.sectionTitle}>Employee Overview</h3>
            <p className={styles.sectionSub}>Hours worked and earnings — July 2025</p>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Status</th>
                <th>Hours</th>
                <th>Rate</th>
                <th>Gross Pay</th>
                <th>Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(e => (
                <tr key={e.id}>
                  <td>
                    <div className={styles.empCell}>
                      <div className={styles.empAvatar}>{e.avatar}</div>
                      <div>
                        <p className={styles.empName}>{e.name}</p>
                        <p className={styles.empTitle}>{e.jobTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td><Badge variant="accent">{e.dept}</Badge></td>
                  <td><Badge variant="success" dot>Active</Badge></td>
                  <td className="mono">{fmt(e.hours, 1)} hrs</td>
                  <td className="mono">£{e.rate}/hr</td>
                  <td className="mono">{fmtGBP(e.gross)}</td>
                  <td className={`mono ${styles.netPay}`}>{fmtGBP(e.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
