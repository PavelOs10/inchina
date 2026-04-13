import { useState } from "react";
import { logout } from "../api";
import Dashboard from "./Dashboard";
import LeadsPage from "./LeadsPage";
import ContactsPage from "./ContactsPage";

const RED = "#E53935";
const W = "#ffffff";

type Page = "dashboard" | "leads" | "contacts";

export default function AdminLayout({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<Page>("dashboard");

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const nav = [
    { id: "dashboard" as Page, label: "Дашборд", icon: "📊" },
    { id: "leads" as Page, label: "Заявки", icon: "📋" },
    { id: "contacts" as Page, label: "Контакты", icon: "📇" },
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", display: "flex", minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", backgroundColor: "#111", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ color: RED, fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.04em" }}>In</span>
            <span style={{ color: W, fontSize: "1.2rem", fontWeight: 900, letterSpacing: "0.04em" }}>China</span>
          </a>
          <span style={{ display: "block", fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginTop: "0.3rem" }}>Admin</span>
        </div>

        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "0.7rem",
                padding: "0.7rem 1.5rem", border: "none", cursor: "pointer",
                backgroundColor: page === item.id ? "rgba(255,255,255,0.05)" : "transparent",
                borderLeft: page === item.id ? `2px solid ${RED}` : "2px solid transparent",
                color: page === item.id ? W : "rgba(255,255,255,0.4)",
                fontSize: "0.8rem", fontWeight: page === item.id ? 600 : 400,
                fontFamily: "'Inter', sans-serif", textAlign: "left",
                transition: "all 0.15s ease",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%", padding: "0.6rem", backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)",
              fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
            }}
          >
            Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "2rem 2.5rem", overflowY: "auto" }}>
        {page === "dashboard" && <Dashboard />}
        {page === "leads" && <LeadsPage />}
        {page === "contacts" && <ContactsPage />}
      </main>
    </div>
  );
}
