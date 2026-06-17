import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './CustomerLayout.module.css';

function CustomerLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={styles.layout}>
      {/* Sticky top nav */}
      <nav className={styles.nav}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandIcon}>🍽</span>
          Tastify
        </Link>

        {/* Hamburger toggle (visible on mobile) */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          <Link
            to="/menu"
            className={`${styles.navLink} ${isActive('/menu') ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link
            to="/cart"
            className={`${styles.navLink} ${isActive('/cart') ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Cart
          </Link>
          <Link
            to="/login"
            className={`${styles.navLink} ${isActive('/login') ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}

      {/* Main content area */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default CustomerLayout;
