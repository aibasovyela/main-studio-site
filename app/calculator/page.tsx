"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

/* ════════════════════════════════════════════════════════
   CONFIG — меняй только whatsapp и telegram
   ════════════════════════════════════════════════════════ */
const CONFIG = {
  whatsapp: "<МОЙ НОМЕР>",
  telegram: "<МОЙ НИК>",
  vilka: 0.15,
};

/* ════════════════════════════════════════════════════════
   SERVICES — не трогать без команды
   ════════════════════════════════════════════════════════ */
const SERVICES: Record<string, { title: string; sub: string; items: Record<string, any> }> = {
  tech: {
    title: "Технический ИИ",
    sub: "Сайты, автоматизация, агенты",
    items: {
      landing: { name: "Лендинг", base: 250000, opts: [
        { q: "Дизайн", chips: [["По шаблону", 0], ["Уникальный с нуля", { add: 150000 }]] },
        { q: "Объём", chips: [["До 5 блоков", 0], ["6–10 блоков", { add: 80000 }], ["10+ блоков", { add: 160000 }]] },
        { q: "Дополнительно", multi: true, chips: [["Мультиязычность", { add: 60000 }], ["Анимации / 3D", { add: 90000 }], ["Подключение CRM", { add: 70000 }]] },
      ] },
      site: { name: "Многостраничный сайт", base: 600000, opts: [
        { q: "Страниц", chips: [["До 5", 0], ["6–10", { add: 250000 }], ["10+", { add: 500000 }]] },
        { q: "Дополнительно", multi: true, chips: [["Каталог товаров", { add: 200000 }], ["Личный кабинет", { add: 300000 }], ["Интеграция CRM/1С", { add: 150000 }]] },
      ] },
      automation: { name: "Автоматизация бизнеса", base: 300000, opts: [
        { q: "Процессов", chips: [["1 процесс", 0], ["2–3 процесса", { mult: 1.8 }], ["4+ процессов", { mult: 2.8 }]] },
        { q: "Интеграции", multi: true, chips: [["CRM", { add: 80000 }], ["1С / учёт", { add: 120000 }], ["Google-таблицы", { add: 40000 }], ["Мессенджеры", { add: 60000 }]] },
      ] },
      agent: { name: "ИИ-агент (настройка)", base: 400000, opts: [
        { q: "Каналы", multi: true, chips: [["Сайт", 0], ["WhatsApp", { add: 80000 }], ["Telegram", { add: 60000 }], ["Instagram", { add: 80000 }]] },
        { q: "База знаний", chips: [["До 20 документов", 0], ["Большая база", { add: 120000 }]] },
        { q: "Дополнительно", multi: true, chips: [["Запись в CRM", { add: 90000 }], ["Голосовой режим", { add: 150000 }]] },
      ] },
      bot: { name: "Telegram-бот", base: 120000, opts: [
        { q: "Функции", multi: true, chips: [["Приём заявок", 0], ["Оплата в боте", { add: 120000 }], ["Админ-панель", { add: 90000 }], ["ИИ-ответы", { add: 150000 }]] },
      ] },
    },
  },
  visual: {
    title: "Визуальный ИИ",
    sub: "Ролики, контент, презентации",
    items: {
      ad: { name: "Рекламный ролик", base: 100000, opts: [
        { q: "Хронометраж", chips: [["До 15 сек", 0], ["До 30 сек", { mult: 1.5 }], ["До 60 сек", { mult: 2.2 }]] },
        { q: "Дополнительно", multi: true, chips: [["ИИ-аватар / диктор", { add: 100000 }], ["Озвучка + саунд-дизайн", { add: 80000 }], ["Версии под все форматы", { add: 60000 }]] },
        { q: "Количество роликов", chips: [["1 ролик", 0], ["3 ролика", { mult: 2.5 }], ["5 роликов", { mult: 3.8 }]] },
      ] },
      cards: { name: "Карточки товаров", base: 20000, perUnit: true, unit: "карточка", opts: [
        { q: "Объём", chips: [["До 10 шт", { qty: 10 }], ["11–30 шт", { qty: 30, mult: 0.85 }], ["31–100 шт", { qty: 100, mult: 0.7 }]] },
        { q: "Дополнительно", multi: true, chips: [["Инфографика", { add: 5000 }], ["3D-сцены", { add: 8000 }]] },
      ] },
      pres: { name: "Презентация", base: 120000, opts: [
        { q: "Слайдов", chips: [["До 10", 0], ["11–20", { mult: 1.6 }], ["20+", { mult: 2.4 }]] },
        { q: "Уровень", chips: [["Бизнес-стандарт", 0], ["Премиум-дизайн", { add: 100000 }]] },
      ] },
      kp: { name: "Коммерческое предложение", base: 90000, opts: [
        { q: "Формат", chips: [["PDF-документ", 0], ["Интерактивная веб-версия", { add: 80000 }]] },
      ] },
      concert: { name: "Видеоряд для концертов", base: 600000, cap: 2000000, opts: [
        { q: "Длительность", chips: [["До 3 мин", 0], ["До 10 мин", { mult: 1.8 }], ["Полный сет 30+ мин", { mult: 2.9 }]] },
        { q: "Дополнительно", multi: true, chips: [["Синхронизация с треком", { add: 120000 }], ["Несколько экранов", { add: 150000 }]] },
      ] },
      insta: { name: "Ведение Instagram", base: 400000, cap: 800000, monthly: true, opts: [
        { q: "Пакет в месяц", chips: [["12 постов + 4 Reels", 0], ["20 постов + 8 Reels", { mult: 1.4 }], ["Полный контент-завод", { mult: 1.75 }]] },
        { q: "Дополнительно", multi: true, chips: [["Стратегия и рубрикатор", { add: 60000 }], ["ИИ-аватар бренда", { add: 90000 }]] },
      ] },
      avatar: { name: "ИИ-аватары", base: 150000, opts: [
        { q: "Аватаров", chips: [["1 персонаж", 0], ["2–3 персонажа", { mult: 1.8 }]] },
        { q: "Видео с аватаром", chips: [["До 5 видео", 0], ["10+ видео", { add: 200000 }]] },
      ] },
    },
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

const fmt = (n: number) => Math.round(n / 1000) * 1000;
const money = (n: number) => n.toLocaleString("ru-RU") + " ₸";

type Picks = Record<string, number | boolean>;

function initPicks(svcKey: string, tabKey: string): Picks {
  const svc = SERVICES[tabKey].items[svcKey];
  const p: Picks = {};
  svc.opts.forEach((o: any, oi: number) => {
    if (!o.multi) p[`sel-${oi}`] = 0;
  });
  return p;
}

function calcEstimate(svcKey: string, tabKey: string, picks: Picks) {
  const s = SERVICES[tabKey].items[svcKey];
  let base = s.base, add = 0, mult = 1, qty = 1;
  const rows: [string, string][] = [];

  s.opts.forEach((o: any, oi: number) => {
    o.chips.forEach((c: any, ci: number) => {
      const isOn = o.multi ? !!picks[`${oi}-${ci}`] : picks[`sel-${oi}`] === ci;
      if (!isOn) return;
      const eff = c[1];
      let lbl = "включено";
      if (eff && typeof eff === "object") {
        if (eff.qty) qty = eff.qty;
        if (eff.add) { add += eff.add; lbl = "+" + money(eff.add); }
        if (eff.mult) { mult *= eff.mult; lbl = "×" + eff.mult; }
        if (eff.qty && !eff.add && !eff.mult) lbl = eff.qty + " " + (s.unit || "шт");
        if (eff.qty && eff.mult) lbl = eff.qty + " " + (s.unit || "шт") + " ×" + eff.mult;
      }
      rows.push([c[0], lbl]);
    });
  });

  let total = s.perUnit ? base * qty * mult + add : base * mult + add;
  if (s.cap) total = Math.min(total, s.cap);
  total = fmt(total);
  const lo = fmt(total * (1 - CONFIG.vilka));
  let hi = fmt(total * (1 + CONFIG.vilka));
  if (s.cap) hi = Math.min(hi, s.cap);

  return { s, rows, lo, hi };
}

/* ─── SVG icons ──────────────────────────────────────────────────────────────── */

const ICONS: Record<string, string> = {
  landing: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 13h6M7 16h10"/></svg>',
  site: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="13" height="13" rx="2"/><path d="M8 8h13v11a2 2 0 0 1-2 2H8z"/></svg>',
  automation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>',
  agent: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="7" width="16" height="12" rx="3"/><circle cx="9" cy="13" r="1.2"/><circle cx="15" cy="13" r="1.2"/><path d="M12 7V3M8 3h8"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 4 3 11l6 2 2 6 4-5 5 2z"/></svg>',
  ad: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/></svg>',
  cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h12l4 5-4 5H4z"/><circle cx="8.5" cy="12" r="1.2"/></svg>',
  pres: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 12l3-3 2.5 2L17 7M12 16v4M9 20h6"/></svg>',
  kp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M9 13h7M9 17h5"/></svg>',
  concert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12v3M7 8v11M11 4v16M15 8v11M19 11v5"/></svg>',
  insta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r="1"/></svg>',
  avatar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0M17 3.5l1 1M19.5 6l1 .5"/></svg>',
};

/* ─── Styles (inline, dark theme) ───────────────────────────────────────────── */

const C = {
  bg: "#0F0E0C",
  panel: "rgba(244,236,216,0.04)",
  panelBorder: "rgba(244,236,216,0.09)",
  ink: "#F4ECD8",
  muted: "rgba(244,236,216,0.45)",
  line: "rgba(244,236,216,0.09)",
  accent: "#2E47FF",
  accentSoft: "rgba(46,71,255,0.12)",
  accentBorder: "rgba(46,71,255,0.4)",
  good: "#4ADE80",
  mono: "var(--font-mono, 'JetBrains Mono', monospace)",
  sans: "var(--font-inter), Inter, sans-serif",
  display: "var(--font-playfair), 'Playfair Display', serif",
};

/* ─── Main component ─────────────────────────────────────────────────────────── */

export default function CalculatorPage() {
  const [curTab, setCurTab] = useState("tech");
  const [curSvc, setCurSvc] = useState<string | null>(null);
  const [picks, setPicks] = useState<Picks>({});
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", desc: "", deadline: "" });

  function selectTab(tab: string) {
    setCurTab(tab);
    setCurSvc(null);
    setPicks({});
  }

  function selectSvc(svc: string) {
    setCurSvc(svc);
    setPicks(initPicks(svc, curTab));
  }

  function togglePick(oi: number, ci: number, multi: boolean) {
    setPicks(prev => {
      const next = { ...prev };
      if (multi) {
        next[`${oi}-${ci}`] = !prev[`${oi}-${ci}`];
      } else {
        next[`sel-${oi}`] = ci;
      }
      return next;
    });
  }

  const estimate = useMemo(
    () => (curSvc ? calcEstimate(curSvc, curTab, picks) : null),
    [curSvc, curTab, picks]
  );

  function buildMsg() {
    const L = estimate;
    let m = `Заявка с калькулятора Yelumio\n\nУслуга: ${L ? L.s.name : "не выбрана"}\n`;
    if (L) {
      L.rows.forEach(r => (m += `• ${r[0]} (${r[1]})\n`));
      m += `Ориентировочно: ${money(L.lo)} – ${money(L.hi)}${L.s.monthly ? " / мес" : ""}\n`;
    }
    m += `\nИмя: ${form.name || "—"}\nКомпания: ${form.company || "—"}\nТелефон: ${form.phone || "—"}\nЗадача: ${form.desc || "—"}\nСрок: ${form.deadline || "—"}`;
    return m;
  }

  function sendWA() {
    window.open("https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(buildMsg()), "_blank");
  }

  function sendTg() {
    navigator.clipboard.writeText(buildMsg());
    window.open("https://t.me/" + CONFIG.telegram, "_blank");
  }

  function copyEstimate() {
    navigator.clipboard.writeText(buildMsg());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function setField(field: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [field]: e.target.value }));
  }

  const today = new Date().toLocaleDateString("ru-RU");
  const tabKeys = Object.keys(SERVICES);

  return (
    <main style={{ background: C.bg, minHeight: "100vh", color: C.ink }}>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(15,14,12,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.line}` }}>
        <Link href="/" style={{ fontFamily: C.display, fontSize: 18, fontWeight: 700, color: C.ink, letterSpacing: "0.05em" }}>YELUMIO</Link>
        <Link href="/b2b" style={{ fontFamily: C.sans, fontSize: 13, color: C.muted }}>← Назад</Link>
      </nav>

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 20px 80px" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>
            Yelumio AI Studio · Калькулятор проекта
          </p>
          <h1 style={{ fontFamily: C.display, fontWeight: 700, fontSize: "clamp(26px, 4vw, 40px)", lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: 12, color: C.ink }}>
            Соберите проект и узнайте примерную стоимость
          </h1>
          <p style={{ color: C.muted, maxWidth: 560, fontSize: 15, fontFamily: C.sans }}>
            Выберите услугу, отметьте параметры — смета пересчитается мгновенно. Затем отправьте заявку, и мы вернёмся с точным расчётом.
          </p>
        </div>

        {/* ── Grid: left / right ── */}
        <div className="calc-grid" style={{ display: "grid", gridTemplateColumns: "1fr min(380px, 100%)", gap: 24, alignItems: "start" }}>

          {/* LEFT */}
          <div>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {tabKeys.map(k => (
                <button
                  key={k}
                  onClick={() => selectTab(k)}
                  style={{
                    flex: 1,
                    minWidth: 140,
                    padding: "14px 16px",
                    border: `1px solid ${curTab === k ? C.accent : C.panelBorder}`,
                    borderRadius: 14,
                    background: curTab === k ? C.accentSoft : C.panel,
                    cursor: "pointer",
                    fontFamily: C.sans,
                    fontWeight: 600,
                    fontSize: 15,
                    color: curTab === k ? C.accent : C.muted,
                    textAlign: "left",
                    transition: "all 0.15s",
                    boxShadow: curTab === k ? `0 1px 0 ${C.accent}` : "none",
                  }}
                >
                  {SERVICES[k].title}
                  <small style={{ display: "block", fontWeight: 400, fontSize: 12, marginTop: 2, color: curTab === k ? C.accent : C.muted, opacity: 0.75 }}>
                    {SERVICES[k].sub}
                  </small>
                </button>
              ))}
            </div>

            {/* Service cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {Object.entries(SERVICES[curTab].items).map(([k, s]) => {
                const isOn = k === curSvc;
                const q0 = s.opts[0]?.chips[0]?.[1];
                const fromPrice = s.perUnit ? s.base * ((q0 && q0.qty) || 1) : s.base;
                return (
                  <div
                    key={k}
                    onClick={() => selectSvc(k)}
                    style={{
                      padding: 16,
                      border: `1px solid ${isOn ? C.accent : C.panelBorder}`,
                      borderRadius: 14,
                      background: isOn ? C.accentSoft : C.panel,
                      cursor: "pointer",
                      display: "flex",
                      gap: 12,
                      alignItems: "flex-start",
                      transition: "all 0.15s",
                    }}
                  >
                    <div
                      style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 10, background: isOn ? C.accent : C.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", color: isOn ? "#fff" : C.accent }}
                      dangerouslySetInnerHTML={{ __html: ICONS[k] || "" }}
                    />
                    <div>
                      <b style={{ fontSize: 15, display: "block", color: C.ink, fontFamily: C.sans }}>{s.name}</b>
                      <span style={{ fontFamily: C.mono, fontSize: 12, color: isOn ? C.accent : C.muted }}>
                        от {money(fmt(fromPrice))}{s.monthly ? " / мес" : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Options */}
            <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 18, padding: 24, marginBottom: 24 }}>
              {!curSvc ? (
                <p style={{ color: C.muted, fontSize: 14, textAlign: "center", padding: "30px 0", fontFamily: C.sans }}>
                  Выберите услугу выше, чтобы настроить параметры
                </p>
              ) : (
                <>
                  <h3 style={{ fontSize: 17, marginBottom: 4, color: C.ink, fontFamily: C.sans }}>
                    {SERVICES[curTab].items[curSvc].name}
                  </h3>
                  <p style={{ color: C.muted, fontSize: 13, marginBottom: 18, fontFamily: C.sans }}>
                    Отметьте параметры — смета справа обновится
                  </p>
                  {SERVICES[curTab].items[curSvc].opts.map((o: any, oi: number) => (
                    <div key={oi} style={{ marginBottom: 18 }}>
                      <label style={{ display: "block", fontWeight: 600, fontSize: 13.5, marginBottom: 8, color: C.ink, fontFamily: C.sans }}>
                        {o.q}
                      </label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {o.chips.map((c: any, ci: number) => {
                          const isOn = o.multi ? !!picks[`${oi}-${ci}`] : picks[`sel-${oi}`] === ci;
                          return (
                            <span
                              key={ci}
                              onClick={() => togglePick(oi, ci, !!o.multi)}
                              style={{
                                padding: "8px 14px",
                                border: `1px solid ${isOn ? C.accent : C.panelBorder}`,
                                borderRadius: 999,
                                fontSize: 13.5,
                                cursor: "pointer",
                                background: isOn ? C.accent : C.bg,
                                color: isOn ? "#fff" : C.ink,
                                transition: "all 0.15s",
                                userSelect: "none",
                                fontFamily: C.sans,
                              }}
                            >
                              {c[0]}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Form */}
            <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 18, padding: 24 }}>
              <h3 style={{ fontSize: 17, marginBottom: 14, color: C.ink, fontFamily: C.sans }}>Бриф по проекту</h3>
              {[
                { id: "name", placeholder: "Ваше имя *", type: "text" },
                { id: "company", placeholder: "Компания / бренд", type: "text" },
                { id: "phone", placeholder: "Телефон / WhatsApp *", type: "tel" },
                { id: "deadline", placeholder: "Желаемый срок (например: до конца месяца)", type: "text" },
              ].map(f => (
                <div key={f.id} style={{ marginBottom: 12 }}>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.id as keyof typeof form]}
                    onChange={setField(f.id)}
                    style={{ width: "100%", padding: "11px 14px", border: `1px solid ${C.line}`, borderRadius: 10, fontFamily: C.sans, fontSize: 14, background: C.bg, color: C.ink, outline: "none" }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: 12 }}>
                <textarea
                  placeholder="Опишите задачу: что за продукт, какая цель, есть ли референсы"
                  value={form.desc}
                  onChange={setField("desc")}
                  rows={3}
                  style={{ width: "100%", padding: "11px 14px", border: `1px solid ${C.line}`, borderRadius: 10, fontFamily: C.sans, fontSize: 14, background: C.bg, color: C.ink, outline: "none", resize: "vertical" }}
                />
              </div>

              <button
                onClick={sendWA}
                style={{ width: "100%", padding: 15, border: "none", borderRadius: 12, background: C.accent, color: "#fff", fontFamily: C.sans, fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 10, transition: "opacity 0.15s" }}
              >
                Отправить заявку в WhatsApp
              </button>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={sendTg}
                  style={{ flex: 1, padding: 11, border: `1px solid ${C.panelBorder}`, borderRadius: 10, background: C.panel, fontFamily: C.sans, fontWeight: 600, fontSize: 13, cursor: "pointer", color: C.ink }}
                >
                  Написать в Telegram
                </button>
                <button
                  onClick={copyEstimate}
                  style={{ flex: 1, padding: 11, border: `1px solid ${C.panelBorder}`, borderRadius: 10, background: C.panel, fontFamily: C.sans, fontWeight: 600, fontSize: 13, cursor: "pointer", color: C.ink }}
                >
                  {copied ? "✓ Скопировано" : "Скопировать смету"}
                </button>
              </div>
            </div>

            <p style={{ marginTop: 28, fontSize: 12, color: C.muted, maxWidth: 620, fontFamily: C.sans }}>
              Калькулятор показывает ориентировочную вилку. Финальная стоимость фиксируется в КП после короткого созвона и зависит от объёма контента, интеграций и сроков.
            </p>
          </div>

          {/* RIGHT — sticky smeta */}
          <div className="smeta-panel" style={{ position: "sticky", top: 70, background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 18, overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: `1px dashed ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <b style={{ fontFamily: C.mono, fontSize: 13, letterSpacing: "0.04em", color: C.ink }}>СМЕТА</b>
              <span style={{ fontFamily: C.mono, fontSize: 11, color: C.muted }}>{today}</span>
            </div>

            <div style={{ padding: "16px 22px", minHeight: 90 }}>
              {!estimate ? (
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 13.5, color: C.muted, fontFamily: C.sans }}>
                  <span>Услуга не выбрана</span>
                  <span style={{ flex: 1, borderBottom: `1px dotted ${C.line}`, transform: "translateY(-3px)" }} />
                  <span style={{ fontFamily: C.mono, fontSize: 12.5 }}>—</span>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 13.5, marginBottom: 9, fontFamily: C.sans }}>
                    <span style={{ maxWidth: "60%" }}><b>{estimate.s.name}</b></span>
                    <span style={{ flex: 1, borderBottom: `1px dotted ${C.line}`, transform: "translateY(-3px)" }} />
                    <span style={{ fontFamily: C.mono, fontSize: 12.5, whiteSpace: "nowrap", color: C.ink }}>
                      {money(fmt(estimate.s.perUnit ? estimate.s.base * ((SERVICES[curTab].items[curSvc!].opts[0]?.chips[0]?.[1]?.qty) || 1) : estimate.s.base))}
                    </span>
                  </div>
                  {estimate.rows.map(([name, val], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, fontSize: 13.5, marginBottom: 9, color: C.muted, fontFamily: C.sans }}>
                      <span style={{ maxWidth: "60%" }}>{name}</span>
                      <span style={{ flex: 1, borderBottom: `1px dotted ${C.line}`, transform: "translateY(-3px)" }} />
                      <span style={{ fontFamily: C.mono, fontSize: 12.5, whiteSpace: "nowrap" }}>{val}</span>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div style={{ padding: "18px 22px", borderTop: `1px dashed ${C.line}`, background: `linear-gradient(0deg, ${C.accentSoft}, transparent)` }}>
              <div style={{ fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: C.sans }}>Ориентировочно</div>
              <div style={{ fontFamily: C.mono, fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 26px)", color: C.accent, marginTop: 4 }}>
                {estimate ? `${money(estimate.lo)} – ${money(estimate.hi)}${estimate.s.monthly ? " / мес" : ""}` : "0 ₸"}
              </div>
              <div style={{ fontSize: 11.5, color: C.muted, marginTop: 6, fontFamily: C.sans }}>Вилка ±15% до уточнения деталей</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: smeta goes below */}
      <style>{`
        @media (max-width: 760px) {
          .calc-grid { grid-template-columns: 1fr !important; }
          .smeta-panel { position: static !important; }
        }
      `}</style>
    </main>
  );
}
