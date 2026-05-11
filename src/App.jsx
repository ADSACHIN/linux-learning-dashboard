import { useState, useCallback, useEffect, useRef } from "react";
import LinuxLabSetup from "./lessons/LinuxLabSetup";
import LinuxStep1 from "./lessons/LinuxStep1";
import LinuxStep2 from "./lessons/LinuxStep2";
import LinuxStep3 from "./lessons/LinuxStep3";
import LinuxStep4 from "./lessons/LinuxStep4";
import LinuxStep5 from "./lessons/LinuxStep5";
import LinuxStep6 from "./lessons/LinuxStep6";
import LinuxStep7 from "./lessons/LinuxStep7";
import LinuxStep8 from "./lessons/LinuxStep8";
import LinuxStep9 from "./lessons/LinuxStep9";
import LinuxStep10 from "./lessons/LinuxStep10";
import LinuxStep12 from "./lessons/LinuxStep12";

const lessons = [
  { id: "lab", label: "Lab Setup", title: "Lab Setup and Test", icon: "🔧", Component: LinuxLabSetup },
  { id: "step1", label: "Step 1", title: "What Is Linux", icon: "🐧", Component: LinuxStep1 },
  { id: "step2", label: "Step 2", title: "Architecture Deep Dive", icon: "🏗️", Component: LinuxStep2 },
  { id: "step3", label: "Step 3", title: "Filesystem Architecture", icon: "📁", Component: LinuxStep3 },
  { id: "step4", label: "Step 4", title: "Users & Permissions", icon: "👤", Component: LinuxStep4 },
  { id: "step5", label: "Step 5", title: "Processes & Services", icon: "⚙️", Component: LinuxStep5 },
  { id: "step6", label: "Step 6", title: "Networking Deep Dive", icon: "🌐", Component: LinuxStep6 },
  { id: "step7", label: "Step 7", title: "Security Deep Understanding", icon: "🛡️", Component: LinuxStep7 },
  { id: "step8", label: "Step 8", title: "Boot Process Deep Dive", icon: "🔌", Component: LinuxStep8 },
  { id: "step9", label: "Step 9", title: "Package Management", icon: "📦", Component: LinuxStep9 },
  { id: "step10", label: "Step 10", title: "Logging & Monitoring", icon: "📊", Component: LinuxStep10 },
  { id: "step12", label: "Step 12", title: "Risks, Benefits & Tradeoffs", icon: "⚖️", Component: LinuxStep12 },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState(0); // -1 = prev, 1 = next
  const contentRef = useRef(null);
  const navRef = useRef(null);

  const activeLesson = lessons[activeIndex];
  const ActiveComponent = activeLesson.Component;
  const progress = ((activeIndex + 1) / lessons.length) * 100;

  const navigateTo = useCallback((index) => {
    if (index === activeIndex || transitioning) return;
    setDirection(index > activeIndex ? 1 : -1);
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setTransitioning(false), 50);
    }, 300);
  }, [activeIndex, transitioning]);

  const goNext = useCallback(() => {
    if (activeIndex < lessons.length - 1) navigateTo(activeIndex + 1);
  }, [activeIndex, navigateTo]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) navigateTo(activeIndex - 1);
  }, [activeIndex, navigateTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.altKey && e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.altKey && e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Scroll active nav button into view
  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector('[data-active="true"]');
    if (activeBtn) activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIndex]);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c0f", fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* ─── Top Header Bar ─── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 10001,
        background: "linear-gradient(180deg, rgba(10,12,15,0.98) 0%, rgba(10,12,15,0.95) 100%)",
        backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,255,136,0.12)",
      }}>
        {/* Progress Bar */}
        <div style={{ height: 3, background: "#111820", position: "relative" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(90deg, #00ff88, #00d4ff)",
            transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 0 12px rgba(0,255,136,0.4)",
          }} />
        </div>

        {/* Title Row */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 20px 6px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontSize: 22, lineHeight: 1,
              filter: "drop-shadow(0 0 6px rgba(0,255,136,0.3))",
            }}>🐧</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#e8edf3", letterSpacing: 0.5 }}>
                Linux Learning Dashboard
              </h1>
              <span style={{ fontSize: 11, color: "#5a7a8f", fontWeight: 600 }}>
                {activeIndex + 1} of {lessons.length} · {activeLesson.title}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button onClick={goPrev} disabled={activeIndex === 0} style={headerNavBtn(activeIndex > 0)} title="Previous (Alt+←)">
              ‹ Prev
            </button>
            <button onClick={goNext} disabled={activeIndex === lessons.length - 1} style={headerNavBtn(activeIndex < lessons.length - 1)} title="Next (Alt+→)">
              Next ›
            </button>
          </div>
        </div>

        {/* Lesson Tab Bar */}
        <nav ref={navRef} aria-label="Linux lessons" style={{
          display: "flex", gap: 6, alignItems: "center", overflowX: "auto",
          padding: "4px 16px 10px", scrollBehavior: "smooth",
          msOverflowStyle: "none", scrollbarWidth: "none",
        }}>
          {lessons.map((lesson, i) => {
            const isActive = i === activeIndex;
            const isCompleted = i < activeIndex;
            return (
              <button
                key={lesson.id}
                type="button"
                data-active={isActive}
                title={lesson.title}
                onClick={() => navigateTo(i)}
                style={{
                  flex: "0 0 auto", display: "flex", alignItems: "center", gap: 6,
                  border: `1px solid ${isActive ? "#00ff88" : isCompleted ? "rgba(0,255,136,0.25)" : "#1e3a5f"}`,
                  background: isActive ? "rgba(0,255,136,0.12)" : isCompleted ? "rgba(0,255,136,0.04)" : "#111820",
                  color: isActive ? "#00ff88" : isCompleted ? "#4dcc7a" : "#7a9bb5",
                  padding: "6px 12px", fontSize: 12, fontWeight: 700, borderRadius: 6,
                  letterSpacing: 0.5, textTransform: "uppercase", cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 0 12px rgba(0,255,136,0.15), inset 0 0 12px rgba(0,255,136,0.05)" : "none",
                }}
              >
                <span style={{ fontSize: 14 }}>{lesson.icon}</span>
                {lesson.label}
                {isCompleted && <span style={{ fontSize: 10, opacity: 0.7 }}>✓</span>}
              </button>
            );
          })}
        </nav>
      </header>

      {/* ─── Lesson Content ─── */}
      <div
        ref={contentRef}
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning
            ? `translateY(${direction > 0 ? 20 : -20}px)`
            : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <ActiveComponent />
      </div>

      {/* ─── Bottom Navigation ─── */}
      <footer style={{
        display: "flex", alignItems: "stretch", justifyContent: "space-between",
        gap: 16, padding: "0 20px",
        borderTop: "1px solid #1e3a5f",
        background: "linear-gradient(180deg, #0c0f14 0%, #0a0c0f 100%)",
      }}>
        {activeIndex > 0 ? (
          <button onClick={goPrev} style={bottomNavBtnStyle("prev")}>
            <span style={{ fontSize: 20, opacity: 0.5 }}>←</span>
            <div style={{ textAlign: "left" }}>
              <span style={bottomNavLabel}>Previous</span>
              <span style={bottomNavTitle}>{lessons[activeIndex - 1].icon} {lessons[activeIndex - 1].title}</span>
            </div>
          </button>
        ) : <div style={{ flex: 1 }} />}

        {activeIndex < lessons.length - 1 ? (
          <button onClick={goNext} style={bottomNavBtnStyle("next")}>
            <div style={{ textAlign: "right" }}>
              <span style={bottomNavLabel}>Next</span>
              <span style={bottomNavTitle}>{lessons[activeIndex + 1].icon} {lessons[activeIndex + 1].title}</span>
            </div>
            <span style={{ fontSize: 20, opacity: 0.5 }}>→</span>
          </button>
        ) : (
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "20px 0", color: "#00ff88", fontSize: 14, fontWeight: 700,
            letterSpacing: 1, textTransform: "uppercase",
          }}>
            🎉 Curriculum Complete!
          </div>
        )}
      </footer>
    </div>
  );
}

/* ─── Style helpers ─── */

function headerNavBtn(enabled) {
  return {
    border: "1px solid " + (enabled ? "rgba(0,255,136,0.3)" : "#1e3a5f"),
    background: enabled ? "rgba(0,255,136,0.08)" : "transparent",
    color: enabled ? "#00ff88" : "#3a4f5f",
    padding: "5px 12px", fontSize: 11, fontWeight: 700, borderRadius: 6,
    cursor: enabled ? "pointer" : "default", letterSpacing: 0.5,
    transition: "all 0.2s ease", opacity: enabled ? 1 : 0.4,
  };
}

function bottomNavBtnStyle(dir) {
  return {
    flex: 1, display: "flex", alignItems: "center",
    gap: 14, padding: "18px 8px",
    background: "transparent", border: "none",
    cursor: "pointer", color: "#e8edf3",
    justifyContent: dir === "next" ? "flex-end" : "flex-start",
    transition: "background 0.2s ease",
  };
}

const bottomNavLabel = {
  display: "block", fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
  textTransform: "uppercase", color: "#5a7a8f", marginBottom: 3,
};

const bottomNavTitle = {
  display: "block", fontSize: 14, fontWeight: 600, color: "#00ff88",
};

export default App;
