import { useState, useEffect, useCallback } from "react";
import { getLeads, updateLead, deleteLead } from "../api";

const RED = "#E53935";
const W = "#ffffff";

interface Lead {
  id: number; name: string; company: string; email: string;
  qty: string; message: string; status: string; notes: string; created_at: string;
}

const statusLabels: Record<string, string> = { new: "Новая", processing: "В работе", done: "Завершена", rejected: "Отклонена" };
const statusColors: Record<string, string> = { new: "#4CAF50", processing: "#FF9800", done: "#2196F3", rejected: "#F44336" };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [editNotes, setEditNotes] = useState("");

  const load = useCallback(async () => {
    try {
      const data = await getLeads({ status: status === "all" ? undefined : status, page, search: search || undefined });
      setLeads(data.leads);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    }
  }, [status, page, search]);

  useEffect(() => { load(); }, [load]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    await updateLead(id, { status: newStatus });
    load();
    if (selected?.id === id) setSelected({ ...selected, status: newStatus });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить заявку?")) return;
    await deleteLead(id);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    await updateLead(selected.id, { notes: editNotes });
    setSelected({ ...selected, notes: editNotes });
    load();
  };

  const openDetail = (lead: Lead) => {
    setSelected(lead);
    setEditNotes(lead.notes);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: W }}>Заявки <span style={{ fontSize: "0.85rem", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>({total})</span></h2>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            type="text" placeholder="Поиск..." value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{
              padding: "0.5rem 0.8rem", backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", color: W, fontSize: "0.8rem",
              fontFamily: "'Inter', sans-serif", outline: "none", minWidth: "180px",
            }}
          />
          <select
            value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            style={{
              padding: "0.5rem 0.8rem", backgroundColor: "#151515",
              border: "1px solid rgba(255,255,255,0.1)", color: W, fontSize: "0.8rem",
              fontFamily: "'Inter', sans-serif", outline: "none",
            }}
          >
            <option value="all">Все</option>
            <option value="new">Новые</option>
            <option value="processing">В работе</option>
            <option value="done">Завершённые</option>
            <option value="rejected">Отклонённые</option>
          </select>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div style={{ backgroundColor: "#151515", border: "1px solid rgba(255,255,255,0.1)", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: W }}>Заявка #{selected.id} — {selected.name}</h3>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.3rem" }}>{selected.created_at}</p>
            </div>
            <button onClick={() => setSelected(null)} style={{ color: "rgba(255,255,255,0.4)", background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
            {[
              { l: "Компания", v: selected.company || "—" },
              { l: "Email", v: selected.email },
              { l: "Объём", v: selected.qty || "—" },
              { l: "Статус", v: statusLabels[selected.status] || selected.status },
            ].map((f) => (
              <div key={f.l}>
                <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.3rem" }}>{f.l}</p>
                <p style={{ fontSize: "0.85rem", color: W }}>{f.v}</p>
              </div>
            ))}
          </div>
          {selected.message && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.3rem" }}>Сообщение</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>{selected.message}</p>
            </div>
          )}
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.3rem" }}>Заметки</p>
            <textarea
              value={editNotes} onChange={(e) => setEditNotes(e.target.value)} rows={3}
              style={{
                width: "100%", padding: "0.6rem", backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", color: W, fontSize: "0.85rem",
                fontFamily: "'Inter', sans-serif", resize: "vertical", outline: "none", boxSizing: "border-box",
              }}
            />
            <button onClick={handleSaveNotes} style={{
              marginTop: "0.5rem", padding: "0.5rem 1rem", backgroundColor: "rgba(255,255,255,0.1)",
              border: "none", color: W, fontSize: "0.7rem", fontWeight: 600, cursor: "pointer",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              Сохранить заметки
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              {["#", "Имя", "Компания", "Email", "Объём", "Статус", "Дата", ""].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "0.8rem 0.6rem", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => openDetail(lead)}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", cursor: "pointer", backgroundColor: selected?.id === lead.id ? "rgba(255,255,255,0.03)" : "transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selected?.id === lead.id ? "rgba(255,255,255,0.03)" : "transparent")}
              >
                <td style={{ padding: "0.7rem 0.6rem", color: "rgba(255,255,255,0.4)" }}>{lead.id}</td>
                <td style={{ padding: "0.7rem 0.6rem", color: W, fontWeight: 600 }}>{lead.name}</td>
                <td style={{ padding: "0.7rem 0.6rem", color: "rgba(255,255,255,0.6)" }}>{lead.company || "—"}</td>
                <td style={{ padding: "0.7rem 0.6rem", color: "rgba(255,255,255,0.6)" }}>{lead.email}</td>
                <td style={{ padding: "0.7rem 0.6rem", color: "rgba(255,255,255,0.5)" }}>{lead.qty || "—"}</td>
                <td style={{ padding: "0.7rem 0.6rem" }}>
                  <select
                    value={lead.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                    style={{
                      padding: "0.25rem 0.4rem", fontSize: "0.7rem", fontWeight: 600,
                      backgroundColor: "transparent", color: statusColors[lead.status] || W,
                      border: `1px solid ${statusColors[lead.status] || "rgba(255,255,255,0.2)"}`,
                      fontFamily: "'Inter', sans-serif", outline: "none", cursor: "pointer",
                    }}
                  >
                    <option value="new" style={{ color: "#000" }}>Новая</option>
                    <option value="processing" style={{ color: "#000" }}>В работе</option>
                    <option value="done" style={{ color: "#000" }}>Завершена</option>
                    <option value="rejected" style={{ color: "#000" }}>Отклонена</option>
                  </select>
                </td>
                <td style={{ padding: "0.7rem 0.6rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>{lead.created_at?.slice(0, 10)}</td>
                <td style={{ padding: "0.7rem 0.6rem" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: "0.9rem" }}
                    title="Удалить"
                  >🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {leads.length === 0 && (
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", padding: "3rem", fontSize: "0.9rem" }}>Заявок не найдено</p>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p} onClick={() => setPage(p)}
              style={{
                padding: "0.4rem 0.8rem", fontSize: "0.75rem", fontWeight: p === page ? 700 : 400,
                backgroundColor: p === page ? RED : "rgba(255,255,255,0.05)",
                color: W, border: "none", cursor: "pointer",
              }}
            >{p}</button>
          ))}
        </div>
      )}
    </div>
  );
}
