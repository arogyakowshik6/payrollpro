import { useState } from 'react'
import { useApp } from '../context/AppContext'
import StatCard from '../components/ui/StatCard'
import Button from '../components/ui/Button'
import { fmtGBP, fmt, calcPay, generatePayrollCSV, downloadCSV } from '../utils'
import { PAYROLL_MONTHS } from '../data/seedData'
import styles from './Pages.module.css'

export default function Payroll() {
  const { employees, getHoursForEmp, showToast } = useApp()
  const [month, setMonth] = useState('2025-07')

  const rows = employees.map(e => {
    const hours = getHoursForEmp(e.id, month)
    const pay   = calcPay(hours, e.rate)
    return { ...e, hours, ...pay }
  })

  const totalGross = rows.reduce((s, r) => s + r.gross, 0)
  const totalTax   = rows.reduce((s, r) => s + r.tax, 0)
  const totalNI    = rows.reduce((s, r) => s + r.ni, 0)
  const totalNet   = rows.reduce((s, r) => s + r.net, 0)

  const handleExport = () => {
    const csv = generatePayrollCSV(employees, getHoursForEmp, month)
    const label = PAYROLL_MONTHS.find(m => m.value === month)?.label ?? month
    downloadCSV(csv, `payroll_${month}.csv`)
    showToast(`Payroll CSV for ${label} exported!`, 'success')
  }

  return (
    <div>
      <div className={styles.section} style={{ paddingBottom: 0 }}>
        <div className={styles.filterBar}>
          <select
            className={styles.selectInput}
            value={month}
            onChange={e => setMonth(e.target.value)}
            aria-label="Select payroll month"
          >
            {PAYROLL_MONTHS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
          <Button variant="success" onClick={handleExport}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </Button>
        </div>
      </div>

      <div className={styles.statsGrid} style={{ paddingTop: 0 }}>
        <StatCard label="Total Gross"       value={fmtGBP(totalGross)} sub="Before deductions"    valueColor="accent" />
        <StatCard label="Tax (20%)"         value={fmtGBP(totalTax)}   sub="Income tax"           valueColor="warning" />
        <StatCard label="NI (12%)"          value={fmtGBP(totalNI)}    sub="National Insurance"   valueColor="warning" />
        <StatCard label="Net Payroll"       value={fmtGBP(totalNet)}   sub="Total take-home"      valueColor="success" />
      </div>

      <div className={styles.section}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Hours</th>
                <th>Rate</th>
                <th>Gross</th>
                <th>Tax 20%</th>
                <th>NI 12%</th>
                <th>Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td>
                    <div className={styles.empCell}>
                      <div className={styles.empAvatar}>{r.avatar}</div>
                      <div>
                        <p className={styles.empName}>{r.name}</p>
                        <p className={styles.empTitle}>{r.jobTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td>{r.dept}</td>
                  <td className="mono">{fmt(r.hours, 1)} hrs</td>
                  <td className="mono">£{r.rate}/hr</td>
                  <td className="mono">{fmtGBP(r.gross)}</td>
                  <td className={`mono ${styles.warning}`}>{fmtGBP(r.tax)}</td>
                  <td className={`mono ${styles.warning}`}>{fmtGBP(r.ni)}</td>
                  <td className={`mono ${styles.success} fw-600`}>{fmtGBP(r.net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
