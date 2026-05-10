import { useState } from "react";
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
  { id: "lab", label: "Lab", title: "Lab Setup and Test", Component: LinuxLabSetup },
  { id: "step1", label: "Step 1", title: "What Is Linux", Component: LinuxStep1 },
  { id: "step2", label: "Step 2", title: "Architecture Deep Dive", Component: LinuxStep2 },
  { id: "step3", label: "Step 3", title: "Filesystem Architecture", Component: LinuxStep3 },
  { id: "step4", label: "Step 4", title: "Users & Permissions", Component: LinuxStep4 },
  { id: "step5", label: "Step 5", title: "Processes & Services", Component: LinuxStep5 },
  { id: "step6", label: "Step 6", title: "Networking Deep Dive", Component: LinuxStep6 },
  { id: "step7", label: "Step 7", title: "Security Deep Understanding", Component: LinuxStep7 },
  { id: "step8", label: "Step 8", title: "Boot Process Deep Dive", Component: LinuxStep8 },
  { id: "step9", label: "Step 9", title: "Package Management", Component: LinuxStep9 },
  { id: "step10", label: "Step 10", title: "Logging, Monitoring & Troubleshooting", Component: LinuxStep10 },
  { id: "step12", label: "Step 12", title: "Risks, Benefits & Tradeoffs", Component: LinuxStep12 },
];

function App() {
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];
  const ActiveLesson = activeLesson.Component;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0c0f" }}>
      <nav
        aria-label="Linux lessons"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10000,
          display: "flex",
          gap: 8,
          alignItems: "center",
          overflowX: "auto",
          padding: "10px 16px",
          background: "rgba(10,12,15,0.96)",
          borderBottom: "1px solid #1e3a5f",
          fontFamily: "'Rajdhani', 'Segoe UI', sans-serif",
        }}
      >
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeLesson.id;

          return (
            <button
              key={lesson.id}
              type="button"
              title={lesson.title}
              onClick={() => setActiveLessonId(lesson.id)}
              style={{
                flex: "0 0 auto",
                border: `1px solid ${isActive ? "#00ff88" : "#1e3a5f"}`,
                background: isActive ? "rgba(0,255,136,0.12)" : "#111820",
                color: isActive ? "#00ff88" : "#7a9bb5",
                padding: "7px 12px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {lesson.label}
            </button>
          );
        })}
      </nav>
      <ActiveLesson />
    </div>
  );
}

export default App;
