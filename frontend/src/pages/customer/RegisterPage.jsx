import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerApi } from "../../api/authApi";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import { showToast } from "../../utils/toast";
import styles from "./AuthForm.module.css";

function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerApi(formData);

      if (data.success) {
        showToast.success("Welcome!", "You've been registered successfully.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
      }
    } catch (err) {
      console.log(err);
      showToast.error(
        "Auth failed",
        err.response?.data?.message || "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <form className={styles.form} onSubmit={handleRegister}>
          <Input
            name="name"
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            name="phone"
            label="Phone"
            type="tel"
            placeholder="+1 234 567 890"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
          />
          <Button
            variant="primary"
            size="lg"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className={styles.spinner} size={18} />
                Registering…
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <div className={styles.links}>
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
