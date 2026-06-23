import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildPagination } from "../../../hooks/usePagaination";
import styles from "./Pagination.module.css";

function Pagination({ currentPage, totalPages, total, onPageChange }) {
  const items = buildPagination(currentPage, totalPages, 1);

  if (items.length === 0) return null;

  return (
    <nav className={styles.pagination} aria-label="Menu pagination">
      <button
        className={`${styles.btn} ${styles.prevNext}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {items.map((item) =>
        item.type === "dots" ? (
          <span key={item.id} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={item.value}
            className={`${styles.btn} ${styles.pageNum} ${
              item.value === currentPage ? styles.active : ""
            }`}
            onClick={() => onPageChange(item.value)}
            aria-current={item.value === currentPage ? "page" : undefined}
          >
            {item.value}
          </button>
        ),
      )}

      <button
        className={`${styles.btn} ${styles.prevNext}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>

      {total !== undefined && (
        <span className={styles.total}>{total} items</span>
      )}
    </nav>
  );
}

export default Pagination;
