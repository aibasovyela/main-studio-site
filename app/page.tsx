"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const COURSE_URL = "https://yelumio-course-site-production.up.railway.app";

// ─── Variants ────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Scroll-animated section wrapper ─────────────────────────────────────────

function FadeSection({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainer}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Gradient orb ─────────────────────────────────────────────────────────────

function Orb({
  color,
  size,
  style,
  x,
  y,
  duration,
}: {
  color: string;
  size: number;
  style?: React.CSSProperties;
  x: number[];
  y: number[];
  duration: number;
}) {
  return (
    <motion.div
      animate={{ x, y }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(70px)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

// ─── CTA card data ────────────────────────────────────────────────────────────

const cards = [
  {
    num: "01",
    title: "Хочу пройти курс",
    sub: "Курс «Мастер ИИ»",
    desc: "Освойте нейросети для видео, фото, текста и бизнеса. Практический курс с личной обратной связью.",
    cta: "Записаться",
    href: "https://yelumio.kz",
    accent: "#F5C518",
    external: true,
  },
  {
    num: "02",
    title: "Я участник курса",
    sub: "Личный кабинет",
    desc: "Уже на курсе? Войдите, чтобы смотреть уроки и сдавать домашние задания.",
    cta: "Войти в кабинет",
    href: COURSE_URL,
    accent: "#E07B3C",
    external: true,
  },
  {
    num: "03",
    title: "Заказать креативы",
    sub: "Для бизнеса",
    desc: "Видео-реклама, фото, презентации, карточки товаров — быстро, качественно, на базе ИИ.",
    cta: "Обсудить проект",
    href: "/b2b",
    accent: "#F4ECD8",
    external: false,
  },
];

// ─── CTA Card ────────────────────────────────────────────────────────────────

function CTACard({ card }: { card: (typeof cards)[0] }) {
  const linkProps = card.external
    ? { href: card.href, target: "_blank", rel: "noopener noreferrer" }
    : { href: card.href };

  const btnStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "11px 22px",
    background: card.accent,
    color: "#0F0E0C",
    borderRadius: 8,
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      style={{
        position: "relative",
        background: "rgba(244,236,216,0.03)",
        border: "1px solid rgba(244,236,216,0.09)",
        borderRadius: 16,
        padding: "40px 32px",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 32,
          right: 32,
          height: 2,
          background: card.accent,
          borderRadius: "0 0 4px 4px",
          opacity: 0.9,
        }}
      />

      {/* hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${card.accent}22 0%, transparent 65%)`,
          borderRadius: 16,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column" }}>
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: card.accent,
            letterSpacing: "0.2em",
            marginBottom: 20,
            opacity: 0.75,
          }}
        >
          {card.num}
        </p>

        <h3
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: "clamp(22px, 2.8vw, 28px)",
            fontWeight: 700,
            color: "#F4ECD8",
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {card.title}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: card.accent,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 20,
          }}
        >
          {card.sub}
        </p>

        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 15,
            fontWeight: 300,
            color: "rgba(244,236,216,0.6)",
            lineHeight: 1.75,
            flex: 1,
            marginBottom: 36,
          }}
        >
          {card.desc}
        </p>

        {card.external ? (
          <a href={linkProps.href} target="_blank" rel="noopener noreferrer" style={btnStyle}>
            {card.cta}
            <Arrow />
          </a>
        ) : (
          <Link href={linkProps.href} style={btnStyle}>
            {card.cta}
            <Arrow />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <main style={{ background: "#0F0E0C", minHeight: "100vh" }}>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background orbs */}
        <Orb
          color="rgba(245,197,24,0.20)"
          size={700}
          style={{ top: "-15%", left: "-18%" }}
          x={[0, 55, -25, 0]}
          y={[0, -45, 35, 0]}
          duration={20}
        />
        <Orb
          color="rgba(224,123,60,0.16)"
          size={550}
          style={{ bottom: "-5%", right: "-12%" }}
          x={[0, -45, 30, 0]}
          y={[0, 40, -30, 0]}
          duration={24}
        />
        <Orb
          color="rgba(245,197,24,0.07)"
          size={380}
          style={{ top: "35%", right: "25%" }}
          x={[0, 25, -40, 0]}
          y={[0, -25, 18, 0]}
          duration={28}
        />

        {/* Hero text */}
        <motion.div
          style={{
            opacity: heroOpacity,
            y: heroY,
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: 900,
          }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1.4, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "#F5C518",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            AI Creative Studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(72px, 15vw, 200px)",
              fontWeight: 900,
              lineHeight: 0.88,
              color: "#F4ECD8",
              letterSpacing: "-0.02em",
              marginBottom: 36,
            }}
          >
            YELUMIO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: "clamp(15px, 1.8vw, 19px)",
              fontWeight: 300,
              color: "rgba(244,236,216,0.6)",
              maxWidth: 520,
              margin: "0 auto 52px",
              lineHeight: 1.65,
            }}
          >
            Создаём смыслы с помощью искусственного интеллекта.
            <br />
            Видео · Фото · Презентации · Карточки товаров
          </motion.p>

          {/* Scroll hint */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={() => document.getElementById("choose")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgba(244,236,216,0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              margin: "0 auto",
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Scroll
              </span>
              <svg width="16" height="22" viewBox="0 0 16 22" fill="none">
                <path d="M8 0v18M1 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>

        {/* bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 130,
            background: "linear-gradient(to top, #0F0E0C, transparent)",
            zIndex: 5,
          }}
        />
      </section>

      {/* ── CHOOSE ─────────────────────────────────────────────────────────── */}
      <section
        id="choose"
        style={{ padding: "100px 24px 120px", maxWidth: 1200, margin: "0 auto" }}
      >
        <FadeSection style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "#F5C518",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              marginBottom: 16,
            }}
          >
            Выберите свой путь
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 62px)",
              fontWeight: 700,
              color: "#F4ECD8",
              lineHeight: 1.15,
            }}
          >
            Чем могу помочь?
          </motion.h2>
        </FadeSection>

        <FadeSection
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {cards.map((card) => (
            <CTACard key={card.num} card={card} />
          ))}
        </FadeSection>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "80px 24px 120px",
          maxWidth: 960,
          margin: "0 auto",
          borderTop: "1px solid rgba(244,236,216,0.07)",
        }}
      >
        <FadeSection>
          <motion.p
            variants={fadeUp}
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
            О студии
          </motion.p>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              fontSize: "clamp(30px, 4.5vw, 52px)",
              fontWeight: 700,
              color: "#F4ECD8",
              lineHeight: 1.2,
              maxWidth: 700,
              marginBottom: 28,
            }}
          >
            Yelumio — студия, где ИИ работает на ваш бренд
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-inter), Inter, sans-serif",
              fontSize: 17,
              fontWeight: 300,
              color: "rgba(244,236,216,0.65)",
              lineHeight: 1.85,
              maxWidth: 680,
              marginBottom: 64,
            }}
          >
            Мы объединяем мощь современных нейросетей с профессиональным
            креативным мышлением. Создаём визуальный контент, который
            выделяется, конвертирует и запоминается.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 48,
            }}
          >
            {[
              { val: "50+", label: "клиентов" },
              { val: "500+", label: "проектов" },
              { val: "3×", label: "быстрее конкурентов" },
              { val: "24ч", label: "средний срок" },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "clamp(42px, 5vw, 58px)",
                    fontWeight: 900,
                    color: "#F5C518",
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: 13,
                    color: "rgba(244,236,216,0.45)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </FadeSection>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(244,236,216,0.08)",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-playfair), 'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#F4ECD8",
            letterSpacing: "0.06em",
            marginBottom: 10,
          }}
        >
          YELUMIO
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: 12,
            color: "rgba(244,236,216,0.3)",
          }}
        >
          © 2026 Yelumio AI Creative Studio. Все права защищены.
        </p>
      </footer>
    </main>
  );
}
