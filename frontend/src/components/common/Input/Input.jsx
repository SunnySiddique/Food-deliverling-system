import styles from "./Input.module.css";

function Input({ label, type = "text", id, error, className = "", ...rest }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={inputId}
          className={`${styles.input} ${styles.textarea} ${error ? styles.hasError : ""}`}
          {...rest}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          className={`${styles.input} ${error ? styles.hasError : ""}`}
          {...rest}
        />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default Input;
