import {
  Calendar,
  Check,
  Mail,
  MapPin,
  Pencil,
  Phone,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { updateCurrentUserApi } from "../../api/userApi";
import { useAuthStore } from "../../store/useAuthStore";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { user, checkAuth } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  if (!user) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>No user data available.</p>
      </div>
    );
  }

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  const startEditing = () => {
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      address: user.address || "",
    });
    setEditing(true);
    setError("");
  };

  const cancelEditing = () => {
    setEditing(false);
    setError("");
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      await updateCurrentUserApi(form);
      await checkAuth();
      setEditing(false);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const details = [
    {
      icon: User,
      label: "Name",
      value: user.name,
      key: "name",
      editable: true,
    },
    { icon: Mail, label: "Email", value: user.email, editable: false },
    {
      icon: Phone,
      label: "Phone",
      value: user.phone || "Not set",
      key: "phone",
      editable: true,
    },
    {
      icon: MapPin,
      label: "Delivery Address",
      value: user.address || "Not set",
      key: "address",
      editable: true,
    },
    {
      icon: Calendar,
      label: "Member Since",
      value: memberSince,
      editable: false,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>My Profile</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.avatar}>
          {user.name?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <p className={styles.greeting}>
          Welcome back, {user.name?.split(" ")[0]}
        </p>

        <div className={styles.divider} />

        <div className={styles.details}>
          {details.map(({ icon: Icon, label, value, key, editable }) => (
            <div key={label} className={styles.row}>
              <div className={styles.rowIcon}>
                <Icon size={18} />
              </div>
              <div className={styles.rowContent}>
                <span className={styles.rowLabel}>{label}</span>
                {editing && editable ? (
                  <input
                    className={styles.editInput}
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <span className={styles.rowValue}>{value}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          {editing ? (
            <>
              <button
                className={styles.btnCancel}
                onClick={cancelEditing}
                disabled={saving}
              >
                <X size={16} />
                Cancel
              </button>
              <button
                className={styles.btnSave}
                onClick={handleSave}
                disabled={saving}
              >
                <Check size={16} />
                {saving ? "Saving…" : "Save"}
              </button>
            </>
          ) : (
            <button className={styles.btnEdit} onClick={startEditing}>
              <Pencil size={16} />
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
