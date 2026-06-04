"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function FadeIn({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} style={style}>
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: "▶",
    title: "Видео-реклама",
    desc: "UGC, рекламные ролики, сторис, рилс. ИИ-генерация + монтаж.",
    accent: "#F5C518",
  },
  {
    icon: "◉",
    title: "Фото и графика",
    desc: "Продуктовые фото, баннеры, визуальный контент для соцсетей.",
    accent: "#E07B3C",
  },
  {
    icon: "⬡",
    title: "Презентации",
    desc: "Питч-деки, корпоративные и продающие презентации.",
    accent: "#F4ECD8",
  },
  {
    icon: "◈",
    title: "Карточки товаров",
    desc: "Маркетплейсы: Kaspi, Wildberries, Ozon. Инфографика и Rich-контент.",
    accent: "#F5C518",
  },
];

export default function B2BPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", brief: "" });

  function set(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(244,236,216,0.04)",
    border: "1px solid rgba(244,236,216,0.12)",
    borderRadius: 8,
    padding: "13px 16px",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: 15,
    color: "#F4ECD8",
    outline: "none",
    resize: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: 12,
    fontWeight: 500,
    color: "rgba(244,236,216,0.45)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 8,
  };

  return (
    <main style={{ background: "#0F0E0C", minHeight: "100vh", color: "#F4ECD8" }}>
      {/* Back */}
      <div style={{ padding: "24px 32px" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 13,
            color: "rgba(244,236,216,0.4)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Главная
        </Link>
      </div>

      {/* Hero */}
      <section style={{ padding: "60px 24px 80px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: "#F5C518",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            marginBottom: 20,
          }}
        >
          Для бизнеса
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(40px, 7vw, 80px)",
            fontWeight: 900,
            color: "#F4ECD8",
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          Контент, который
          <br />
          <span style={{ color: "#F5C518", fontStyle: "italic" }}>продаёт</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "clamp(15px, 2vw, 18px)",
            fontWeight: 300,
            color: "rgba(244,236,216,0.6)",
            maxWidth: 540,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Создаём визуальный контент для брендов с помощью ИИ.
          Быстро, качественно, по доступной цене.
        </motion.p>
      </section>

      {/* Services */}
      <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              style={{
                background: "rgba(244,236,216,0.03)",
                border: "1px solid rgba(244,236,216,0.08)",
                borderRadius: 14,
                padding: "32px 28px",
              }}
            >
              <div
                style={{
                  fontSize: 28,
                  color: s.accent,
                  marginBottom: 20,
                  lineHeight: 1,
                }}
              >
                {s.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#F4ECD8",
                  marginBottom: 10,
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 14,
                  color: "rgba(244,236,216,0.55)",
                  lineHeight: 1.65,
                }}
              >
                {s.desc}
              </p>
            </motion.div>
          ))}
        </FadeIn>
      </section>

      {/* Contact form */}
      <section
        style={{
          padding: "80px 24px 120px",
          maxWidth: 600,
          margin: "0 auto",
          borderTop: "1px solid rgba(244,236,216,0.07)",
        }}
      >
        <FadeIn>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "#F4ECD8",
              marginBottom: 12,
            }}
          >
            Обсудить проект
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 15,
              color: "rgba(244,236,216,0.45)",
              marginBottom: 44,
            }}
          >
            Оставьте заявку, мы свяжемся в течение 2 часов.
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(245,197,24,0.08)",
                border: "1px solid rgba(245,197,24,0.3)",
                borderRadius: 12,
                padding: "44px 36px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#F5C518",
                  marginBottom: 8,
                }}
              >
                Заявка отправлена!
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 15,
                  color: "rgba(244,236,216,0.6)",
                }}
              >
                Скоро с вами свяжется наш менеджер.
              </p>
            </motion.div>
          ) : (
            <motion.form variants={fadeUp} onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle}>Имя</label>
                  <input required type="text" placeholder="Асель" value={form.name} onChange={set("name")} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Компания</label>
                  <input type="text" placeholder="ТОО «Ваш Бренд»" value={form.company} onChange={set("company")} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Телефон / WhatsApp</label>
                <input required type="tel" placeholder="+7 700 000 00 00" value={form.phone} onChange={set("phone")} style={inputStyle} />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Кратко о проекте</label>
                <textarea
                  rows={4}
                  placeholder="Что нужно сделать? Сроки, объём, пожелания..."
                  value={form.brief}
                  onChange={set("brief")}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "#F5C518",
                  color: "#0F0E0C",
                  border: "none",
                  borderRadius: 8,
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Отправить заявку
              </button>
            </motion.form>
          )}
        </FadeIn>
      </section>

      <footer style={{ borderTop: "1px solid rgba(244,236,216,0.07)", padding: "32px 24px", textAlign: "center" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 18,
            fontWeight: 700,
            color: "#F4ECD8",
            letterSpacing: "0.06em",
          }}
        >
          YELUMIO
        </Link>
      </footer>
    </main>
  );
}
