import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import styles from './AuthForm.module.css';

function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault();
    // UI shell — no backend logic
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button variant="primary" size="lg" fullWidth type="submit">
            Sign In
          </Button>
        </form>
        <div className={styles.links}>
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
