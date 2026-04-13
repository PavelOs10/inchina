import { useState } from "react";
import { login } from "../api";

const RED = "#E53935";

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await login(password);
      localStorage.setItem("admin_token", token);
      onLogin();
    } catch (err: any) {
      setError(err.message || "Неверный пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0a" }}>
      <div style={{ width: "100%", maxWidth: "380px", padding: "2.5rem", backgroundColor: "#151515", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span style={{ color: RED, fontSize: "1.5rem", fontWeight: 900, letterSpacing: "0.04em" }}>In</span>
          <span style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 900, letterSpacing: "0.04em" }}>China</span>
          <span style={{ display: "block", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginTop: "0.5rem" }}>Admin Panel</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>
              Пароль
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              required
              style={{
                width: "100%", padding: "0.8rem 1rem", backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.9rem",
                fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <div style={{ fontSize: "0.8rem", color: RED, marginBottom: "1rem" }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "0.9rem", backgroundColor: RED, color: "#fff",
              border: "none", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase" as const, cursor: loading ? "wait" : "pointer",
              fontFamily: "'Inter', sans-serif", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
