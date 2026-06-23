import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authApi";
import Button from "../../components/common/Button/Button";
import Input from "../../components/common/Input/Input";
import { useAuthStore } from "../../store/useAuthStore";
import { showToast } from "../../utils/toast";
import styles from "./AuthForm.module.css";

function LoginPage() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginApi(formData);
      if (data.success) {
        await checkAuth();
        showToast.success("Welcome!", "Glad to see you again.");
        setFormData({
          email: "",
          password: "",
        });
        navigate("/menu");
      }
    } catch (err) {
      console.log(err);
      showToast.error(
        "Login failed",
        err.response?.data?.message || "Invalid credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign In</h1>
        <form className={styles.form} onSubmit={handleLogin}>
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
          />{" "}
          <Button variant="primary" size="lg" fullWidth type="submit">
            {loading ? (
              <>
                <Loader2 className={styles.spinner} size={18} />
                Sign In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
        <div className={styles.links}>
          <p>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
