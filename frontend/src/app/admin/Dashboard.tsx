import { useState, useEffect } from "react";
import { getStats } from "../api";

const RED = "#E53935";

interface Stats {
  total: number;
  today: number;
  week: number;
  month: number;
  byStatus: { status: string; c: number }[];
  daily: { date: string; count: number }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getStats().then(setStats).catch(console.error);
  }, []);

  if (!stats) return <div style={{ color: "rgba(255,255,255,0.4)", padding: "2rem" }}>Загрузка...</div>;

  const statusLabels: Record<string, string> = { new: "Новые", processing: "В работе", done: "Завершённые", rejected: "Отклонённые" };
  const statusColors: Record<string, string> = { new: "#4CAF50", processing: "#FF9800", done: "#2196F3", rejected: "#F44336" };

  const maxCount = Math.max(...stats.daily.map(d => d.count), 1);

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", marginBottom: "2rem" }}>Дашборд</h2>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {[
          { label: "Всего заявок", value: stats.total },
          { label: "Сегодня", value: stats.today },
          { label: "За неделю", value: stats.week },
          { label: "За месяц", value: stats.month },
        ].map((s) => (
          <div key={s.label} style={{ backgroundColor: "#151515", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>{s.label}</p>
            <p style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {stats.byStatus.map((s) => (
          <div key={s.status} style={{ backgroundColor: "#151515", border: "1px solid rgba(255,255,255,0.08)", padding: "1.2rem", borderLeft: `3px solid ${statusColors[s.status] || "#666"}` }}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "0.3rem" }}>{statusLabels[s.status] || s.status}</p>
            <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>{s.c}</p>
          </div>
        ))}
      </div>

      {/* Chart - last 30 days */}
      <div style={{ backgroundColor: "#151515", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
        <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1.5rem" }}>Заявки за 30 дней</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "120px" }}>
          {stats.daily.map((d) => (
            <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" }}>
              <div
                style={{
                  width: "100%", maxWidth: "24px",
                  height: `${Math.max((d.count / maxCount) * 100, 4)}%`,
                  backgroundColor: RED, opacity: 0.8, borderRadius: "2px 2px 0 0",
                  minHeight: "2px",
                }}
                title={`${d.date}: ${d.count}`}
              />
            </div>
          ))}
        </div>
        {stats.daily.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", textAlign: "center", padding: "2rem 0" }}>Нет данных</p>
        )}
      </div>
    </div>
  );
}
