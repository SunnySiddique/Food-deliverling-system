import FoodCard from "../FoodCard/FoodCard";
import styles from "./MenuGrid.module.css";

function MenuGrid({
  items,
  categories,
  activeCategory,
  onCategoryChange,
  onAddToCart,
}) {
  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  return (
    <div className={styles.menuGrid}>
      {/* Category tabs (menu-board style) */}
      <div className={styles.categories}>
        <button
          className={`${styles.categoryTab} ${!activeCategory ? styles.active : ""}`}
          onClick={() => onCategoryChange(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryTab} ${activeCategory === cat ? styles.active : ""}`}
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className={styles.grid}>
        {filteredItems.map((item) => (
          <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className={styles.empty}>No items found in this category.</p>
      )}
    </div>
  );
}

export default MenuGrid;
