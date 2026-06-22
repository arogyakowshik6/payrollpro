import { useApp } from '../../context/AppContext'
import { calcPay, fmtGBP } from '../../utils'
import { PAYROLL_MONTHS } from '../../data/seedData'
import styles from '../Pages.module.css'
import aStyles from './Analytics.module.css'

function BarChart({ data, height=140 }){
  const max = Math.max(...data.map(d=>d.value), 1)
  return (
    <div className={aStyles.chart}>
      {data.map((d,i)=>(
        <div key={i} className={aStyles.bar}>
          <div className={aStyles.barWrap} style={{height}}>
            <div className={aStyles.barInner} style={{height:`${(d.value/max)*100}%`, background:d.color||'var(--accent)'}}/>
          </div>
          <div className={aStyles.barLabel}>{d.label}</div>
          <div className={aStyles.barVal}>{d.display||d.value}</div>
        </div>
      ))}
    </div>
  )
}

function DonutRing({ segments }){
  const total = segments.reduce((s,x)=>s+x.value,0)||1
  let offset  = 0
  const r=40, circ=2*Math.PI*r
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {segments.map((seg,i)=>{
        const pct = seg.value/total
        const dash = circ*pct
        const gap  = circ-dash
        const el = (
          <circle key={i} cx="60" cy="60" r={r}
            fill="none" stroke={seg.color} strokeWidth="18"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            style={{transform:'rotate(-90deg)',transformOrigin:'60px 60px'}}
          />
        )
        offset += dash
        return el
      })}
      <circle cx="60" cy="60" r="30" fill="var(--bg-card)"/>
    </svg>
  )
}

export default function Analytics(){
  const { employees, attendance, getHoursForEmp } = useApp()
  const month = '2025-07'

  const payrollData = employees.map(e=>{
    const h = getHoursForEmp(e.id, month)
    const { gross } = calcPay(h, e.rate)
    return { label:e.name.split(' ')[0], value:Math.round(gross), display:fmtGBP(gross), color:'var(--accent)' }
  })

  const attData = employees.map(e=>{
    const days = attendance.filter(r=>r.empId===e.id&&r.date.startsWith(month)).length
    return { label:e.name.split(' ')[0], value:days, display:`${days}d`, color:'var(--success)' }
  })

  const deptCosts = {}
  employees.forEach(e=>{
    const h = getHoursForEmp(e.id, month)
    const { gross } = calcPay(h, e.rate)
    deptCosts[e.dept] = (deptCosts[e.dept]||0)+gross
  })
  const deptColors = ['var(--accent)','var(--success)','var(--warning)','var(--info,#38bdf8)']
  const deptSegments = Object.entries(deptCosts).map(([name,val],i)=>({name,value:Math.round(val),color:deptColors[i%deptColors.length]}))

  const monthlyTrend = PAYROLL_MONTHS.map((m,i)=>{
    const base = employees.reduce((s,e)=>s+getHoursForEmp(e.id,m.value)*e.rate,0)
    const val  = base>0?base:employees.reduce((s,e)=>s+e.rate*32,0)*(0.85+i*0.075)
    return { label:m.label.slice(0,3), value:Math.round(val), display:fmtGBP(val), color:'var(--warning)' }
  }).reverse()

  const lateData = employees.map(e=>{
    const lateCount = attendance.filter(r=>r.empId===e.id&&r.late).length
    const total     = attendance.filter(r=>r.empId===e.id).length
    return { label:e.name.split(' ')[0], value:lateCount, display:`${lateCount}/${total}`, color:'var(--danger)' }
  })

  return (
    <div className={aStyles.page}>
      <div className={aStyles.grid4}>
        <div className={aStyles.chartCard} style={{gridColumn:'span 2'}}>
          <h4 className={aStyles.chartTitle}>Gross Payroll by Employee — July 2025</h4>
          <BarChart data={payrollData} height={140}/>
        </div>
        <div className={aStyles.chartCard} style={{gridColumn:'span 2'}}>
          <h4 className={aStyles.chartTitle}>Attendance Days by Employee</h4>
          <BarChart data={attData} height={140}/>
        </div>
        <div className={aStyles.chartCard}>
          <h4 className={aStyles.chartTitle}>Payroll Cost by Department</h4>
          <div className={aStyles.donutWrap}>
            <DonutRing segments={deptSegments}/>
            <div className={aStyles.legend}>
              {deptSegments.map(s=>(
                <div key={s.name} className={aStyles.legendRow}>
                  <span className={aStyles.legendDot} style={{background:s.color}}/>
                  <span>{s.name}</span>
                  <span className={aStyles.legendVal}>{fmtGBP(s.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={aStyles.chartCard}>
          <h4 className={aStyles.chartTitle}>Monthly Payroll Trend</h4>
          <BarChart data={monthlyTrend} height={130}/>
        </div>
        <div className={aStyles.chartCard} style={{gridColumn:'span 2'}}>
          <h4 className={aStyles.chartTitle}>Late Arrivals by Employee</h4>
          <BarChart data={lateData} height={100}/>
        </div>
      </div>
    </div>
  )
}
