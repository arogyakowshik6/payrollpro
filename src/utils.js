// ============================================================
// UTILITIES — Formatting + Payroll calculations
// ============================================================

import { TAX_RATE, NI_RATE } from './data/seedData'

/** Format number to 2 decimal places */
export const fmt = (n, dec = 2) => Number(n).toFixed(dec)

/** Format as GBP currency */
export const fmtGBP = (n) =>
  '£' + Number(n).toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

/** Calculate payroll breakdown for an employee */
export function calcPay(hours, rate) {
  const gross = hours * rate
  const tax   = gross * TAX_RATE
  const ni    = gross * NI_RATE
  const net   = gross - tax - ni
  return { gross, tax, ni, net, hours }
}

/** Get initials from full name */
export const getInitials = (name) =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

/** Format a Date object as HH:MM */
export const fmtTime = (date) =>
  date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

/** Format a Date object as YYYY-MM-DD */
export const fmtDate = (date) =>
  date.toISOString().split('T')[0]

/** Format elapsed seconds as HH:MM:SS */
export function fmtElapsed(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':')
}

/** Generate CSV string from payroll data */
export function generatePayrollCSV(employees, getHoursForEmp, month) {
  const headers = [
    'Employee', 'Department', 'Job Title', 'Hourly Rate (£)',
    'Hours Worked', 'Gross Pay (£)', 'Tax 20% (£)', 'NI 12% (£)', 'Net Pay (£)',
  ]
  const rows = employees.map(e => {
    const h = getHoursForEmp(e.id, month)
    const { gross, tax, ni, net } = calcPay(h, e.rate)
    return [
      e.name, e.dept, e.jobTitle, fmt(e.rate),
      fmt(h, 1), fmt(gross), fmt(tax), fmt(ni), fmt(net),
    ]
  })
  return [headers, ...rows]
    .map(row => row.map(v => `"${v}"`).join(','))
    .join('\n')
}

/** Trigger browser CSV download */
export function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
