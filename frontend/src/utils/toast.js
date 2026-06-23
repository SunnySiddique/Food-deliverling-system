import toast from "react-hot-toast";

const toastConfig = {
  duration: 3000,
  style: {
    borderRadius: "10px",
    background: "#1c1c1e",
    color: "#fff",
    fontSize: "14px",
    padding: "12px 16px",
    border: "0.5px solid rgba(255,255,255,0.08)",
  },
};

export const showToast = {
  success: (title, msg) =>
    toast.success(msg ? `${title} — ${msg}` : title, {
      ...toastConfig,
      duration: 3000,
      iconTheme: { primary: "#22c55e", secondary: "#1c1c1e" },
    }),

  error: (title, msg) =>
    toast.error(msg ? `${title} — ${msg}` : title, {
      ...toastConfig,
      duration: 5000,
      iconTheme: { primary: "#ef4444", secondary: "#1c1c1e" },
    }),

  warning: (title, msg) =>
    toast(msg ? `${title} — ${msg}` : title, {
      ...toastConfig,
      duration: 4000,
      icon: "⚠️",
    }),

  info: (title, msg) =>
    toast(msg ? `${title} — ${msg}` : title, {
      ...toastConfig,
      duration: 3500,
      icon: "ℹ️",
    }),
};
