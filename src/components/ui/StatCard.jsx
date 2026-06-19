import styles from './StatCard.module.css'

/**
 * StatCard — displays a single KPI metric
 * valueColor: 'accent' | 'success' | 'warning' | 'danger'
 */
export default function StatCard({ label, value, sub, valueColor = 'default' }) {
  return (
    <div className={styles.card}>
      <p className={styles.label}>{label}</p>
      <p className={`${styles.value} ${styles[valueColor]}`}>{value}</p>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  )
}
