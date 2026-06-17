import Button from '../../common/Button/Button';
import Badge from '../../common/Badge/Badge';
import styles from './FoodItemManager.module.css';

function FoodItemManager({ items, onEdit, onDelete, onAdd }) {
  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h2 className={styles.title}>Food Items</h2>
        <Button variant="primary" size="sm" onClick={onAdd}>
          + Add Item
        </Button>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            {/* Image */}
            <div className={styles.imageWrap}>
              {item.image ? (
                <img src={item.image} alt={item.name} className={styles.image} />
              ) : (
                <div className={styles.imagePlaceholder}>
                  <span>🍽</span>
                </div>
              )}
            </div>

            <div className={styles.body}>
              <div className={styles.categoryRow}>
                <span className={styles.category}>{item.category}</span>
                {item.isPopular && <Badge variant="warning" size="sm">Popular</Badge>}
                {item.available === false && <Badge variant="default" size="sm">Unavailable</Badge>}
              </div>
              <h4 className={styles.name}>{item.name}</h4>
              {item.description && <p className={styles.description}>{item.description}</p>}
              <span className={styles.price}>${item.price.toFixed(2)}</span>

              <div className={styles.actions}>
                <Button variant="outline" size="sm" onClick={() => onEdit(item.id)}>
                  Edit
                </Button>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(item.id)}
                  aria-label={`Delete ${item.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className={styles.empty}>No food items yet. Add one to get started.</p>
      )}
    </div>
  );
}

export default FoodItemManager;
