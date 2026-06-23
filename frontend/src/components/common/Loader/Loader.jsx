import {
  ChefHat,
  Coffee,
  CookingPot,
  Pizza,
  UtensilsCrossed,
} from "lucide-react";
import { useCallback, useState } from "react";
import styles from "./Loader.module.css";

const FOOD_ICONS = [ChefHat, UtensilsCrossed, Pizza, Coffee, CookingPot];

const ICON_LABELS = [
  "Chef's Special",
  "Utensils",
  "Pizza",
  "Coffee",
  "Cooking Pot",
];

const ACCENT_CYCLE = [
  "--color-accent-red",
  "--color-accent-teal",
  "--color-accent-gold",
  "--color-accent-red",
  "--color-accent-teal",
];

function Loader({
  size = "md",
  fullPage = false,
  message = "Loading…",
  onCycle,
  className = "",
}) {
  const [iconIndex, setIconIndex] = useState(0);
  const Icon = FOOD_ICONS[iconIndex];

  const handleClick = useCallback(() => {
    const nextIndex = (iconIndex + 1) % FOOD_ICONS.length;
    setIconIndex(nextIndex);
    onCycle?.(nextIndex);
  }, [iconIndex, onCycle]);

  const wrapperClasses = [
    styles.wrapper,
    styles[size],
    fullPage ? styles.fullPage : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconSize = size === "sm" ? 20 : size === "lg" ? 36 : 28;

  return (
    <div className={wrapperClasses}>
      <div
        className={styles.inner}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Loading — click to change icon (current: ${ICON_LABELS[iconIndex]})`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Concentric spinning rings */}
        <div className={styles.ring} data-ring="1" />
        <div className={styles.ring} data-ring="2" />
        <div className={styles.ring} data-ring="3" />

        {/* Steam / aroma particles */}
        <div className={styles.steam} data-particle="1" />
        <div className={styles.steam} data-particle="2" />
        <div className={styles.steam} data-particle="3" />
        <div className={styles.steam} data-particle="4" />
        <div className={styles.steam} data-particle="5" />

        {/* Central icon */}
        <div className={styles.iconWrap}>
          <Icon
            size={iconSize}
            className={styles.icon}
            style={{
              color: `var(${ACCENT_CYCLE[iconIndex]})`,
            }}
          />
        </div>

        {/* Hint tooltip on hover — hidden when a custom message is set */}
        {!message && <span className={styles.hint}>Click me</span>}
      </div>

      {message && <p className={styles.message}>{message}</p>}

      <p className={styles.label}>{ICON_LABELS[iconIndex]}</p>
    </div>
  );
}

export default Loader;
