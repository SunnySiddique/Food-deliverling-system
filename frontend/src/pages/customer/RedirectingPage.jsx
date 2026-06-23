import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RedirectingPage.module.css';

const PAYHERE_CHECKOUT_URL = 'https://sandbox.payhere.lk/pay/checkout';

function RedirectingPage() {
  const location = useLocation();
  const formRef = useRef(null);
  const submittedRef = useRef(false);
  const [dots, setDots] = useState('');

  const payment = location.state?.payment;

  // Auto-submit the PayHere form when the component mounts
  useEffect(() => {
    if (payment && formRef.current && !submittedRef.current) {
      submittedRef.current = true;
      // Small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        formRef.current?.submit();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [payment]);

  // Animate the pulsing dots in the text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  if (!payment) {
    return (
      <div className={styles.page}>
        <p className={styles.text}>No payment data available. Please go back to cart.</p>
      </div>
    );
  }

  // Exclude fields that shouldn't be sent to PayHere
  const { sandbox, ...formFields } = payment;

  return (
    <div className={styles.page}>
      <div className={styles.spinner} />
      <p className={styles.text}>
        Redirecting to PayHere{dots}
      </p>

      {/* Hidden form that auto-submits to PayHere */}
      <form
        ref={formRef}
        action={PAYHERE_CHECKOUT_URL}
        method="POST"
        style={{ display: 'none' }}
      >
        {Object.entries(formFields).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
      </form>
    </div>
  );
}

export default RedirectingPage;
