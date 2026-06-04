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

const tariffs = [
  {
    name: "Базовый",
    price: "49 990 ₸",
    highlight: false,
    accent: "rgba(244,236,216,0.1)",
    accentBorder: "rgba(244,236,216,0.12)",
    features: ["Доступ ко всем урокам", "30 дней обратной связи", "Telegram-группа", "Сертификат"],
  },
  {
    name: "Стандарт",
    price: "89 990 ₸",
    highlight: true,
    accent: "rgba(245,197,24,0.12)",
    accentBorder: "#F5C518",
    features: ["Всё из Базового", "3 мес. обратной связи", "Разбор ваших проектов", "Доступ к новым урокам", "Сертификат"],
    badge: "Популярный",
  },
  {
    name: "Премиум",
    price: "149 990 ₸",
    highlight: false,
    accent: "rgba(224,123,60,0.1)",
    accentBorder: "rgba(224,123,60,0.4)",
    features: ["Всё из Стандарта", "6 мес. поддержки", "Личные сессии с куратором", "Приоритетный разбор ДЗ", "Помощь с портфолио"],
  },
];

export default function CoursePage() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState("Стандарт");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
          Yelumio School
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(42px, 7vw, 84px)",
            fontWeight: 900,
            color: "#F4ECD8",
            lineHeight: 1.05,
            marginBottom: 28,
          }}
        >
          Курс «Мастер ИИ»
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
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Освойте нейросети для создания видео, фото, текста и рекламы.
          Практические задания, живая обратная связь, сертификат.
        </motion.p>
      </section>

      {/* Tariffs */}
      <section style={{ padding: "0 24px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {tariffs.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              onClick={() => setSelected(t.name)}
              style={{
                background: t.accent,
                border: `1px solid ${t.accentBorder}`,
                borderRadius: 16,
                padding: "36px 28px",
                cursor: "pointer",
                position: "relative",
                transition: "box-shadow 0.25s",
                boxShadow: selected === t.name ? `0 0 0 2px ${t.highlight ? "#F5C518" : "rgba(244,236,216,0.3)"}` : "none",
              }}
            >
              {t.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#F5C518",
                    color: "#0F0E0C",
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 14px",
                    borderRadius: 20,
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.badge}
                </span>
              )}

              <h3
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#F4ECD8",
                  marginBottom: 8,
                }}
              >
                {t.name}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                  fontSize: 32,
                  fontWeight: 900,
                  color: t.highlight ? "#F5C518" : "#F4ECD8",
                  marginBottom: 28,
                }}
              >
                {t.price}
              </p>

              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {t.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: 14,
                      color: "rgba(244,236,216,0.7)",
                      padding: "7px 0",
                      borderBottom: "1px solid rgba(244,236,216,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l3.5 3.5L12 3" stroke={t.highlight ? "#F5C518" : "#E07B3C"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </FadeIn>
      </section>

      {/* Form */}
      <section
        style={{
          padding: "80px 24px 120px",
          maxWidth: 560,
          margin: "0 auto",
          borderTop: "1px solid rgba(244,236,216,0.07)",
        }}
      >
        <FadeIn>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#F4ECD8",
              marginBottom: 12,
            }}
          >
            Оставить заявку
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 15,
              color: "rgba(244,236,216,0.5)",
              marginBottom: 40,
            }}
          >
            Выбранный тариф: <span style={{ color: "#F5C518" }}>{selected}</span>
          </motion.p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(245,197,24,0.08)",
                border: "1px solid rgba(245,197,24,0.3)",
                borderRadius: 12,
                padding: "40px 32px",
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
                Заявка принята!
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 15,
                  color: "rgba(244,236,216,0.6)",
                }}
              >
                Мы свяжемся с вами в ближайшее время.
              </p>
            </motion.div>
          ) : (
            <motion.form variants={fadeUp} onSubmit={handleSubmit}>
              {[
                { label: "Ваше имя", value: name, set: setName, type: "text", placeholder: "Иван Иванов" },
                { label: "Телефон / WhatsApp", value: phone, set: setPhone, type: "tel", placeholder: "+7 700 000 00 00" },
              ].map((field) => (
                <div key={field.label} style={{ marginBottom: 20 }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "rgba(244,236,216,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    style={{
                      width: "100%",
                      background: "rgba(244,236,216,0.04)",
                      border: "1px solid rgba(244,236,216,0.12)",
                      borderRadius: 8,
                      padding: "13px 16px",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: 15,
                      color: "#F4ECD8",
                      outline: "none",
                    }}
                  />
                </div>
              ))}

              <button
                type="submit"
                style={{
                  width: "100%",
                  marginTop: 8,
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
