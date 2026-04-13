import { useState, useEffect } from "react";
import { getAdminContacts, updateContact, deleteContact } from "../api";

const RED = "#E53935";
const W = "#ffffff";

interface Contact {
  id: number; key: string; value: string; updated_at: string;
}

const knownLabels: Record<string, string> = {
  email: "Email", phone: "Телефон", telegram: "Telegram", whatsapp: "WhatsApp",
  wechat: "WeChat", response_time: "Время ответа", address: "Адрес",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const load = async () => {
    try {
      const data = await getAdminContacts();
      setContacts(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (key: string) => {
    await updateContact(key, editValue);
    setEditing(null);
    load();
  };

  const handleDelete = async (key: string) => {
    if (!confirm(`Удалить "${key}"?`)) return;
    await deleteContact(key);
    load();
  };

  const handleAdd = async () => {
    if (!newKey.trim() || !newValue.trim()) return;
    await updateContact(newKey.trim(), newValue.trim());
    setNewKey("");
    setNewValue("");
    load();
  };

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: W, marginBottom: "0.5rem" }}>Контакты</h2>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>
        Контактная информация, отображаемая на сайте
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {contacts.map((c) => (
          <div key={c.key} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ minWidth: "140px" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                {knownLabels[c.key] || c.key}
              </p>
              <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", marginTop: "0.15rem" }}>{c.key}</p>
            </div>

            {editing === c.key ? (
              <div style={{ flex: 1, display: "flex", gap: "0.5rem" }}>
                <input
                  value={editValue} onChange={(e) => setEditValue(e.target.value)}
                  style={{
                    flex: 1, padding: "0.5rem 0.7rem", backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)", color: W, fontSize: "0.85rem",
                    fontFamily: "'Inter', sans-serif", outline: "none",
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSave(c.key)}
                  autoFocus
                />
                <button onClick={() => handleSave(c.key)} style={{ padding: "0.5rem 0.8rem", backgroundColor: RED, color: W, border: "none", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer" }}>✓</button>
                <button onClick={() => setEditing(null)} style={{ padding: "0.5rem 0.8rem", backgroundColor: "rgba(255,255,255,0.1)", color: W, border: "none", fontSize: "0.7rem", cursor: "pointer" }}>✕</button>
              </div>
            ) : (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <p style={{ fontSize: "0.9rem", color: W }}>{c.value}</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => { setEditing(c.key); setEditValue(c.value); }}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: "0.75rem" }}
                  >✏️</button>
                  <button
                    onClick={() => handleDelete(c.key)}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: "0.75rem" }}
                  >🗑</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add new */}
      <div style={{ marginTop: "2rem", padding: "1.5rem", backgroundColor: "#151515", border: "1px solid rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "1rem" }}>Добавить контакт</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <input
            value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="Ключ (напр. instagram)"
            style={{
              flex: "0 0 180px", padding: "0.5rem 0.7rem", backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", color: W, fontSize: "0.8rem",
              fontFamily: "'Inter', sans-serif", outline: "none",
            }}
          />
          <input
            value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Значение"
            style={{
              flex: 1, minWidth: "200px", padding: "0.5rem 0.7rem", backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)", color: W, fontSize: "0.8rem",
              fontFamily: "'Inter', sans-serif", outline: "none",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button onClick={handleAdd} style={{
            padding: "0.5rem 1.2rem", backgroundColor: RED, color: W, border: "none",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: "pointer",
          }}>Добавить</button>
        </div>
      </div>
    </div>
  );
}
