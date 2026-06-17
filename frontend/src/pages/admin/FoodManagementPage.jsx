import { useState, useRef } from 'react';
import FoodItemManager from '../../components/admin/FoodItemManager/FoodItemManager';
import Modal from '../../components/common/Modal/Modal';
import Input from '../../components/common/Input/Input';
import Button from '../../components/common/Button/Button';
import styles from './DashboardPage.module.css';

const MOCK_FOODS = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 12.99, isPopular: true, image: 'https://images.pexels.com/photos/29605927/pexels-photo-29605927.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Fresh mozzarella, basil, tomato sauce', available: true },
  { id: 2, name: 'Pepperoni Pizza', category: 'Pizza', price: 14.99, isPopular: false, image: 'https://images.pexels.com/photos/29605927/pexels-photo-29605927.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Classic pepperoni with melted cheese', available: true },
  { id: 3, name: 'Chocolate Cake', category: 'Cake', price: 8.99, isPopular: true, image: 'https://images.pexels.com/photos/19940993/pexels-photo-19940993.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Rich dark chocolate ganache', available: true },
  { id: 4, name: 'Classic Burger', category: 'Burger', price: 11.99, isPopular: true, image: 'https://images.pexels.com/photos/19247582/pexels-photo-19247582.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Beef patty, lettuce, tomato, special sauce', available: true },
  { id: 5, name: 'French Fries', category: 'Sides', price: 4.99, isPopular: false, image: '', description: 'Crispy golden fries with sea salt', available: true },
];

function FoodManagementPage() {
  const [items, setItems] = useState(MOCK_FOODS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Pizza');
  const [formPrice, setFormPrice] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formAvailable, setFormAvailable] = useState(true);
  const [formImage, setFormImage] = useState(null);
  const [formImagePreview, setFormImagePreview] = useState(null);

  const fileInputRef = useRef(null);

  const openAddModal = () => {
    setEditingId(null);
    setFormName('');
    setFormCategory('Pizza');
    setFormPrice('');
    setFormDescription('');
    setFormAvailable(true);
    setFormImage(null);
    setFormImagePreview(null);
    setModalOpen(true);
  };

  const openEditModal = (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setEditingId(id);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(String(item.price));
    setFormDescription(item.description || '');
    setFormAvailable(item.available !== false);
    setFormImage(null);
    setFormImagePreview(item.image || null);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormImage(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    setFormImage(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = () => {
    setFormImage(null);
    setFormImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = () => {
    const newItem = {
      id: editingId || Date.now(),
      name: formName,
      category: formCategory,
      price: parseFloat(formPrice) || 0,
      description: formDescription,
      available: formAvailable,
      isPopular: false,
      image: formImagePreview || '',
    };

    if (editingId) {
      setItems((prev) => prev.map((i) => (i.id === editingId ? newItem : i)));
    } else {
      setItems((prev) => [...prev, newItem]);
    }

    setModalOpen(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Menu Items</h1>
        <p>Manage your food catalog</p>
      </div>

      <FoodItemManager
        items={items}
        onEdit={openEditModal}
        onDelete={handleDelete}
        onAdd={openAddModal}
      />

      {/* Add/Edit modal with full form */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Item' : 'Add Item'}>
        <div className={styles.modalFields}>
          {/* Image upload */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Image</label>
            {formImagePreview ? (
              <div className={styles.imagePreviewWrap}>
                <img src={formImagePreview} alt="Preview" className={styles.imagePreview} />
                <button type="button" className={styles.replaceImageBtn} onClick={() => fileInputRef.current?.click()}>
                  Replace image
                </button>
              </div>
            ) : (
              <div
                className={styles.uploadBox}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className={styles.uploadIcon}>📷</span>
                <span className={styles.uploadText}>Drop an image here or click to browse</span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageSelect}
            />
            {formImagePreview && (
              <button type="button" className={styles.clearImageBtn} onClick={handleRemoveImage}>
                Remove image
              </button>
            )}
          </div>

          <Input
            label="Item Name"
            placeholder="e.g. BBQ Chicken Pizza"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          {/* Category dropdown */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="item-category">Category</label>
            <select
              id="item-category"
              className={styles.selectInput}
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
            >
              <option value="Pizza">Pizza</option>
              <option value="Cake">Cake</option>
              <option value="Burger">Burger</option>
              <option value="Pasta">Pasta</option>
              <option value="Salad">Salad</option>
              <option value="Sides">Sides</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formPrice}
            onChange={(e) => setFormPrice(e.target.value)}
            className={styles.monoInput}
          />

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="item-description">Description</label>
            <textarea
              id="item-description"
              className={styles.textareaInput}
              placeholder="Brief description of the item"
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>

          {/* Availability toggle */}
          <div className={styles.toggleRow}>
            <span className={styles.formLabel}>Availability</span>
            <button
              type="button"
              className={`${styles.toggleSwitch} ${formAvailable ? styles.toggleOn : ''}`}
              onClick={() => setFormAvailable(!formAvailable)}
              role="switch"
              aria-checked={formAvailable}
            >
              <span className={styles.toggleKnob} />
              <span className={styles.toggleLabel}>
                {formAvailable ? 'Available' : 'Unavailable'}
              </span>
            </button>
          </div>

          <div className={styles.modalActions}>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSave}>
              {editingId ? 'Save Changes' : 'Save item'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FoodManagementPage;
