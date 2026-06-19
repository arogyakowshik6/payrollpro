import styles from './Button.module.css'

/**
 * Button — variant: 'default' | 'primary' | 'success' | 'danger'
 */
export default function Button({
  children,
  variant = 'default',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  ...rest
}) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={cls}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}
