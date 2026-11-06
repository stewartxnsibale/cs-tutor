import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, BookOpen, Check, CircleHelp, Cpu, Globe2,
  Home, Play, RotateCcw, Settings2, Users,
} from "lucide-react";

type Lang = "en" | "es" | "hi" | "ar";
type Lesson = { icon: string; title: Record<Lang, string>; text: Record<Lang, string>; chip: Record<Lang, string> };

const copy: Record<Lang, {
  tagline: string; home: string; lessons: string; settings: string;
  try: string; run: string; running: string; input: string; speed: string;
  community: string; free: string; concept: string; finished: string;
  previous: string; next: string; reset: string; scene: string;
}> = {
  en: {
    tagline: "Explore · Understand · Build", home: "Home", lessons: "Lessons",
    settings: "Settings", try: "Try it yourself", run: "Run", running: "Running…",
    input: "Input", speed: "Speed", community: "Join Community", free: "Free learners group",
    concept: "Key idea", finished: "Lesson complete!", previous: "Previous",
    next: "Next lesson", reset: "Reset", scene: "Interactive scene",
  },
  es: {
    tagline: "Explora · Comprende · Crea", home: "Inicio", lessons: "Lecciones",
    settings: "Ajustes", try: "Pruébalo tú", run: "Ejecutar", running: "Ejecutando…",
    input: "Entrada", speed: "Velocidad", community: "Únete a la comunidad",
    free: "Grupo gratuito de aprendizaje", concept: "Idea clave", finished: "¡Lección completada!",
    previous: "Anterior", next: "Siguiente lección", reset: "Reiniciar", scene: "Escena interactiva",
  },
  hi: {
    tagline: "खोजें · समझें · बनाएँ", home: "होम", lessons: "पाठ",
    settings: "सेटिंग्स", try: "खुद करके देखें", run: "चलाएँ", running: "चल रहा है…",
    input: "इनपुट", speed: "गति", community: "समुदाय से जुड़ें",
    free: "सीखने वालों का मुफ़्त समूह", concept: "मुख्य विचार", finished: "पाठ पूरा हुआ!",
    previous: "पिछला", next: "अगला पाठ", reset: "रीसेट", scene: "इंटरैक्टिव दृश्य",
  },
  ar: {
    tagline: "استكشف · افهم · ابنِ", home: "الرئيسية", lessons: "الدروس",
    settings: "الإعدادات", try: "جرّب بنفسك", run: "شغّل", running: "جارٍ التشغيل…",
    input: "المدخل", speed: "السرعة", community: "انضم إلى المجتمع",
    free: "مجموعة مجانية للمتعلمين", concept: "الفكرة الأساسية", finished: "اكتمل الدرس!",
    previous: "السابق", next: "الدرس التالي", reset: "إعادة ضبط", scene: "مشهد تفاعلي",
  },
};

const lessons: Lesson[] = [
  {
    icon: "🗺️",
    title: { en: "Meet the system", es: "Conoce el sistema", hi: "सिस्टम से मिलें", ar: "تعرّف على النظام" },
    text: {
      en: "Computer science is about giving information a useful journey. Data comes in, a computer works on it, and a result comes out.",
      es: "La informática da un recorrido útil a la información: los datos entran, la computadora los procesa y sale un resultado.",
      hi: "कंप्यूटर साइंस जानकारी को उपयोगी यात्रा देता है: डेटा आता है, कंप्यूटर उस पर काम करता है, फिर परिणाम निकलता है।",
      ar: "علوم الحاسوب تمنح المعلومات رحلة مفيدة: تدخل البيانات، يعالجها الحاسوب، ثم تظهر النتيجة.",
    },
    chip: { en: "Input → process → output", es: "Entrada → proceso → salida", hi: "इनपुट → प्रक्रिया → आउटपुट", ar: "مدخلات ← معالجة ← مخرجات" },
  },
  {
    icon: "💡",
    title: { en: "Bits: tiny signals", es: "Bits: señales pequeñas", hi: "बिट: छोटे संकेत", ar: "البتات: إشارات صغيرة" },
    text: {
      en: "A bit is a tiny piece of information: 0 or 1. By grouping bits, computers can represent numbers, letters, colors, and much more.",
      es: "Un bit es una pequeña pieza de información: 0 o 1. Al agruparlos, se representan números, letras, colores y mucho más.",
      hi: "बिट जानकारी का एक छोटा हिस्सा है: 0 या 1। बिट्स को समूह में रखकर संख्याएँ, अक्षर, रंग और बहुत कुछ दर्शाया जाता है।",
      ar: "البت جزء صغير من المعلومات: 0 أو 1. بتجميع البتات، يمكن تمثيل الأرقام والحروف والألوان وغير ذلك.",
    },
    chip: { en: "Two possible values", es: "Dos valores posibles", hi: "दो संभावित मान", ar: "قيمتان ممكنتان" },
  },
  {
    icon: "🔀",
    title: { en: "Logic makes choices", es: "La lógica elige", hi: "लॉजिक चुनाव करता है", ar: "المنطق يتخذ القرار" },
    text: {
      en: "Logic rules combine true-or-false signals. A simple AND gate says “yes” only when both of its inputs are on.",
      es: "Las reglas lógicas combinan señales verdaderas o falsas. Una compuerta AND responde “sí” solo si ambas entradas están activas.",
      hi: "लॉजिक के नियम सही-गलत संकेतों को जोड़ते हैं। AND गेट “हाँ” तभी कहता है जब उसके दोनों इनपुट चालू हों।",
      ar: "تجمع قواعد المنطق إشارات الصواب والخطأ. تقول بوابة AND «نعم» فقط عندما يكون مدخلاها مفعّلين.",
    },
    chip: { en: "AND: both must be on", es: "AND: ambos deben activarse", hi: "AND: दोनों चालू होने चाहिए", ar: "AND: يجب تفعيل الاثنين" },
  },
  {
    icon: "🧭",
    title: { en: "Algorithms: clear steps", es: "Algoritmos: pasos claros", hi: "एल्गोरिदम: साफ़ चरण", ar: "الخوارزميات: خطوات واضحة" },
    text: {
      en: "An algorithm is a set of steps for solving a problem. Like a recipe, it turns an input into an output in an organized way.",
      es: "Un algoritmo es un conjunto de pasos para resolver un problema. Como una receta, transforma una entrada en una salida.",
      hi: "एल्गोरिदम किसी समस्या को हल करने के चरणों का समूह है। रेसिपी की तरह, यह इनपुट को व्यवस्थित रूप से आउटपुट में बदलता है।",
      ar: "الخوارزمية مجموعة خطوات لحل مشكلة. مثل الوصفة، تحوّل المدخلات إلى مخرجات بطريقة منظمة.",
    },
    chip: { en: "Order matters", es: "El orden importa", hi: "क्रम मायने रखता है", ar: "للترتيب أهمية" },
  },
  {
    icon: "🧺",
    title: { en: "Data: keep it tidy", es: "Datos: en orden", hi: "डेटा: व्यवस्थित रखें", ar: "البيانات: نظّمها" },
    text: {
      en: "A list keeps related items together. Computers can look through the list to find an item or add a new one.",
      es: "Una lista agrupa elementos relacionados. La computadora puede buscar uno o añadir otro.",
      hi: "एक सूची संबंधित चीज़ों को साथ रखती है। कंप्यूटर इसमें कोई चीज़ खोज सकता है या नई चीज़ जोड़ सकता है।",
      ar: "تجمع القائمة العناصر المرتبطة. يستطيع الحاسوب البحث عن عنصر أو إضافة عنصر جديد.",
    },
    chip: { en: "Lists hold collections", es: "Las listas agrupan elementos", hi: "सूची में कई चीज़ें होती हैं", ar: "القوائم تجمع العناصر" },
  },
  {
    icon: "🧠",
    title: { en: "Memory: remember data", es: "Memoria: guarda datos", hi: "मेमोरी: डेटा याद रखें", ar: "الذاكرة: احفظ البيانات" },
    text: {
      en: "A computer uses memory as a workspace. Stored values can be read, changed, and used while a program is running.",
      es: "La computadora usa la memoria como espacio de trabajo. Puede leer, cambiar y usar valores mientras corre un programa.",
      hi: "कंप्यूटर मेमोरी को काम की जगह की तरह इस्तेमाल करता है। प्रोग्राम चलते समय वहाँ के मान पढ़े और बदले जा सकते हैं।",
      ar: "يستخدم الحاسوب الذاكرة مساحةً للعمل. يمكن قراءة القيم وتغييرها واستخدامها أثناء تشغيل البرنامج.",
    },
    chip: { en: "Read · change · use", es: "Leer · cambiar · usar", hi: "पढ़ें · बदलें · उपयोग करें", ar: "اقرأ · غيّر · استخدم" },
  },
  {
    icon: "🌐",
    title: { en: "Networks: share messages", es: "Redes: comparte mensajes", hi: "नेटवर्क: संदेश साझा करें", ar: "الشبكات: شارك الرسائل" },
    text: {
      en: "A network connects devices so they can exchange data. A message is split into small packets that travel to their destination.",
      es: "Una red conecta dispositivos para intercambiar datos. Un mensaje se divide en paquetes pequeños que viajan a su destino.",
      hi: "नेटवर्क उपकरणों को जोड़ता है ताकि वे डेटा साझा कर सकें। संदेश छोटे पैकेट में बँटकर अपने गंतव्य तक जाते हैं।",
      ar: "تربط الشبكة الأجهزة لتبادل البيانات. تُقسّم الرسالة إلى حزم صغيرة تسافر إلى وجهتها.",
    },
    chip: { en: "Devices send packets", es: "Los dispositivos envían paquetes", hi: "डिवाइस पैकेट भेजते हैं", ar: "ترسل الأجهزة الحزم" },
  },
  {
    icon: "🛠️",
    title: { en: "Programs: improve by testing", es: "Programas: mejora probando", hi: "प्रोग्राम: जाँचकर सुधारें", ar: "البرامج: حسّنها بالاختبار" },
    text: {
      en: "Programs are instructions a computer follows. Test a small change, observe what happens, then improve the next version.",
      es: "Los programas son instrucciones. Prueba un pequeño cambio, observa qué ocurre y mejora la siguiente versión.",
      hi: "प्रोग्राम वे निर्देश हैं जिनका कंप्यूटर पालन करता है। छोटा बदलाव जाँचें, परिणाम देखें, फिर अगला रूप बेहतर करें।",
      ar: "البرامج تعليمات يتبعها الحاسوب. اختبر تغييرًا صغيرًا، لاحظ النتيجة، ثم حسّن النسخة التالية.",
    },
    chip: { en: "Build → test → improve", es: "Crear → probar → mejorar", hi: "बनाएँ → जाँचें → सुधारें", ar: "ابنِ ← اختبر ← حسّن" },
  },
];

function Scene({ lesson, value, running, onPick }: {
  lesson: number; value: number; running: boolean; onPick: (n: number) => void;
}) {
  const active = running || value > 50;
  return (
    <div className={`scene lesson-${lesson}`} aria-label="Interactive computer science illustration">
      <div className="scene-label"><span className="live-dot" /> INTERACTIVE MODEL</div>
      <svg viewBox="0 0 720 430" role="img" aria-label="Diagram for the current lesson">
        <defs>
          <filter id="glow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <linearGradient id="board" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#e6d7b7" /><stop offset="1" stopColor="#c8b38d" />
          </linearGradient>
        </defs>
        {/* Isometric-style base */}
        <path d="M110 294 360 170 611 294 360 420Z" fill="#cfc0a4" opacity=".45" />
        <path d="M110 281 360 155 611 281 360 407Z" fill="url(#board)" stroke="#b9a785" strokeWidth="2" />
        <path d="M110 281 110 304 360 430 360 407Z" fill="#bea982" />
        <path d="M611 281 611 304 360 430 360 407Z" fill="#aa956e" />
        {/* Input node */}
        <g className="scene-node" onClick={() => onPick(20)} role="button" tabIndex={0} aria-label="Input">
          <path d="M155 250 244 205 302 234 212 280Z" fill="#fff9ec" stroke="#b9a785" strokeWidth="2" />
          <rect x="183" y="211" width="76" height="47" rx="9" fill={lesson === 1 ? (value > 50 ? "#ffad58" : "#b6d9cc") : "#b6d9cc"} transform="skewY(-27)" />
          <text x="205" y="243" className="svg-label">{lesson === 1 ? (value > 50 ? "1 · ON" : "0 · OFF") : "INPUT"}</text>
        </g>
        {/* Main processor / logic */}
        <g className="scene-node" onClick={() => onPick(80)} role="button" tabIndex={0} aria-label="Processor">
          <path d="M289 282 378 237 469 283 380 329Z" fill="#f5ede0" stroke="#b9a785" strokeWidth="2" />
          <path d="M315 250 378 218 443 250 380 283Z" fill={active ? "#e89c69" : "#74ad9d"} stroke="#fff4dd" strokeWidth="2" />
          <path d="M315 250v34l65 32v-33Z" fill={active ? "#ca8057" : "#548f81"} />
          <path d="M443 250v34l-63 32v-33Z" fill={active ? "#ad674a" : "#40796c"} />
          <text x="358" y="267" className="svg-label white">CPU</text>
          {Array.from({ length: 4 }, (_, i) => <circle key={i} cx={331 + i * 15} cy="243" r="3" fill="#fff2d5" />)}
        </g>
        {/* Output node */}
        <g className="scene-node" onClick={() => onPick(100)} role="button" tabIndex={0} aria-label="Output">
          <path d="M446 250 524 211 584 241 505 282Z" fill="#fff9ec" stroke="#b9a785" strokeWidth="2" />
          <circle cx="515" cy="237" r={lesson === 2 && active ? 15 : 10} fill={active ? "#f4a75d" : "#e7c77c"} filter={active ? "url(#glow)" : undefined} />
          <text x="507" y="269" className="svg-label">OUTPUT</text>
        </g>
        {/* Dotted data path */}
        <path d="M241 253 315 270M443 268 508 239" className={running ? "flow-line flowing" : "flow-line"} />
        {lesson === 3 && <g><circle cx="274" cy="261" r="15" fill="#fff7e7" stroke="#c7ae80" /><text x="266" y="266" className="svg-small">AND</text></g>}
        {lesson === 4 && <g>{[0, 1, 2, 3].map(i => <circle key={i} cx={300 + i * 24} cy={285 - i * 12} r="8" fill={active ? "#e89c69" : "#74ad9d"} />)}</g>}
        {lesson === 5 && <g>{[0, 1, 2, 3].map(i => <rect key={i} x={333 + i * 28} y={345 - i * 14} width="21" height="17" rx="4" fill={i < Math.ceil(value / 25) ? "#e89c69" : "#f8efdc"} stroke="#b9a785" />)}</g>}
        {lesson === 6 && <g>{[0, 1, 2].map(i => <rect key={i} x={340 + i * 37} y={342 - i * 18} width="29" height="18" rx="5" fill={i < Math.ceil(value / 34) ? "#74ad9d" : "#f8efdc"} stroke="#b9a785" />)}</g>}
        {lesson === 7 && <g>{[0, 1, 2].map(i => <g key={i}><circle cx={270 + i * 90} cy={330 - i * 26} r="13" fill="#fff7e7" stroke="#74ad9d" strokeWidth="3" /><text x={263 + i * 90} y={334 - i * 26} className="svg-small">●</text></g>)}</g>}
        {lesson === 8 && <g><path d="M280 316 330 291 380 316 430 291 480 316" fill="none" stroke="#d88357" strokeWidth="4" strokeDasharray="6 6" /></g>}
        <text x="176" y="354" className="svg-caption">{lesson === 1 ? "IN" : lesson === 7 ? "DEVICE A" : "DATA"}</text>
        <text x="498" y="328" className="svg-caption">{lesson === 7 ? "DEVICE B" : "RESULT"}</text>
      </svg>
      <div className="scene-hint"><CircleHelp size={15} /> Tap a part of the model to change the control</div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(55);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const [nav, setNav] = useState<"home" | "lessons" | "settings">("home");
  const t = copy[lang];
  const lesson = lessons[index];
  const rtl = lang === "ar";

  const run = () => {
    setRunning(true);
    setCompleted((old) => old.includes(index) ? old : [...old, index]);
    window.setTimeout(() => setRunning(false), 1100);
  };
  const changeLesson = (i: number) => {
    setIndex(Math.max(0, Math.min(lessons.length - 1, i)));
    setValue(55);
    setRunning(false);
  };

  return (
    <main className={rtl ? "app rtl" : "app"} dir={rtl ? "rtl" : "ltr"}>
      <header className="topbar">
        <div className="brand-mark"><Cpu size={21} /></div>
        <div className="brand-copy"><strong>Little Steps in CS</strong><span>{t.tagline}</span></div>
        <div className="progress-wrap">
          <span>{index + 1}/{lessons.length}</span>
          <div className="progress-track"><div style={{ width: `${((index + 1) / lessons.length) * 100}%` }} /></div>
        </div>
        <label className="language"><Globe2 size={17} /><select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Choose language">
          <option value="en">EN</option><option value="es">ES</option><option value="hi">हिं</option><option value="ar">عربي</option>
        </select></label>
      </header>

      <div className="layout">
        <nav className="left-nav" aria-label="Main navigation">
          <button className={nav === "home" ? "nav-icon selected" : "nav-icon"} onClick={() => setNav("home")} title={t.home}><Home size={19} /></button>
          <button className={nav === "lessons" ? "nav-icon selected" : "nav-icon"} onClick={() => setNav("lessons")} title={t.lessons}><BookOpen size={19} /></button>
          <button className={nav === "settings" ? "nav-icon selected" : "nav-icon"} onClick={() => setNav("settings")} title={t.settings}><Settings2 size={19} /></button>
          <span className="nav-spacer" />
          <div className="tiny-mark"><Cpu size={17} /></div>
        </nav>

        <section className="workspace">
          {nav !== "home" && <div className="nav-note">{nav === "lessons" ? "Choose a lesson from the strip below." : "Change the language using the selector above."}</div>}
          <div className="lesson-kicker"><span>{lesson.icon}</span> LESSON {String(index + 1).padStart(2, "0")}</div>
          <div className="content-grid">
            <div className="visual-column">
              <AnimatePresence mode="wait">
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                  <Scene lesson={index} value={value} running={running} onPick={setValue} />
                </motion.div>
              </AnimatePresence>
              <div className="scene-controls">
                <span className="control-caption">{t.input}: <b>{value > 50 ? "1" : "0"}</b></span>
                <input aria-label={t.input} type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} />
                <span className="control-caption">{t.speed}: <b>{value}%</b></span>
              </div>
            </div>

            <aside className="right-panel">
              <div className="panel-eyebrow">{t.concept}</div>
              <h1>{lesson.title[lang]}</h1>
              <p className="lesson-description">{lesson.text[lang]}</p>
              <div className="concept-chip"><span>✦</span>{lesson.chip[lang]}</div>
              <div className="try-box">
                <div className="try-title"><span>{t.try}</span><span className="tiny-spark">✳</span></div>
                <p>{index === 2 ? "Turn both signals on to light the result." : index === 4 ? "Slide to add more items to the list." : "Move the slider, then run the model to see what changes."}</p>
                <div className="range-row"><span>{t.input}</span><b>{value}%</b></div>
                <input aria-label={t.input} type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} />
                <button className="run-button" onClick={run}><Play size={16} fill="currentColor" />{running ? t.running : t.run}</button>
              </div>
              {completed.includes(index) && <div className="complete-note"><Check size={15} />{t.finished}</div>}
              <div className="panel-navigation">
                <button onClick={() => changeLesson(index - 1)} disabled={index === 0}><ArrowLeft size={16} />{t.previous}</button>
                <button className="next-button" onClick={() => changeLesson(index + 1)} disabled={index === lessons.length - 1}>{t.next}<ArrowRight size={16} /></button>
              </div>
            </aside>
          </div>

          <section className="lesson-strip" aria-label="Lessons">
            <div className="strip-heading"><div><span>YOUR JOURNEY</span><strong>{t.lessons}</strong></div><button className="reset-button" onClick={() => { setCompleted([]); changeLesson(0); }}><RotateCcw size={14} />{t.reset}</button></div>
            <div className="lesson-cards">
              {lessons.map((item, i) => (
                <button key={i} className={`lesson-card ${i === index ? "current" : ""}`} onClick={() => changeLesson(i)}>
                  <span className="card-icon">{item.icon}</span>
                  <span className="card-title">{item.title[lang]}</span>
                  {completed.includes(i) && <span className="card-check"><Check size={12} /></span>}
                  <small>{String(i + 1).padStart(2, "0")}</small>
                </button>
              ))}
            </div>
          </section>
        </section>
      </div>

      <a className="community-cta" href="https://whatsapp.com/channel/0029VbBFE8G5PO0tNwGJG91i" target="_blank" rel="noreferrer">
        <span className="community-icon"><Users size={18} /></span>
        <span><strong>{t.community}</strong><small>{t.free}</small></span>
      </a>
    </main>
  );
}
