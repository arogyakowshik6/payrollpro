import { TAX_RATE, NI_RATE, EXCHANGE_RATES, CURRENCY_SYMBOLS } from './data/seedData'

export const fmt    = (n, dec=2) => Number(n).toFixed(dec)
export const fmtTime = d => d.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})
export const fmtDate = d => d.toISOString().split('T')[0]

export function fmtGBP(n){ return '£'+Number(n).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}) }

export function fmtCurrency(n, currency='GBP'){
  const sym = CURRENCY_SYMBOLS[currency] || '£'
  return sym + Number(n).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})
}

export function convertCurrency(gbpAmount, toCurrency){
  return gbpAmount * (EXCHANGE_RATES[toCurrency] || 1)
}

export function calcPay(hours, rate, currency='GBP'){
  const gross    = hours * rate
  const tax      = gross * TAX_RATE
  const ni       = gross * NI_RATE
  const net      = gross - tax - ni
  const grossConv = convertCurrency(gross, currency)
  const netConv   = convertCurrency(net, currency)
  return { gross, tax, ni, net, hours, grossConv, netConv, currency }
}

export function fmtElapsed(seconds){
  const h=Math.floor(seconds/3600), m=Math.floor((seconds%3600)/60), s=Math.floor(seconds%60)
  return [h,m,s].map(v=>String(v).padStart(2,'0')).join(':')
}

export function calcPerformance(empId, attendance, leaves){
  const shifts = attendance.filter(r=>r.empId===empId)
  const total  = shifts.length
  if(!total) return { punctuality:0, overtime:0, totalDays:0, lateCount:0, leavesTaken:0 }
  const lateCount   = shifts.filter(r=>r.late).length
  const punctuality = Math.round(((total-lateCount)/total)*100)
  const overtime    = shifts.reduce((s,r)=>s+Math.max(0,r.hours-(r.scheduledHours||8)),0)
  const leavesTaken = leaves.filter(l=>l.empId===empId && l.status==='approved').reduce((s,l)=>s+l.days,0)
  return { punctuality, overtime:parseFloat(overtime.toFixed(1)), totalDays:total, lateCount, leavesTaken }
}

export function generatePayrollCSV(employees, getHoursForEmp, month){
  const headers=['Employee','Department','Currency','Hourly Rate','Hours','Gross (GBP)','Tax 20%','NI 12%','Net (GBP)','Net (Local)']
  const rows = employees.map(e=>{
    const h = getHoursForEmp(e.id, month)
    const { gross, tax, ni, net, netConv } = calcPay(h, e.rate, e.currency)
    return [e.name, e.dept, e.currency, fmt(e.rate), fmt(h,1), fmt(gross), fmt(tax), fmt(ni), fmt(net), fmt(netConv)]
  })
  return [headers,...rows].map(r=>r.map(v=>`"${v}"`).join(',')).join('\n')
}

export function downloadCSV(content, filename){
  const blob=new Blob([content],{type:'text/csv'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a')
  a.href=url; a.download=filename; a.click()
  URL.revokeObjectURL(url)
}
