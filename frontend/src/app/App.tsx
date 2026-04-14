import { useState, useEffect } from "react";
import { submitLead, getContacts, isLoggedIn } from "./api";
import LoginPage from "./admin/LoginPage";
import AdminLayout from "./admin/AdminLayout";
import heroDetailBanner from "figma:asset/60d1858d595d85b4eed929e2aac6234a2168b0e8.png";
// Batch 1
import sweaterTeal from "figma:asset/b17b33d34d2b90eb4c47f62c1c1f9fb4164b5993.png";
import sweaterStripes from "figma:asset/3ab551148f208bf0b3cadaebab25a9b1ebe83a20.png";
import sweaterBeige from "figma:asset/917148aa5c0d63b2168563a80474940ca13d8f3a.png";
import sweaterAbstract from "figma:asset/a9c2dae86e689536c046093a8c1b801f3d9d0d27.png";
import sweaterNavy from "figma:asset/8204c8b21fe1aae3160bb694e02b5b7a30d3e171.png";
import sweaterGradient from "figma:asset/526d451484287528103e5ac55d165fce982c7532.png";
import sweaterBlack from "figma:asset/f93090791d1b434feb71d448d692da44dc4cce7d.png";
import sweaterFairisle from "figma:asset/3275c1028778402fe4fddad37a7d49810edf93f5.png";
// Batch 2
import sweaterBrown from "figma:asset/4e5669648b8ee909d97ce3b52ea8a95dfffcb145.png";
import cardiganBlack from "figma:asset/39bb98be91320217f6438d74d8578c87a7868d09.png";
import poloBlue from "figma:asset/ee74c427e214d8b32f109bb987721f7320d4138b.png";
import sweaterOat from "figma:asset/a98cd359ba4b93b5d074e41cc3f1d66cb002787c.png";
import zipColorblock from "figma:asset/816134e96145d13abb7c9c4cce4ed145cd1caf7a.png";
import henleyBlue from "figma:asset/a1c28991da7da9fb850da8e10eb9a0152d3fa6a4.png";
import sweaterForest from "figma:asset/c2fdae6008f67f51c39513b327c489372d50379d.png";
import henleyWhite from "figma:asset/c7b88b4b2f0de7fec36ae62c0e0c769626ca71cf.png";
import zipStripe from "figma:asset/bcae9089e2675de654ed954cac991dad5d4470a0.png";
// Batch 3
import zipBlackBeige from "figma:asset/60b3fe94e2745ad94058f5c98ed73723e5ad20af.png";
import henleyGrey from "figma:asset/e0e5b55da081d06b5fcee8d83c68d88697bd98c5.png";
import sweaterPatchwork from "figma:asset/ecf4652f8780fc96f53c571ac33fbf2a5ca4d73c.png";
import sweaterNavyBack from "figma:asset/4445d6774cc264ff8599508cd1a3a9cb2f727f9e.png";
import zipSage from "figma:asset/f43a6d58b6cf59c34b4ca6b303291eeb536a8b8b.png";
import sweaterOlive from "figma:asset/e20b674331e7c250fb52407fbcf1553a1960cb2a.png";
import zipRaglan from "figma:asset/66d58cf31e744f760ac491c3a2dd3be4a52d2b2d.png";
import turtleneckBurgundy from "figma:asset/152bead3de6814fb65a5bdb5c36443a2a71bf91e.png";
import poloNavy from "figma:asset/adeba113d3942f174191f97af163ef0b1df6ac0a.png";
import zipBordeaux from "figma:asset/dc85db082a49f3a6d3a067743f4276e5b365a653.png";
// Batch 4
import turtleneckGrey from "figma:asset/dbac730436d983070e7d3e4cdc80f09acbcf657d.png";
import crewneckBeige from "figma:asset/6465e50ddb69931209599e6176e24c6554ee3d4f.png";
import standCollarKhaki from "figma:asset/6fb68c08d1423008e244a6220ffbeddc382f9bfb.png";
import cableKnitGrey from "figma:asset/1cc5ade8a298af60c4a8ea5ecb577c76ca48d39b.png";
import henleyBlackModel from "figma:asset/7dd62d004855ab6abbc19ae195787c8b45f3f820.png";
import poloSweatGrey from "figma:asset/5543b8214fe423ff9cf5e98942e219275e488a1f.png";
import quarterZipBeige from "figma:asset/2861c59c58d6bbd5b8c96b3bd9c7370f0b85d272.png";
import turtleneckBlue from "figma:asset/dcc82e9306e12f606df1f7e2210b23a61e9677de.png";
import quarterZipNavy from "figma:asset/a19de28353647b35dd0aa93eb3863307c429249d.png";
import stripeZipRetro from "figma:asset/e4cb8769ac44620d83f499dd44f0d1a6dfcc3076.png";
// Batch 5
import cableNavyCrew from "figma:asset/9e71fe6576448faa5242188ae379b780ae8f9eda.png";
import mockGreySolid from "figma:asset/3d66c8072ada27543ed05421c6479ac4dc338bff.png";
import navyMarlDetail from "figma:asset/1a0776ff2539dc125836f3238026f2ae8c4f8e37.png";
import cableCamelCrew from "figma:asset/df3c083454916ce94531d11222bf40dfb4065a20.png";

import top3Ivory from "../imports/111-1.PNG";
import top3Cobalt from "../imports/3-1.PNG";
import top3BlackMen from "../imports/13-1.jpg";

const RED = "#E53935";
const W = "#ffffff";

/* ─── NAV ───────────────────────────────────────────────────────── */
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = [
    { label: "О нас", href: "#value" },
    { label: "Коллекция", href: "#category" },
    { label: "Каталог", href: "#catalog" },
    { label: "Контакт", href: "#cta" },
  ];
  return (
    <nav
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-black/5" />
      <a href="#cover" className="relative z-10 flex items-baseline select-none" style={{ textDecoration: "none" }}>
        <span style={{ color: RED, fontSize: "1.35rem", fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1 }}>In</span>
        <span style={{ color: "#0a0a0a", fontSize: "1.35rem", fontWeight: 900, letterSpacing: "0.04em", lineHeight: 1 }}>China</span>
      </a>
      <ul className="relative z-10 hidden md:flex items-center gap-8">
        {sections.map((s) => (
          <li key={s.href}>
            <a href={s.href} style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none" }} className="hover:opacity-50 transition-opacity">{s.label}</a>
          </li>
        ))}
        <li>
          <a href="#cta" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", backgroundColor: RED, padding: "0.5rem 1.2rem", textDecoration: "none" }} className="transition-opacity hover:opacity-80">Получить прайс</a>
        </li>
      </ul>
      <button className="relative z-10 md:hidden flex flex-col gap-1.5 p-1" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
        <span className="block w-6 h-px bg-black transition-all" style={{ transform: menuOpen ? "rotate(45deg) translateY(4px)" : "" }} />
        <span className="block w-6 h-px bg-black transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
        <span className="block w-6 h-px bg-black transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "" }} />
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 z-40 bg-white border-b border-black/10 flex flex-col py-6 px-8 gap-5 md:hidden">
          {sections.map((s) => (
            <a key={s.href} href={s.href} onClick={() => setMenuOpen(false)} style={{ fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "#0a0a0a", textDecoration: "none" }}>{s.label}</a>
          ))}
          <a href="#cta" onClick={() => setMenuOpen(false)} style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#fff", backgroundColor: RED, padding: "0.6rem 1.4rem", textDecoration: "none", display: "inline-block", alignSelf: "flex-start" }}>Получить прайс</a>
        </div>
      )}
    </nav>
  );
}

/* ─── 1. COVER ──────────────────────────────────────────────────── */
function CoverSection() {
  return (
    <section
      id="cover"
      style={{ fontFamily: "'Inter', sans-serif" }}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#111]"
    >
      {/* ── Full-bleed photo — no crop, fills entire viewport ── */}
      <img
        src={heroDetailBanner}
        alt="Navy marl knitwear"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />

      {/* ── Localised dark zone — bottom-left only, where text lives ── */}
      {/* Radial gradient emanating from bottom-left corner */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at 0% 100%, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.18) 60%, transparent 80%)",
        }}
      />

      {/* Thin bottom strip — ground the scroll hint */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "12%",
          background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
        }}
      />

      {/* Top edge — nav contrast */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "14%",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 100%)",
        }}
      />

      {/* ── Floating spec label — top right, whisper quiet ── */}
      <div
        className="absolute top-24 right-10 z-10 hidden md:flex flex-col items-end gap-1.5"
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: "1px",
            height: "2rem",
            backgroundColor: "rgba(255,255,255,0.15)",
            marginBottom: "0.4rem",
            alignSelf: "center",
          }}
        />
        <span
          style={{
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Navy Marl
        </span>
        <span
          style={{
            fontSize: "0.55rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.14)",
          }}
        >
          KW-039
        </span>
      </div>

      {/* ── Text — bottom left ── */}
      <div className="relative z-10 flex flex-col justify-end h-screen max-w-7xl mx-auto w-full px-8 md:px-16 pb-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div style={{ width: "1.5rem", height: "1px", backgroundColor: RED }} />
          <span
            style={{
              fontSize: "0.60rem",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            Knitwear Collection — 2026
          </span>
        </div>

        {/* Brand name */}
        <div style={{ lineHeight: 1 }}>
          <span
            style={{
              display: "block",
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: RED,
              lineHeight: 0.92,
            }}
          >
            In
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              lineHeight: 0.92,
            }}
          >
            China
          </span>
        </div>

        {/* Red rule */}
        <div style={{ width: "3rem", height: "2px", backgroundColor: RED, margin: "2.2rem 0 1.8rem" }} />

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
            fontWeight: 300,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.72)",
            maxWidth: "330px",
            lineHeight: 1.8,
          }}
        >
          Прямой доступ к китайским фабрикам
        </p>

        {/* Scroll indicator */}
        <div className="mt-14 flex items-center gap-3">
          <div style={{ width: "2rem", height: "1px", backgroundColor: "rgba(255,255,255,0.3)" }} />
          <span
            style={{
              fontSize: "0.56rem",
              fontWeight: 500,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.28)",
            }}
          >
            Прокрутите вниз
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. VALUE PROPOSITION ──────────────────────────────────────── */
function ValueSection() {
  const values = [
    {
      num: "01",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
      title: "Производство полного цикла",
      desc: "От выбора пряжи до готового изделия — весь производственный процесс под одной крышей.",
    },
    {
      num: "02",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
      title: "Работа «под ключ»",
      desc: "Производство, маркировка, упаковка и доставка — полное решение без лишних хлопот для вашего бренда.",
    },
    {
      num: "03",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2"/></svg>,
      title: "Современное вязальное оборудование",
      desc: "Компьютеризированные вязальные машины обеспечивают стабильное качество при любых объёмах.",
    },
    {
      num: "04",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      title: "Премиальная пряжа",
      desc: "Прямые поставки с ведущих пряжных фабрик. Сырьё премиум-класса по заводским ценам.",
    },
    {
      num: "05",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
      title: "Любые материалы",
      desc: "Мериносовая шерсть, мохер, кашемир, хлопок, смесовые составы — подберём любое волокно.",
    },
    {
      num: "06",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
      title: "Изделия любой сложности",
      desc: "От базовых моделей до сложных кос, жаккарда и авторских узоров — без ограничений.",
    },
  ];
  return (
    <section id="value" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f5f5f5" }} className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: RED, marginBottom: "1rem" }}>B2B Партнёрство</p>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", lineHeight: 1.1, marginBottom: "1.2rem" }}>
            Почему клиенты<br />работают с нами
          </h2>
          <p style={{ fontSize: "0.9rem", fontWeight: 400, color: "#888", lineHeight: 1.75 }}>
            Мы создали инфраструктуру, которая открывает продавцам маркетплейсов и брендам прямой доступ к заводскому производству трикотажа.
          </p>
        </div>

        {/* 6-card grid — same border-top editorial style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {values.map((v, i) => (
            <div
              key={v.num}
              style={{
                borderTop: `2px solid ${i === 0 ? RED : "#ddd"}`,
                paddingTop: "2rem",
                paddingRight: "2.5rem",
                paddingBottom: "2.5rem",
              }}
            >
              {/* Icon container */}
              <div style={{ width: "40px", height: "40px", backgroundColor: "rgba(229,57,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.4rem" }}>
                {v.icon}
              </div>
              <span style={{ display: "block", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", color: RED, marginBottom: "0.75rem" }}>{v.num}</span>
              <h3 style={{ fontSize: "1.02rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#0a0a0a", marginBottom: "0.7rem", lineHeight: 1.3 }}>{v.title}</h3>
              <p style={{ fontSize: "0.8rem", fontWeight: 400, color: "#666", lineHeight: 1.75 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TOP-3 HITS ─────────────────────────────────────────────────── */
function Top3Section() {
  const items = [
    {
      num: "01",
      img: top3Ivory,
      gender: "Женский",
      name: "Ivory Rib Essential",
      art: "W-001",
      material: "50% хлопок / 50% акрил",
      moq: "от 300 шт",
      note: "Базовый рибовый джемпер приталенного кроя. Подходит под любой образ — от офиса до уикенда.",
      tall: true,
    },
    {
      num: "02",
      img: top3Cobalt,
      gender: "Женский",
      name: "Cobalt V-Neck",
      art: "W-002",
      material: "70% вискоза / 30% нейлон",
      moq: "от 300 шт",
      note: "Оверсайз-силуэт с контрастными белыми манжетами и воротником. Цвет сезона — электрик.",
      tall: false,
    },
    {
      num: "03",
      img: top3BlackMen,
      gender: "Мужской",
      name: "Black Crewneck",
      art: "M-001",
      material: "100% акрил премиум",
      moq: "от 300 шт",
      note: "Классический облегающий крой, идеальный стек трикотажа. Универсальный бестселлер для маркетплейсов.",
      tall: false,
    },
  ];

  return (
    <section
      id="top3"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: W }}
      className="py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: RED, marginBottom: "1rem" }}>
              Хиты сезона
            </p>
            {/* Large oversized number label */}
            <div className="relative">
              <span
                style={{
                  position: "absolute",
                  top: "-0.3rem",
                  left: "-0.1rem",
                  fontSize: "clamp(5rem, 14vw, 11rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#f0f0f0",
                  lineHeight: 0.85,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                ТОП
              </span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#0a0a0a",
                  lineHeight: 1.05,
                  position: "relative",
                  zIndex: 1,
                  paddingTop: "clamp(3rem, 6vw, 5rem)",
                }}
              >
                Три изделия,<br />
                <span style={{ color: RED }}>которые продаются</span>
              </h2>
            </div>
          </div>
          <p
            style={{
              fontSize: "0.88rem",
              fontWeight: 400,
              color: "#888",
              maxWidth: "320px",
              lineHeight: 1.8,
              flexShrink: 0,
            }}
          >
            Самые востребованные артикулы среди B2B-клиентов. Стабильный спрос на маркетплейсах, высокая маржа, минимальный процент возвратов.
          </p>
        </div>

        {/* ── Asymmetric product grid ── */}
        <div className="grid grid-cols-12 gap-5 md:gap-6 items-start">

          {/* Card 01 — Ivory (large, left) */}
          <div className="col-span-12 md:col-span-5 group">
            <div
              style={{ position: "relative", overflow: "hidden", backgroundColor: "#f7f7f7", aspectRatio: "3/4" }}
            >
              <img
                src={top3Ivory}
                alt="Ivory Rib Essential"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform 0.7s ease" }}
                className="group-hover:scale-105"
              />
              {/* Number overlay */}
              <span
                style={{
                  position: "absolute",
                  top: "1.2rem",
                  left: "1.2rem",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  backgroundColor: W,
                  color: "#0a0a0a",
                  padding: "0.3rem 0.65rem",
                }}
              >
                01
              </span>
              {/* Gender tag */}
              <span
                style={{
                  position: "absolute",
                  bottom: "1.2rem",
                  right: "1.2rem",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  backgroundColor: "#0a0a0a",
                  color: W,
                  padding: "0.3rem 0.7rem",
                }}
              >
                Женский
              </span>
            </div>
            <div style={{ paddingTop: "1.4rem" }}>
              <div style={{ height: "2px", backgroundColor: RED, width: "2rem", marginBottom: "1rem" }} />
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: "0.4rem" }}>Ivory Rib Essential</h3>
              <p style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.9rem" }}>Арт. W-001</p>
              <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.72, marginBottom: "1rem" }}>
                Базовый рибовый джемпер приталенного кроя. Подходит под любой образ — от офиса до уикенда.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span style={{ fontSize: "0.7rem", fontWeight: 500, color: "#999" }}>50% хлопок / 50% акрил</span>
                <span style={{ width: "1px", height: "12px", backgroundColor: "#ddd" }} />
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: RED }}>MOQ {items[0].moq}</span>
              </div>
            </div>
          </div>

          {/* Right column — stacked cards 02 + 03 */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-6">

            {/* Card 02 — Cobalt (wide, top right) */}
            <div className="group">
              <div className="grid grid-cols-2 gap-0">
                <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#f0f2f7", aspectRatio: "4/5" }}>
                  <img
                    src={top3Cobalt}
                    alt="Cobalt V-Neck"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform 0.7s ease" }}
                    className="group-hover:scale-105"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "1.2rem",
                      left: "1.2rem",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      backgroundColor: W,
                      color: "#0a0a0a",
                      padding: "0.3rem 0.65rem",
                    }}
                  >
                    02
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "1.2rem",
                      right: "1.2rem",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      backgroundColor: "#0a0a0a",
                      color: W,
                      padding: "0.3rem 0.7rem",
                    }}
                  >
                    Женский
                  </span>
                </div>
                <div style={{ padding: "2rem", backgroundColor: "#f7f7f7", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{ height: "2px", backgroundColor: "#e0e0e0", width: "1.5rem", marginBottom: "1.2rem" }} />
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: "0.35rem" }}>Cobalt V-Neck</h3>
                  <p style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", marginBottom: "0.8rem" }}>Арт. W-002</p>
                  <p style={{ fontSize: "0.78rem", color: "#666", lineHeight: 1.7, marginBottom: "1rem" }}>
                    Оверсайз-силуэт с контрастными белыми манжетами и воротником. Цвет сезона — электрик.
                  </p>
                  <div className="flex flex-col gap-1">
                    <span style={{ fontSize: "0.68rem", fontWeight: 500, color: "#999" }}>70% вискоза / 30% нейлон</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: RED }}>MOQ от 300 шт</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 03 — Black Men (horizontal landscape) */}
            <div className="group">
              <div className="grid grid-cols-2 gap-0">
                <div style={{ padding: "2rem", backgroundColor: "#0a0a0a", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <div style={{ height: "2px", backgroundColor: RED, width: "1.5rem", marginBottom: "1.2rem" }} />
                  <h3 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: W, marginBottom: "0.35rem" }}>Black Crewneck</h3>
                  <p style={{ fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.8rem" }}>Арт. M-001</p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: "1rem" }}>
                    Классический облегающий крой. Универсальный бестселлер для маркетплейсов.
                  </p>
                  <div className="flex flex-col gap-1">
                    <span style={{ fontSize: "0.68rem", fontWeight: 500, color: "rgba(255,255,255,0.35)" }}>100% акрил премиум</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: RED }}>MOQ от 300 шт</span>
                  </div>
                </div>
                <div style={{ position: "relative", overflow: "hidden", backgroundColor: "#1a1a1a", aspectRatio: "4/5" }}>
                  <img
                    src={top3BlackMen}
                    alt="Black Crewneck"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", transition: "transform 0.7s ease" }}
                    className="group-hover:scale-105"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "1.2rem",
                      right: "1.2rem",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      backgroundColor: RED,
                      color: W,
                      padding: "0.3rem 0.65rem",
                    }}
                  >
                    03
                  </span>
                  <span
                    style={{
                      position: "absolute",
                      bottom: "1.2rem",
                      left: "1.2rem",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      backgroundColor: W,
                      color: "#0a0a0a",
                      padding: "0.3rem 0.7rem",
                    }}
                  >
                    Мужской
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          style={{
            marginTop: "4rem",
            borderTop: "1px solid #ebebeb",
            paddingTop: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "#999", fontWeight: 400 }}>
            Все артикулы доступны для заказа. Производство от&nbsp;<strong style={{ color: "#0a0a0a" }}>300 единиц</strong>&nbsp;на позицию.
          </p>
          <a
            href="#cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              backgroundColor: "#0a0a0a",
              color: W,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.9rem 2rem",
              textDecoration: "none",
            }}
            className="hover:opacity-75 transition-opacity"
          >
            Запросить образцы
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

      </div>
    </section>
  );
}

/* ─── UTP — headline block right after banner ───────────────────── */
function UTPSection() {
  return (
    <section
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: W }}
      className="py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {/* Top rule */}
        <div style={{ height: "2px", backgroundColor: RED, marginBottom: "3rem" }} />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          {/* Big headline */}
          <h2
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: "#0a0a0a",
              lineHeight: 1.06,
              maxWidth: "720px",
            }}
          >
            Производство свитеров в Китае для селлеров маркетплейсов
          </h2>

          {/* Subtext — right-aligned on desktop */}
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 300,
              color: "#666",
              lineHeight: 1.78,
              maxWidth: "360px",
              flexShrink: 0,
            }}
          >
            Разрабатываем образцы и производим партии свитеров на проверенных Китайских фабриках.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT — О нас ─────────────────────────────────────────────── */
function AboutSection() {
  const stats = [
    {
      value: "200 000",
      unit: "шт/мес",
      label: "Производственная мощность",
    },
    {
      value: "Топ 20",
      unit: "",
      label: "Клиенты в топ-20 продавцов маркетплейсов",
    },
    {
      value: "20%",
      unit: "",
      label: "Экономия против рыночных цен",
    },
    {
      value: "от 300",
      unit: "шт",
      label: "Минимальный объём заказа",
    },
  ];

  return (
    <section
      id="about"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f5f5f5" }}
      className="py-24 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-12">
          <div style={{ width: "1.5rem", height: "1px", backgroundColor: RED }} />
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: RED,
            }}
          >
            О нас
          </span>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left — text */}
          <div>
            <h2
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                color: "#0a0a0a",
                lineHeight: 1.15,
                marginBottom: "2.5rem",
              }}
            >
              Производство трикотажа для брендов и продавцов маркетплейсов
            </h2>

            <div className="flex flex-col gap-6">
              <p
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  color: "#444",
                  lineHeight: 1.8,
                }}
              >
                Мы производим трикотаж для брендов и продавцов маркетплейсов. Наши клиенты входят в топ-20 продавцов на маркетплейсах.
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 400,
                  color: "#666",
                  lineHeight: 1.8,
                }}
              >
                Мы объединяем производственные объёмы клиентов и обеспечиваем фабрики заказами более чем на 600&nbsp;000 изделий в год, что позволяет нашим партнёрам получать заводские производственные цены.
              </p>
            </div>

            <a
              href="#cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                marginTop: "2.5rem",
                backgroundColor: "#0a0a0a",
                color: W,
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.9rem 1.8rem",
                textDecoration: "none",
              }}
              className="hover:bg-[#E53935] transition-colors duration-300"
            >
              Получить прайс
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Right — stats grid */}
          <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: "#ddd", alignContent: "start" }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? W : "#f9f9f9",
                  padding: "2rem 1.8rem 2.2rem",
                }}
              >
                {/* Value line */}
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span
                    style={{
                      fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                      fontWeight: 900,
                      letterSpacing: "-0.04em",
                      color: "#0a0a0a",
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </span>
                  {s.unit && (
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: RED,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {s.unit}
                    </span>
                  )}
                </div>

                {/* Red rule under value */}
                <div style={{ width: "2rem", height: "2px", backgroundColor: RED, margin: "0.75rem 0 0.85rem" }} />

                {/* Label */}
                <p
                  style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "#777",
                    lineHeight: 1.55,
                    letterSpacing: "0.01em",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONSOLIDATOR ──────────────────────────────────────────────── */
function ConsolidatorSection() {
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const isOpen = (id: string) => open.includes(id);

  const stats = [
    { value: "600 000", unit: "ед./год", label: "Совокупный объём, который мы размещаем на фабриках ежегодно" },
    { value: "15–30%", unit: "", label: "Экономия на цене по сравнению с размещением аналогичного заказа в одиночку" },
    { value: "2×", unit: "быстрее", label: "Приоритетная постановка в производство — ваш заказ не ждёт в хвосте" },
  ];

  const steps = [
    { n: "1", title: "Принимаем заявку", desc: "Вы присылаете спецификацию: артикул, состав, цвета, объём. Минимальный порог — от 200 единиц на позицию." },
    { n: "2", title: "Консолидируем заказы", desc: "Ваш заказ объединяется с другими клиентами в единый производственный лот. Суммарный объём — сотни тысяч единиц." },
    { n: "3", title: "Получаем приоритет", desc: "Фабрика видит крупного заказчика. Мы согласовываем лучшую цену и приоритет в производственной очереди." },
    { n: "4", title: "Доставляем в срок", desc: "Ваша партия производится вовремя, проходит контроль качества и отправляется напрямую вам." },
  ];

  const benefits = [
    { title: "Приоритет в производственной очереди", desc: "Крупные объёмы = первоочерёдная постановка в план. Ваш заказ не теряется между мелкими партиями и не переносится из-за загруженности фабрики." },
    { title: "Оптовая цена при любом объёме", desc: "Благодаря суммарному объёму 600 000 единиц мы получаем прайс крупного оптовика — и передаём эту цену вам, даже если ваш заказ всего 500 штук." },
    { title: "Жёсткий контроль качества", desc: "Стабильный крупный заказчик требует стабильного качества. Фабрики не могут позволить себе ошибки с нами — а значит, и с вашим заказом." },
    { title: "Доступ к ресурсам без своей команды в Китае", desc: "Вам не нужен свой агент, переводчик и сотрудник по контролю. Мы уже там — с командой, проверенными фабриками и отлаженными процессами." },
    { title: "Масштабируйтесь без риска потерять условия", desc: "Растёте — мы растём вместе. Наши условия не ухудшаются с ростом вашего объёма: чем больше вы заказываете, тем лучше цена и тем выше приоритет. Не нужно ждать, пока вы «дорастёте» до статуса крупного клиента на фабрике — вы уже им пользуетесь через нас." },
  ];

  const AccordionRow = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => {
    const on = isOpen(id);
    return (
      <div style={{ borderTop: "1px solid #e0e0e0" }}>
        <button
          onClick={() => toggle(id)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.6rem 0",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            textAlign: "left",
            gap: "1rem",
          }}
        >
          <span style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em", color: "#0a0a0a" }}>{label}</span>
          {/* ± icon */}
          <div
            style={{
              width: "32px",
              height: "32px",
              border: `1.5px solid ${on ? RED : "#ccc"}`,
              backgroundColor: on ? RED : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.25s ease",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke={on ? W : "#666"} strokeWidth="1.5" strokeLinecap="round"
                style={{ transform: on ? "scaleY(0)" : "scaleY(1)", transformOrigin: "center", transition: "transform 0.25s ease" }}
              />
              <line x1="1" y1="6" x2="11" y2="6" stroke={on ? W : "#666"} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </button>

        {/* Collapsible content */}
        <div
          style={{
            overflow: "hidden",
            maxHeight: on ? "2000px" : "0",
            transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div style={{ paddingBottom: "2.5rem" }}>{children}</div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="consolidator"
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#0a0a0a" }}
      className="py-28 md:py-36"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* ── Always-visible intro ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-8">
              <div style={{ width: "1.5rem", height: "1px", backgroundColor: RED }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: RED }}>
                Мы — консолидаторы
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: W,
                lineHeight: 1.08,
              }}
            >
              600&nbsp;000 единиц в год —<br />
              <span style={{ color: RED }}>ваш негласный<br />рычаг давления</span>
            </h2>
          </div>

          <div className="md:col-span-8 flex flex-col justify-end">
            {/* Thin top rule */}
            <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginBottom: "2rem" }} />
            <p
              style={{
                fontSize: "1.05rem",
                fontWeight: 300,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.85,
                maxWidth: "620px",
              }}
            >
              Каждый наш клиент сам по себе — неб��льшой игрок. Вместе — мы один из крупнейших консолидированных заказчиков трикотажа в регионе. Фабрики это знают и предлагают условия соответственно.
            </p>
          </div>
        </div>

        {/* ── Accordion panels ── */}
        <div style={{ backgroundColor: W, padding: "0 2.5rem 0" }}>

          {/* Panel 1 — Stats */}
          <AccordionRow id="stats" label="Наши показатели">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0" style={{ borderTop: "1px solid #e8e8e8", marginTop: "0.5rem" }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "2rem 2rem 2rem 0",
                    borderRight: i < 2 ? "1px solid #e8e8e8" : "none",
                    paddingLeft: i > 0 ? "2rem" : "0",
                  }}
                >
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#0a0a0a", lineHeight: 1 }}>
                      {s.value}
                    </span>
                    {s.unit && (
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: RED, letterSpacing: "0.02em" }}>
                        {s.unit}
                      </span>
                    )}
                  </div>
                  <div style={{ width: "2rem", height: "2px", backgroundColor: RED, margin: "0.8rem 0 0.9rem" }} />
                  <p style={{ fontSize: "0.8rem", fontWeight: 400, color: "#777", lineHeight: 1.65 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </AccordionRow>

          {/* Panel 2 — Mechanism */}
          <AccordionRow id="mechanism" label="Механизм: как консолидация работает на вас">
            <div>
              <p style={{ fontSize: "0.88rem", fontWeight: 400, color: "#666", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "560px" }}>
                Мы не просто посредник. Мы формируем единый производственный лот из заказов нескольких клиентов — и выходим на фабрику уже с позицией крупного партнёра.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                {steps.map((step, i) => (
                  <div
                    key={step.n}
                    style={{
                      borderTop: `2px solid ${i === 0 ? RED : "#e0e0e0"}`,
                      paddingTop: "1.5rem",
                      paddingRight: "2rem",
                      paddingBottom: "1.5rem",
                    }}
                  >
                    <span style={{ display: "block", fontSize: "2rem", fontWeight: 900, color: "#f0f0f0", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "1rem" }}>{step.n}</span>
                    <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0a0a0a", marginBottom: "0.6rem", lineHeight: 1.3 }}>{step.title}</h4>
                    <p style={{ fontSize: "0.78rem", fontWeight: 400, color: "#777", lineHeight: 1.7 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AccordionRow>

          {/* Panel 3 — Benefits */}
          <AccordionRow id="benefits" label="Преимущества, которые недоступны в одиночку">
            <div className="flex flex-col gap-0">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "2rem",
                    alignItems: "flex-start",
                    borderTop: "1px solid #ebebeb",
                    padding: "1.4rem 0",
                  }}
                >
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", color: RED, flexShrink: 0, paddingTop: "0.15rem" }}>
                    0{i + 1}
                  </span>
                  <div>
                    <h4 style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0a0a0a", marginBottom: "0.4rem", lineHeight: 1.3 }}>{b.title}</h4>
                    <p style={{ fontSize: "0.8rem", fontWeight: 400, color: "#777", lineHeight: 1.75 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AccordionRow>

          {/* bottom border */}
          <div style={{ borderTop: "1px solid #e0e0e0" }} />
        </div>
      </div>
    </section>
  );
}

/* ─── 3. CATEGORY PAGE ─────────────────────────────────────────── */
function CategorySection() {
  return (
    <section id="category" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: W }} className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="relative mb-0">
          <h2 style={{ fontSize: "clamp(4rem, 13vw, 10rem)", fontWeight: 900, letterSpacing: "-0.04em", color: "#f0f0f0", lineHeight: 0.9, userSelect: "none" }}>KNITWEAR</h2>
          <p style={{ position: "absolute", bottom: "1.5rem", left: "0.3rem", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: RED }}>Коллекция 2026</p>
        </div>
        <div className="mt-8 grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 md:col-span-7 relative">
            <div style={{ aspectRatio: "4/5", overflow: "hidden", backgroundColor: W }}>
              <img src={sweaterAbstract} alt="Abstract sweater" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "0.3rem" }}>Abstract Intarsia</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0a0a0a" }}>Contrast Pattern</p>
              </div>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", color: RED, borderBottom: `1px solid ${RED}`, paddingBottom: "2px", cursor: "pointer" }}>MOQ 50</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4 md:gap-6">
            <div style={{ aspectRatio: "3/4", overflow: "hidden", backgroundColor: W }}>
              <img src={sweaterGradient} alt="Gradient sweater" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div style={{ aspectRatio: "3/2", overflow: "hidden", backgroundColor: W, position: "relative" }}>
              <img src={sweaterNavy} alt="Navy sweater" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>Stripe Series</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. CATALOG — animated grid ────────────────────────────────── */
function CatalogSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  const products = [
    { img: sweaterBeige,       name: "Essential",     code: "KW-001" },
    { img: sweaterBlack,       name: "Minimal",       code: "KW-002" },
    { img: sweaterTeal,        name: "Core",          code: "KW-003" },
    { img: sweaterStripes,     name: "Statement",     code: "KW-004" },
    { img: sweaterFairisle,    name: "Heritage",      code: "KW-005" },
    { img: sweaterGradient,    name: "Gradient",      code: "KW-006" },
    { img: sweaterBrown,       name: "Russet",        code: "KW-007" },
    { img: cardiganBlack,      name: "Cardigan",      code: "KW-008" },
    { img: poloBlue,           name: "Polo Knit",     code: "KW-009" },
    { img: sweaterOat,         name: "Oatmeal",       code: "KW-010" },
    { img: zipColorblock,      name: "Colorblock",    code: "KW-011" },
    { img: henleyBlue,         name: "Henley Blue",   code: "KW-012" },
    { img: sweaterForest,      name: "Forest",        code: "KW-013" },
    { img: henleyWhite,        name: "Blanc",         code: "KW-014" },
    { img: zipStripe,          name: "Sport Zip",     code: "KW-015" },
    { img: zipBlackBeige,      name: "Black Beige",   code: "KW-016" },
    { img: henleyGrey,         name: "Grey Henley",   code: "KW-017" },
    { img: sweaterPatchwork,   name: "Patchwork",     code: "KW-018" },
    { img: sweaterNavyBack,    name: "Navy Stripe",   code: "KW-019" },
    { img: zipSage,            name: "Sage Zip",      code: "KW-020" },
    { img: sweaterOlive,       name: "Olive",         code: "KW-021" },
    { img: zipRaglan,          name: "Raglan Zip",    code: "KW-022" },
    { img: turtleneckBurgundy, name: "Burgundy",      code: "KW-023" },
    { img: poloNavy,           name: "Navy Polo",     code: "KW-024" },
    { img: zipBordeaux,        name: "Bordeaux",      code: "KW-025" },
    { img: turtleneckGrey,     name: "Grey Roll",     code: "KW-026" },
    { img: crewneckBeige,      name: "Cream Crew",    code: "KW-027" },
    { img: standCollarKhaki,   name: "Stand Collar",  code: "KW-028" },
    { img: cableKnitGrey,      name: "Cable Knit",    code: "KW-029" },
    { img: henleyBlackModel,   name: "Henley Black",  code: "KW-030" },
    { img: poloSweatGrey,      name: "Polo Sweat",    code: "KW-031" },
    { img: quarterZipBeige,    name: "Quarter Zip",   code: "KW-032" },
    { img: turtleneckBlue,     name: "Blue Roll",     code: "KW-033" },
    { img: quarterZipNavy,     name: "Navy Zip",      code: "KW-034" },
    { img: stripeZipRetro,     name: "Retro Stripe",  code: "KW-035" },
    { img: cableNavyCrew,      name: "Navy Cable",    code: "KW-036" },
    { img: mockGreySolid,      name: "Grey Mock",     code: "KW-038" },
    { img: navyMarlDetail,     name: "Navy Marl",     code: "KW-039" },
    { img: cableCamelCrew,     name: "Camel Cable",   code: "KW-040" },
  ];

  return (
    <section id="catalog" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f0f0f0" }} className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-8 md:px-16">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: RED, marginBottom: "0.8rem" }}>
              Полный каталог
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#0a0a0a", lineHeight: 1.05 }}>
              CATALOG
            </h2>
          </div>
          <div className="flex flex-col md:items-end gap-1">
            <p style={{ fontSize: "0.75rem", fontWeight: 400, color: "#999", letterSpacing: "0.04em" }}>
              Все позиции от 50 ед. · Custom branding доступно
            </p>
            <p style={{ fontSize: "0.68rem", fontWeight: 700, color: RED, letterSpacing: "0.1em" }}>
              {products.length} позиций в коллекции
            </p>
          </div>
        </div>

        {/* ─ Grid ─ */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "1px", backgroundColor: "rgba(0,0,0,0.07)" }}
        >
          {products.map((p) => {
            const on = hovered === p.code;
            return (
              <div
                key={p.code}
                style={{ backgroundColor: W, cursor: "pointer" }}
                onMouseEnter={() => setHovered(p.code)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* ── Image wrapper — overflow:hidden clips the scaling image
                       so the white background NEVER moves ── */}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "3/4",
                    overflow: "hidden",
                    backgroundColor: W,
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                      // Only the image moves; the container (background) is fixed
                      transform: on ? "scale(1.13)" : "scale(1.0)",
                      transition: "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      transformOrigin: "center 35%",
                      willChange: "transform",
                    }}
                  />

                  {/* Subtle shadow vignette on hover */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(0,0,0,0.12) 100%)",
                      opacity: on ? 1 : 0,
                      transition: "opacity 0.5s ease",
                      pointerEvents: "none",
                    }}
                  />

                  {/* MOQ badge — slides in from top */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      right: "0.85rem",
                      backgroundColor: RED,
                      color: W,
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "0.28rem 0.6rem",
                      opacity: on ? 1 : 0,
                      transform: on ? "translateY(0px)" : "translateY(-8px)",
                      transition: "opacity 0.3s ease, transform 0.35s ease",
                    }}
                  >
                    MOQ 50
                  </div>
                </div>

                {/* ── Caption ── */}
                <div
                  style={{
                    padding: "0.85rem 1.1rem 1rem",
                    backgroundColor: W,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: on ? `2px solid ${RED}` : "2px solid transparent",
                    transition: "border-color 0.3s ease",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8c8c8", marginBottom: "0.15rem" }}>
                      {p.code}
                    </p>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: on ? RED : "#0a0a0a", transition: "color 0.3s ease" }}>
                      {p.name}
                    </p>
                  </div>
                  {/* Arrow */}
                  <div
                    style={{
                      width: "26px",
                      height: "26px",
                      border: `1.5px solid ${on ? RED : "#e0e0e0"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      backgroundColor: on ? RED : "transparent",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 5h8M5 1l4 4-4 4" stroke={on ? W : "#ccc"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }} />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-black/10">
          <p style={{ fontSize: "0.8rem", fontWeight: 400, color: "#888", lineHeight: 1.6 }}>
            Не нашли нужную модель? Производим под ваши требования — состав, цвет, конструкция.
          </p>
          <a
            href="#cta"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", backgroundColor: "#0a0a0a", color: W, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.85rem 1.8rem", textDecoration: "none", flexShrink: 0 }}
            className="hover:bg-[#E53935] transition-colors duration-300"
          >
            Запросить прайс
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. FEATURE PRODUCT ────────────────────────────────────────── */
function FeatureSection() {
  return (
    <section id="feature" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#0a0a0a" }} className="overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-screen md:min-h-0">
        <div style={{ minHeight: "60vh", overflow: "hidden", position: "relative", backgroundColor: W }}>
          <img src={sweaterTeal} alt="Feature product" className="w-full h-full object-cover" style={{ minHeight: "60vh" }} />
        </div>
        <div className="flex flex-col justify-center px-10 md:px-16 py-20">
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: RED, marginBottom: "2rem" }}>Featured — KW-003</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", color: W, lineHeight: 1.1, marginBottom: "2.5rem" }}>Mock-Neck<br />Essential</h2>
          <div className="flex flex-col gap-6 mb-10">
            {[
              { label: "Материал", val: "100% Merino Wool / Mixed" },
              { label: "Производство", val: "Factory Direct, Jiangsu" },
              { label: "MOQ", val: "От 50 единиц" },
              { label: "Custom Branding", val: "Доступно" },
            ].map((row) => (
              <div key={row.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "1rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.3rem" }}>{row.label}</p>
                <p style={{ fontSize: "0.9rem", fontWeight: 500, color: W, letterSpacing: "0.01em" }}>{row.val}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {["Premium Knitwear", "Factory Production", "Custom Branding Available"].map((tag) => (
                <span key={tag} style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", padding: "0.35rem 0.75rem" }}>{tag}</span>
              ))}
            </div>
            <a href="#cta" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem", backgroundColor: RED, color: W, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "1rem 2rem", textDecoration: "none", alignSelf: "flex-start" }} className="hover:opacity-80 transition-opacity">
              Запросить образцы
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 6. LOOKBOOK ───────────────────────────────────────────────── */
function LookbookSection() {
  return (
    <section id="lookbook" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: W }} className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: RED, marginBottom: "0.8rem" }}>Lookbook 2025</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0a0a0a", lineHeight: 1.1 }}>Editorial</h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 relative overflow-hidden" style={{ height: "60vh" }}>
            <img src="https://images.unsplash.com/photo-1604772202330-4758ca10445f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBrbml0d2VhciUyMGxpZmVzdHlsZSUyMGxvb2tib29rJTIwZGFyayUyMG1vb2R5fGVufDF8fHx8MTc3NTY0NzA3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Lookbook hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "0.4rem" }}>AW 2025</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: W, letterSpacing: "-0.01em" }}>The Essentials</p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 overflow-hidden" style={{ aspectRatio: "3/4", backgroundColor: W }}>
            <img src={sweaterStripes} alt="Lookbook 1" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-12 md:col-span-4 overflow-hidden" style={{ aspectRatio: "3/4", backgroundColor: W }}>
            <img src={quarterZipNavy} alt="Lookbook 2" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-12 md:col-span-4 overflow-hidden relative" style={{ aspectRatio: "3/4", backgroundColor: W }}>
            <img src={stripeZipRetro} alt="Lookbook 3" className="w-full h-full object-cover" />
            <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", backgroundColor: RED, color: W, fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.3rem 0.6rem" }}>New</div>
          </div>
          <div className="col-span-12 relative overflow-hidden" style={{ height: "45vh", backgroundColor: "#0a0a0a" }}>
            <img src="https://images.unsplash.com/photo-1760551733340-a70825258486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHJlZXQlMjBzdHlsZSUyMHdpbnRlciUyMGNvYXQlMjB1cmJhbnxlbnwxfHx8fDE3NzU2NDcwODR8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Lifestyle" className="w-full h-full object-cover opacity-50" style={{ filter: "grayscale(20%)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ fontSize: "clamp(2rem, 6vw, 5rem)", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>MADE IN CHINA</p>
            </div>
            <div className="absolute bottom-8 right-8">
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Quality at Scale</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 7. CTA ────────────────────────────────────────────────────── */
function CTASection() {
  const [form, setForm] = useState({ name: "", company: "", email: "", qty: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState<Record<string, string>>({
    email: "contact@in-china.shop",
    phone: "+7 (999) 000-00-00",
    response_time: "В течение 24 часов",
  });

  useEffect(() => {
    getContacts().then(setContacts).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await submitLead(form);
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Ошибка отправки");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="cta" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#0a0a0a" }} className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="flex flex-col justify-between">
            <div>
              <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: RED, marginBottom: "2rem" }}>B2B Запрос</p>
              <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, letterSpacing: "-0.03em", color: W, lineHeight: 1.05, marginBottom: "1.5rem" }}>Получить условия<br />и прайс</h2>
              <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "360px" }}>Заполните форму — мы пришлём прайс-лист, каталог образцов и условия сотрудничества в течение 24 часов.</p>
            </div>
            <div className="mt-16 flex flex-col gap-6">
              {[{ l: "Email", v: contacts.email || "contact@in-china.shop" }, { l: "WhatsApp / Telegram", v: contacts.phone || contacts.whatsapp || "+7 (999) 000-00-00" }, { l: "Время ответа", v: contacts.response_time || "В течение 24 часов" }].map((row) => (
                <div key={row.l} style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem" }}>{row.l}</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 500, color: W }}>{row.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            {sent ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[400px] gap-4">
                <div style={{ width: "48px", height: "48px", backgroundColor: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10l5 5 9-9" stroke={W} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: W, letterSpacing: "-0.02em" }}>Запрос отправлен</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>Мы свяжемся с вами в течение 24 часов с прайс-листом и условиями сотрудничества.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                {[
                  { id: "name", label: "Ваше имя", type: "text", placeholder: "Имя Фамилия" },
                  { id: "company", label: "Компания", type: "text", placeholder: "Название компании" },
                  { id: "email", label: "Email", type: "email", placeholder: "email@company.com" },
                  { id: "qty", label: "Объём (ед. в месяц)", type: "text", placeholder: "Например: 500" },
                ].map((field) => (
                  <div key={field.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1.2rem 0" }}>
                    <label htmlFor={field.id} style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>{field.label}</label>
                    <input id={field.id} type={field.type} placeholder={field.placeholder} value={form[field.id as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.id]: e.target.value })} required style={{ width: "100%", backgroundColor: "transparent", border: "none", outline: "none", fontSize: "0.95rem", fontWeight: 400, color: W, fontFamily: "'Inter', sans-serif" }} className="placeholder:text-white/20" />
                  </div>
                ))}
                <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1.2rem 0" }}>
                  <label htmlFor="message" style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem" }}>Комментарий (опционально)</label>
                  <textarea id="message" rows={3} placeholder="Опишите ваш запрос..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ width: "100%", backgroundColor: "transparent", border: "none", outline: "none", fontSize: "0.95rem", fontWeight: 400, color: W, resize: "none", fontFamily: "'Inter', sans-serif" }} className="placeholder:text-white/20" />
                </div>
                {error && <p style={{ color: RED, fontSize: "0.8rem", marginTop: "0.5rem" }}>{error}</p>}
                <button type="submit" disabled={sending} style={{ marginTop: "2rem", backgroundColor: RED, color: W, border: "none", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "1.1rem 2.5rem", cursor: sending ? "wait" : "pointer", alignSelf: "flex-start", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: "0.75rem", opacity: sending ? 0.7 : 1 }} className="hover:opacity-80 transition-opacity">
                  {sending ? "Отправка..." : "Отправить запрос"}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke={W} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ───────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.05)" }} className="py-10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-baseline">
          <span style={{ color: RED, fontSize: "1rem", fontWeight: 900, letterSpacing: "0.04em" }}>In</span>
          <span style={{ color: W, fontSize: "1rem", fontWeight: 900, letterSpacing: "0.04em" }}>China</span>
        </div>
        <p style={{ fontSize: "0.68rem", fontWeight: 400, color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>© 2025 InChina Trade — Прямой доступ к китайским фабрикам</p>
        <div className="flex gap-6">
          {["Telegram", "WhatsApp", "WeChat"].map((c) => (
            <a key={c} href="#cta" style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", textDecoration: "none" }} className="hover:text-white/60 transition-colors">{c}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── SITE (main landing) ─────────────────────────────────────── */
function Site() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <NavBar />
      <CoverSection />
      <UTPSection />
      <ValueSection />
      <Top3Section />
      <AboutSection />
      <CategorySection />
      <ConsolidatorSection />
      <CatalogSection />
      <CTASection />
      <Footer />
    </div>
  );
}

/* ─── ROOT with routing ──────────────────────────────────────── */
export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  if (path.startsWith("/admin")) {
    if (!loggedIn) {
      return <LoginPage onLogin={() => { setLoggedIn(true); window.history.pushState({}, "", "/admin"); setPath("/admin"); }} />;
    }
    return <AdminLayout onLogout={() => { setLoggedIn(false); setPath("/admin"); }} />;
  }

  return <Site />;
}