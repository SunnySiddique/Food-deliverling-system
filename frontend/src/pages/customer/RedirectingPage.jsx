import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RedirectingPage.module.css';

function RedirectingPage() {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  // Simulate PayHere sandbox redirect — navigate to confirmation after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/confirmation');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Animate the pulsing dots in the text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.spinner} />
      <p className={styles.text}>
        Redirecting to PayHere{dots}
      </p>
    </div>
  );
}

export default RedirectingPage;
