import styles from './Badge.module.css'

/**
 * Badge — variant: 'accent' | 'success' | 'warning' | 'danger' | 'muted'
 */
export default function Badge({ children, variant = 'muted', dot = false }) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  )
}
