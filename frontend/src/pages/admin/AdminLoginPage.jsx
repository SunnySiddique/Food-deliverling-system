import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import styles from './AdminLoginPage.module.css';

function AdminLoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // UI shell — navigate to admin dashboard
    navigate('/admin');
  };

  return (
    <div className={styles.page}>
      {/* Dark ink-toned header bar to distinguish admin role */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.headerIcon}>🧾</span>
          <span className={styles.headerBrand}>Tastify</span>
          <span className={styles.headerRole}>Admin</span>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.card}>
          <h1 className={styles.title}>Staff Login</h1>
          <form className={styles.form} onSubmit={handleLogin}>
            <Input label="Email" type="email" placeholder="admin@tastify.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Button variant="primary" size="lg" fullWidth type="submit">
              Log in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
