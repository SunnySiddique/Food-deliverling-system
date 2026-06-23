import { ChevronDown, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import useCartStore from "../store/useCartStore";
import styles from "./CustomerLayout.module.css";

function CustomerLayout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { items: cartItems, fetchCart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      closeMenu();
      setDropdownOpen(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.layout}>
      {/* Sticky top nav */}
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandTop} onClick={closeMenu}>
            <span className={styles.brandIcon}>🍽</span>
            Tastify
          </Link>
          {isAuthenticated && user && (
            <span className={styles.brandUser}>
              <span className={styles.navAvatarSmall}>
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
              {user.name?.split(" ")[0] || "Profile"}
            </span>
          )}
        </div>

        {/* Hamburger toggle (visible on mobile) */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <div
          className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}
        >
          <Link
            to="/menu"
            className={`${styles.navLink} ${isActive("/menu") ? styles.activeLink : ""}`}
            onClick={closeMenu}
          >
            Menu
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/orders"
                className={`${styles.navLink} ${isActive("/orders") ? styles.activeLink : ""}`}
                onClick={closeMenu}
              >
                <Package size={15} />
                Orders
              </Link>
              <Link
                to="/cart"
                className={`${styles.navLink} ${styles.cartLink} ${isActive("/cart") ? styles.activeLink : ""}`}
                onClick={closeMenu}
              >
                <ShoppingCart size={16} />
                Cart
                {cartItems.length > 0 && (
                  <span className={styles.cartBadge}>{cartItems.length}</span>
                )}
              </Link>
            </>
          )}
          {isAuthenticated ? (
            <div className={styles.userDropdown} ref={dropdownRef}>
              <button
                className={`${styles.dropdownToggle} ${dropdownOpen ? styles.dropdownToggleOpen : ""}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User menu"
                aria-expanded={dropdownOpen}
              >
                <span className={styles.dropdownAvatar}>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <ChevronDown size={14} className={styles.dropdownArrow} />
              </button>

              {dropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <Link
                    to="/orders"
                    className={styles.dropdownItem}
                    onClick={() => {
                      closeMenu();
                      setDropdownOpen(false);
                    }}
                  >
                    <Package size={15} />
                    Orders
                  </Link>
                  <Link
                    to="/profile"
                    className={styles.dropdownItem}
                    onClick={() => {
                      closeMenu();
                      setDropdownOpen(false);
                    }}
                  >
                    <User size={15} />
                    Profile
                  </Link>
                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`${styles.navLink} ${isActive("/login") ? styles.activeLink : ""}`}
              onClick={closeMenu}
            >
              Login
            </Link>
          )}
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
