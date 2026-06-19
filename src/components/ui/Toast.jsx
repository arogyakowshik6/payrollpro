import { useApp } from '../../context/AppContext'
import styles from './Toast.module.css'

export default function Toast() {
  const { toast } = useApp()
  if (!toast) return null

  return (
    <div className={`${styles.toast} ${styles[toast.type]} ${styles.show}`} role="alert">
      <span className={styles.icon}>
        {toast.type === 'danger' ? '✕' : '✓'}
      </span>
      <span className={styles.msg}>{toast.msg}</span>
    </div>
  )
}
