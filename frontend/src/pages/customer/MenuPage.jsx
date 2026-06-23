import { useCallback, useEffect, useState } from "react";
import { getProdcutsApi } from "../../api/productApi";
import Loader from "../../components/common/Loader/Loader";
import Pagination from "../../components/common/Pagination/Pagination";
import MenuGrid from "../../components/customer/MenuGrid/MenuGrid";
import { showToast } from "../../utils/toast";
import styles from "./MenuPage.module.css";

const CATEGORIES = ["Pizza", "Burger", "Cake", "Drinks", "Pasta"];
const ITEMS_PER_PAGE = 4;

const mapProducts = (res) =>
  (res.data?.products || []).map((p) => ({
    id: p._id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    image: p.imageUrl,
    isPopular: p.isPopular || false,
    isAvailable: p.isAvailable,
  }));

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const handleAddToOrder = (itemId) => {
    console.log("Added to order:", itemId);
  };

  const loadProducts = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProdcutsApi({
        page: pageNum,
        limit: ITEMS_PER_PAGE,
      });
      setProducts(mapProducts(res));
      setPagination(res.data?.pagination || null);
    } catch (err) {
      if (err?.response?.status === 404) {
        setProducts([]);
        setPagination(null);
      } else {
        showToast.err(
          err?.response?.data?.message ||
            "Failed to load menu. Please try again later.",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(page);
  }, [page, loadProducts]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Our Menu</h1>
        <p>Freshly prepared, made to order</p>
      </div>

      {loading && (
        <div className={styles.loaderWrap}>
          <Loader message="Fetching menu…" />
        </div>
      )}

      {error && (
        <div className={styles.stateWrap}>
          <p className={styles.error}>{error}</p>
          <button
            className={styles.retryBtn}
            onClick={() => loadProducts(page)}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <MenuGrid
            items={products}
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            onAddToOrder={handleAddToOrder}
          />

          {pagination && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MenuPage;
