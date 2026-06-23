import Badge from "../../common/Badge/Badge";
import Button from "../../common/Button/Button";
import styles from "./FoodCard.module.css";

function FoodCard({ item, onAddToCart }) {
  const { id, name, description, price, category, image, isPopular } = item;

  return (
    <article className={styles.card}>
      {/* Image placeholder */}
      <div className={styles.imageWrap}>
        {image ? (
          <img src={image} alt={name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderIcon}>🍽</span>
          </div>
        )}
        {isPopular && (
          <span className={styles.popularTag}>
            <Badge variant="warning" size="sm">
              Popular
            </Badge>
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.name}>{name}</h3>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.footer}>
          <span className={styles.price}>${price.toFixed(2)}</span>
          <Button size="sm" variant="primary" onClick={() => onAddToCart(item)}>
            + Add
          </Button>
        </div>
      </div>
    </article>
  );
}

export default FoodCard;
