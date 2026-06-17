import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './AdminLayout.module.css';

function AdminLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={styles.layout}>
      {/* Dark header bar */}
      <header className={styles.header}>
        <Link to="/admin" className={styles.brand} onClick={closeMenu}>
          <span className={styles.brandIcon}>🧾</span>
          Tastify
          <span className={styles.role}>Admin</span>
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

        <nav className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}>
          <Link
            to="/admin"
            end
            className={`${styles.navLink} ${isActive('/admin') ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/orders"
            className={`${styles.navLink} ${isActive('/admin/orders') ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Orders
          </Link>
          <Link
            to="/admin/customers"
            className={`${styles.navLink} ${isActive('/admin/customers') ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Customers
          </Link>
          <Link
            to="/admin/foods"
            className={`${styles.navLink} ${isActive('/admin/foods') ? styles.activeLink : ''}`}
            onClick={closeMenu}
          >
            Menu Items
          </Link>
        </nav>
      </header>

      {/* Overlay for mobile menu */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}

      {/* Main content */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
