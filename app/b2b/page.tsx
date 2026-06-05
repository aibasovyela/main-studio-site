"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "all" | "video" | "photo" | "cards" | "food" | "fashion" | "perfume" | "events";

interface PortfolioItem {
  id: number;
  category: Exclude<Category, "all">;
  title: string;
  tag: string;
  color: string;
  span?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FILTERS: { key: Category; label: string }[] = [
  { key: "all", label: "Все работы" },
  { key: "video", label: "Видео-реклама" },
  { key: "photo", label: "Фото и графика" },
  { key: "cards", label: "Карточки товаров" },
  { key: "food", label: "Общепит" },
  { key: "fashion", label: "Одежда" },
  { key: "perfume", label: "Парфюм" },
  { key: "events", label: "События" },
];

const PORTFOLIO: PortfolioItem[] = [
  { id: 1, category: "video", title: "Рекламный ролик для бренда", tag: "Видео-реклама", color: "#1C1A14", span: true },
  { id: 2, category: "fashion", title: "Лукбук коллекции", tag: "Одежда · Фото", color: "#1A1418" },
  { id: 3, category: "food", title: "Видео для кофейни", tag: "Общепит · Видео", color: "#1A1614" },
  { id: 4, category: "cards", title: "Карточки для Kaspi", tag: "Карточки товаров", color: "#141A1A" },
  { id: 5, category: "perfume", title: "Имиджевое видео парфюма", tag: "Парфюм · Видео", color: "#18141A", span: true },
  { id: 6, category: "photo", title: "Продуктовые фото", tag: "Фото", color: "#1A1A16" },
  { id: 7, category: "events", title: "Видео с концерта", tag: "Событие · Видео", color: "#14181A" },
  { id: 8, category: "food", title: "Фото меню для ресторана", tag: "Общепит · Фото", color: "#1A1714" },
  { id: 9, category: "cards", title: "Rich-контент Wildberries", tag: "Карточки · Инфографика", color: "#141A18" },
  { id: 10, category: "fashion", title: "Reels для бренда одежды", tag: "Одежда · Видео", color: "#1A1419" },
  { id: 11, category: "video", title: "UGC-реклама для сервиса", tag: "Видео-реклама", color: "#1A1815" },
  { id: 12, category: "perfume", title: "Фото продукции парфюм", tag: "Парфюм · Фото", color: "#19141A", span: true },
];

const SERVICES = [
  { num: "01", title: "Видео-реклама", desc: "UGC, рекламные ролики, сторис, рилс и shorts. От сценария до финального монтажа.", accent: "#F5C518" },
  { num: "02", title: "Фото и графика", desc: "Продуктовые и имиджевые съёмки, баннеры, визуалы для соцсетей и сайтов.", accent: "#E07B3C" },
  { num: "03", title: "Карточки товаров", desc: "Kaspi, Wildberries, Ozon. Инфографика, Rich-контент, A+ контент.", accent: "#F4ECD8" },
  { num: "04", title: "Презентации", desc: "Питч-деки, корпоративные и продающие презентации под ключ.", accent: "#F5C518" },
];

const STEPS = [
  { num: "1", title: "Бриф", desc: "Рассказываете о задаче — продукт, цель, аудитория, пожелания. 15 минут в звонке или письменно." },
  { num: "2", title: "Производство", desc: "Наша команда создаёт контент: ИИ-генерация, монтаж, дизайн. Держим в курсе на каждом этапе." },
  { num: "3", title: "Готово", desc: "Получаете материалы в нужных форматах. Правки включены. Срок — от 24 часов." },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FadeIn({ children, style, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      transition={{ delayChildren: delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Orb({ color, size, style, x, y, duration }: { color: string; size: number; style?: React.CSSProperties; x: number[]; y: number[]; duration: number }) {
  return (
    <motion.div
      animate={{ x, y }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: "absolute", width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${color} 0%, transparent 70%)`, filter: "blur(80px)", pointerEvents: "none", ...style }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p variants={fadeUp} style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "#F5C518", textTransform: "uppercase", letterSpacing: "0.25em", marginBottom: 16 }}>
      {children}
    </motion.p>
  );
}

// ─── Portfolio card ───────────────────────────────────────────────────────────

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{
        background: item.color,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(244,236,216,0.07)",
        gridColumn: item.span ? "span 2" : "span 1",
        cursor: "pointer",
      }}
    >
      {/* Placeholder visual */}
      <div style={{ position: "relative", paddingBottom: item.span ? "42%" : "70%", background: item.color }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Placeholder pattern */}
          <div style={{ width: "40%", height: "40%", border: "1px solid rgba(244,236,216,0.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1.5px solid rgba(244,236,216,0.15)" }} />
          </div>
        </div>
        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{ position: "absolute", inset: 0, background: "rgba(245,197,24,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <span style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 12, color: "rgba(244,236,216,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Скоро
          </span>
        </motion.div>
      </div>

      <div style={{ padding: "16px 20px 20px" }}>
        <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 11, color: "#F5C518", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, opacity: 0.7 }}>
          {item.tag}
        </p>
        <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "#F4ECD8", lineHeight: 1.3 }}>
          {item.title}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function B2BPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", brief: "" });

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  const filtered = activeFilter === "all" ? PORTFOLIO : PORTFOLIO.filter(i => i.category === activeFilter);

  function setField(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(244,236,216,0.04)",
    border: "1px solid rgba(244,236,216,0.1)",
    borderRadius: 8,
    padding: "13px 16px",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: 15,
    color: "#F4ECD8",
    outline: "none",
    resize: "none" as const,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: 11,
    fontWeight: 500,
    color: "rgba(244,236,216,0.4)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 8,
  };

  return (
    <main style={{ background: "#0F0E0C", minHeight: "100vh", color: "#F4ECD8" }}>

      {/* ── NAV ──────────────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(15,14,12,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(244,236,216,0.06)",
        }}
      >
        <Link href="/" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#F4ECD8", letterSpacing: "0.05em" }}>
          YELUMIO
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <a
            href="#portfolio"
            onClick={e => { e.preventDefault(); document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 13, color: "rgba(244,236,216,0.5)", cursor: "pointer" }}
          >
            Работы
          </a>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: "#0F0E0C",
              background: "#F5C518",
              padding: "8px 20px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Обсудить проект
          </a>
        </div>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{ position: "relative", height: "100svh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}
      >
        <Orb color="rgba(245,197,24,0.18)" size={650} style={{ top: "-10%", left: "-15%" }} x={[0, 50, -20, 0]} y={[0, -40, 30, 0]} duration={20} />
        <Orb color="rgba(224,123,60,0.14)" size={500} style={{ bottom: "0%", right: "-10%" }} x={[0, -40, 25, 0]} y={[0, 35, -25, 0]} duration={25} />
        <Orb color="rgba(245,197,24,0.06)" size={350} style={{ top: "40%", right: "20%" }} x={[0, 20, -35, 0]} y={[0, -20, 15, 0]} duration={30} />

        <motion.div style={{ opacity: heroOpacity, y: heroY, position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 860, paddingTop: 80 }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.28em" }}
            transition={{ duration: 1.4, delay: 0.2 }}
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 11, fontWeight: 500, color: "#F5C518", textTransform: "uppercase", marginBottom: 28 }}
          >
            AI Creative Studio · Yelumio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(52px, 10vw, 130px)", fontWeight: 900, lineHeight: 0.92, color: "#F4ECD8", letterSpacing: "-0.02em", marginBottom: 32 }}
          >
            Контент,
            <br />
            <span style={{ color: "#F5C518", fontStyle: "italic" }}>который продаёт</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85 }}
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 300, color: "rgba(244,236,216,0.58)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.7 }}
          >
            Создаём видео, фото, презентации и карточки товаров для казахстанских и международных брендов.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "13px 28px", background: "#F5C518", color: "#0F0E0C", border: "none", borderRadius: 8, fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              Смотреть работы
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "13px 28px", background: "transparent", color: "#F4ECD8", border: "1px solid rgba(244,236,216,0.2)", borderRadius: 8, fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 15, fontWeight: 400, cursor: "pointer" }}
            >
              Обсудить проект
            </button>
          </motion.div>
        </motion.div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to top, #0F0E0C, transparent)", zIndex: 5 }} />
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(244,236,216,0.07)", borderBottom: "1px solid rgba(244,236,216,0.07)" }}>
        <FadeIn style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 0 }}>
          {[
            { val: "50+", label: "довольных клиентов" },
            { val: "500+", label: "проектов выполнено" },
            { val: "5+", label: "ниш и индустрий" },
            { val: "24ч", label: "средний срок" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              style={{ textAlign: "center", padding: "16px 20px", borderRight: i < 3 ? "1px solid rgba(244,236,216,0.07)" : "none" }}
            >
              <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(36px, 4vw, 48px)", fontWeight: 900, color: "#F5C518", lineHeight: 1, marginBottom: 8 }}>{s.val}</div>
              <div style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 13, color: "rgba(244,236,216,0.4)" }}>{s.label}</div>
            </motion.div>
          ))}
        </FadeIn>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────────── */}
      <section id="portfolio" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn style={{ marginBottom: 48 }}>
          <SectionLabel>Портфолио</SectionLabel>
          <motion.h2 variants={fadeUp} style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, color: "#F4ECD8", lineHeight: 1.15, marginBottom: 40 }}>
            Наши работы
          </motion.h2>

          {/* Filter tabs */}
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  border: `1px solid ${activeFilter === f.key ? "#F5C518" : "rgba(244,236,216,0.12)"}`,
                  background: activeFilter === f.key ? "rgba(245,197,24,0.12)" : "transparent",
                  color: activeFilter === f.key ? "#F5C518" : "rgba(244,236,216,0.5)",
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: activeFilter === f.key ? 500 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </FadeIn>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {filtered.map(item => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px 100px", borderTop: "1px solid rgba(244,236,216,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn style={{ marginBottom: 56 }}>
            <SectionLabel>Услуги</SectionLabel>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "#F4ECD8", lineHeight: 1.15 }}>
              Что мы делаем
            </motion.h2>
          </FadeIn>

          <FadeIn style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {SERVICES.map(s => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                style={{ background: "rgba(244,236,216,0.03)", border: "1px solid rgba(244,236,216,0.08)", borderRadius: 14, padding: "32px 28px", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, left: 28, right: 28, height: 2, background: s.accent, borderRadius: "0 0 4px 4px", opacity: 0.8 }} />
                <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 11, color: s.accent, letterSpacing: "0.2em", marginBottom: 20, opacity: 0.7 }}>{s.num}</p>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#F4ECD8", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 14, color: "rgba(244,236,216,0.55)", lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px 100px", background: "rgba(244,236,216,0.015)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn style={{ marginBottom: 56 }}>
            <SectionLabel>Процесс</SectionLabel>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 700, color: "#F4ECD8", lineHeight: 1.15 }}>
              Как мы работаем
            </motion.h2>
          </FadeIn>

          <FadeIn style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {STEPS.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} style={{ position: "relative" }}>
                {i < STEPS.length - 1 && (
                  <div style={{ position: "absolute", top: 20, left: "calc(100% - 16px)", width: 32, height: 1, background: "rgba(245,197,24,0.2)", display: "none" }} />
                )}
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #F5C518", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#F5C518" }}>{step.num}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#F4ECD8", marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 14, color: "rgba(244,236,216,0.55)", lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "100px 24px 120px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn style={{ marginBottom: 60, textAlign: "center" }}>
            <SectionLabel>Контакты</SectionLabel>
            <motion.h2 variants={fadeUp} style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 700, color: "#F4ECD8", lineHeight: 1.1, marginBottom: 16 }}>
              Обсудим ваш проект?
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 16, color: "rgba(244,236,216,0.5)", maxWidth: 440, margin: "0 auto" }}>
              Выберите удобный способ связи или заполните форму — ответим в течение 1 часа.
            </motion.p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>

            {/* Contact buttons */}
            <FadeIn>
              <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Telegram", sub: "@yelumio_studio", color: "#2AABEE", icon: "✈", href: "https://t.me/yelumio_studio" },
                  { label: "WhatsApp", sub: "+7 700 000 00 00", color: "#25D366", icon: "◎", href: "https://wa.me/77000000000" },
                  { label: "Позвонить", sub: "+7 700 000 00 00", color: "#F5C518", icon: "◌", href: "tel:+77000000000" },
                ].map(c => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "18px 22px",
                      background: "rgba(244,236,216,0.03)",
                      border: "1px solid rgba(244,236,216,0.08)",
                      borderRadius: 12,
                      textDecoration: "none",
                    }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${c.color}22`, border: `1px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: c.color, flexShrink: 0 }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 15, fontWeight: 600, color: "#F4ECD8", marginBottom: 2 }}>{c.label}</div>
                      <div style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 13, color: "rgba(244,236,216,0.4)" }}>{c.sub}</div>
                    </div>
                    <div style={{ marginLeft: "auto", color: "rgba(244,236,216,0.2)", fontSize: 18 }}>→</div>
                  </motion.a>
                ))}
              </motion.div>
            </FadeIn>

            {/* Form */}
            <FadeIn>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ background: "rgba(245,197,24,0.07)", border: "1px solid rgba(245,197,24,0.25)", borderRadius: 14, padding: "48px 36px", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}
                >
                  <div style={{ fontSize: 36 }}>✓</div>
                  <p style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#F5C518" }}>Заявка отправлена!</p>
                  <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 14, color: "rgba(244,236,216,0.5)" }}>Мы свяжемся с вами в течение часа.</p>
                </motion.div>
              ) : (
                <motion.form variants={fadeUp} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={labelStyle}>Имя</label>
                      <input required type="text" placeholder="Асель" value={form.name} onChange={setField("name")} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Компания</label>
                      <input type="text" placeholder="Ваш бренд" value={form.company} onChange={setField("company")} style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Телефон / WhatsApp</label>
                    <input required type="tel" placeholder="+7 700 000 00 00" value={form.phone} onChange={setField("phone")} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Кратко о задаче</label>
                    <textarea rows={3} placeholder="Что нужно сделать? Продукт, цель, сроки..." value={form.brief} onChange={setField("brief")} style={inputStyle} />
                  </div>
                  <button
                    type="submit"
                    style={{ padding: "14px 24px", background: "#F5C518", color: "#0F0E0C", border: "none", borderRadius: 8, fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 4 }}
                  >
                    Отправить заявку →
                  </button>
                </motion.form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(244,236,216,0.07)", padding: "36px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
        <span style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "#F4ECD8", letterSpacing: "0.05em" }}>YELUMIO</span>
        <span style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 12, color: "rgba(244,236,216,0.25)" }}>© 2026 Yelumio AI Creative Studio</span>
        <Link href="/" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: 12, color: "rgba(244,236,216,0.3)" }}>На главную</Link>
      </footer>
    </main>
  );
}
