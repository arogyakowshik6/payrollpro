import { useApp } from '../../context/AppContext'
import { calcPay, fmtGBP, fmt, fmtCurrency, convertCurrency } from '../../utils'
import { PAYROLL_MONTHS, PAYSLIP_HISTORY } from '../../data/seedData'
import { useState } from 'react'
import styles from '../Pages.module.css'
import psStyles from '../Payslip.module.css'

export default function PayslipHistory(){
  const { currentUser, employees, getHoursForEmp } = useApp()
  const emp = employees.find(e=>e.id===currentUser?.empId)
  const [selected, setSelected] = useState('2025-07')

  const allMonths = [{value:'2025-07',label:'July 2025',issued:'2025-07-31'}, ...PAYSLIP_HISTORY]

  const hours  = getHoursForEmp(emp?.id, selected)
  const pay    = emp ? calcPay(hours, emp.rate, emp.currency) : {}
  const meta   = allMonths.find(m=>m.value===selected)

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div><h3 className={styles.sectionTitle}>Payslip History</h3><p className={styles.sectionSub}>View all past payslips</p></div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:24,alignItems:'start'}}>
        {/* Month selector */}
        <div style={{background:'var(--bg-card)',border:'1px solid var(--border)',borderRadius:'var(--r-md)',overflow:'hidden'}}>
          {allMonths.map(m=>(
            <button key={m.value} onClick={()=>setSelected(m.value)} style={{width:'100%',padding:'12px 16px',background:selected===m.value?'var(--accent-dim)':'transparent',border:'none',borderBottom:'1px solid var(--border)',color:selected===m.value?'var(--accent)':'var(--text-secondary)',fontWeight:selected===m.value?600:400,cursor:'pointer',textAlign:'left',fontSize:13,transition:'all .15s'}}>
              {m.label}
              <span style={{display:'block',fontSize:11,color:'var(--text-muted)',marginTop:2}}>Issued {m.issued}</span>
            </button>
          ))}
        </div>

        {/* Payslip */}
        {emp && (
          <div className={psStyles.payslip}>
            <div className={psStyles.header}>
              <div>
                <div className={psStyles.brandMark}>P</div>
                <h2 className={psStyles.brand}>PayrollPro</h2>
                <p className={psStyles.brandSub}>Monthly Payslip</p>
              </div>
              <div className={psStyles.headerRight}>
                <p className={psStyles.period}>{meta?.label}</p>
                <p className={psStyles.issued}>Issued: {meta?.issued}</p>
              </div>
            </div>
            <div className={psStyles.section}>
              <p className={psStyles.sectionLabel}>Employee Details</p>
              {[['Name',emp.name],['Department',emp.dept],['Job Title',emp.jobTitle],['Preferred Currency',emp.currency]].map(([l,v])=>(
                <div key={l} className={psStyles.row}><span className={psStyles.rowLabel}>{l}</span><span className={psStyles.rowValue}>{v}</span></div>
              ))}
            </div>
            <div className={psStyles.section}>
              <p className={psStyles.sectionLabel}>Earnings</p>
              <div className={psStyles.row}><span className={psStyles.rowLabel}>Hours Worked</span><span className={psStyles.rowValue}>{fmt(hours,1)} hrs</span></div>
              <div className={psStyles.row}><span className={psStyles.rowLabel}>Hourly Rate</span><span className={psStyles.rowValue}>£{emp.rate}/hr</span></div>
              <div className={psStyles.row}><span className={psStyles.rowLabel}>Gross Pay (GBP)</span><span className={psStyles.rowValue}>{fmtGBP(pay.gross)}</span></div>
              {emp.currency!=='GBP'&&<div className={psStyles.row}><span className={psStyles.rowLabel}>Gross Pay ({emp.currency})</span><span className={psStyles.rowValue} style={{color:'var(--accent)'}}>{fmtCurrency(pay.grossConv,emp.currency)}</span></div>}
            </div>
            <div className={psStyles.section}>
              <p className={psStyles.sectionLabel}>Deductions</p>
              <div className={psStyles.row}><span className={psStyles.rowLabel}>Income Tax (20%)</span><span className={`${psStyles.rowValue} ${psStyles.warning}`}>− {fmtGBP(pay.tax)}</span></div>
              <div className={psStyles.row}><span className={psStyles.rowLabel}>National Insurance (12%)</span><span className={`${psStyles.rowValue} ${psStyles.warning}`}>− {fmtGBP(pay.ni)}</span></div>
            </div>
            <div className={psStyles.total}>
              <div>
                <span className={psStyles.totalLabel}>Net Pay (GBP)</span>
                <div className={psStyles.totalValue}>{fmtGBP(pay.net)}</div>
              </div>
              {emp.currency!=='GBP'&&(
                <div style={{textAlign:'right'}}>
                  <span className={psStyles.totalLabel}>Net Pay ({emp.currency})</span>
                  <div className={psStyles.totalValue} style={{fontSize:18}}>{fmtCurrency(pay.netConv,emp.currency)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
