import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import styles from './AuthForm.module.css';

function RegisterPage() {
  const handleRegister = (e) => {
    e.preventDefault();
    // UI shell — no backend logic
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <form className={styles.form} onSubmit={handleRegister}>
          <Input label="Full Name" type="text" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Phone" type="tel" placeholder="+1 234 567 890" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button variant="primary" size="lg" fullWidth type="submit">
            Register
          </Button>
        </form>
        <div className={styles.links}>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
