import { useState } from 'react';
import MenuGrid from '../../components/customer/MenuGrid/MenuGrid';
import styles from './MenuPage.module.css';

const MOCK_ITEMS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, description: 'Fresh mozzarella, basil, tomato sauce', isPopular: true, image: 'https://images.pexels.com/photos/29605927/pexels-photo-29605927.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, description: 'Classic pepperoni with melted cheese', isPopular: false, image: 'https://images.pexels.com/photos/29605927/pexels-photo-29605927.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, name: 'Chocolate Cake', category: 'Cake', price: 8.99, description: 'Rich dark chocolate ganache', isPopular: true, image: 'https://images.pexels.com/photos/19940993/pexels-photo-19940993.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 4, name: 'Cheesecake', category: 'Cake', price: 7.99, description: 'Creamy New York style', isPopular: false, image: 'https://images.pexels.com/photos/19940993/pexels-photo-19940993.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 5, name: 'Classic Burger', category: 'Burger', price: 11.99, description: 'Beef patty, lettuce, tomato, special sauce', isPopular: true, image: 'https://images.pexels.com/photos/19247582/pexels-photo-19247582.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 6, name: 'Chicken Burger', category: 'Burger', price: 10.99, description: 'Grilled chicken breast, avocado', isPopular: false, image: 'https://images.pexels.com/photos/19247582/pexels-photo-19247582.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 7, name: 'Spaghetti Carbonara', category: 'Pasta', price: 13.99, description: 'Creamy egg sauce, pancetta, parmesan', isPopular: false, image: '' },
  { id: 8, name: 'Caesar Salad', category: 'Salad', price: 9.99, description: 'Romaine, croutons, parmesan, Caesar dressing', isPopular: false, image: '' },
  { id: 9, name: 'French Fries', category: 'Sides', price: 4.99, description: 'Crispy golden fries with sea salt', isPopular: false, image: '' },
  { id: 10, name: 'Chocolate Milkshake', category: 'Drinks', price: 5.99, description: 'Thick and creamy chocolate shake', isPopular: true, image: '' },
  { id: 11, name: 'Lemonade', category: 'Drinks', price: 3.99, description: 'Fresh squeezed lemons, hint of mint', isPopular: false, image: '' },
  { id: 12, name: 'Grilled Chicken Wrap', category: 'Burger', price: 10.99, description: 'Tortilla wrap with grilled chicken and veggies', isPopular: false, image: '' },
];

const CATEGORIES = ['Pizza', 'Cake', 'Burger', 'Pasta', 'Salad', 'Sides', 'Drinks'];

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleAddToOrder = (itemId) => {
    // UI shell — no backend logic
    console.log('Added to order:', itemId);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Our Menu</h1>
        <p>Freshly prepared, made to order</p>
      </div>
      <MenuGrid
        items={MOCK_ITEMS}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onAddToOrder={handleAddToOrder}
      />
    </div>
  );
}

export default MenuPage;
