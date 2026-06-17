import styles from './Badge.module.css';

function Badge({ children, variant = 'default', size = 'md' }) {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {children}
    </span>
  );
}

export default Badge;
