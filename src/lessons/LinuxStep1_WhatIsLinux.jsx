import { useState } from "react";

/* ─────────────────────────────────────────────
   LINUX LEARNING LAB — STEP 1: What Is Linux?
   Dark Terminal / Cybersecurity Aesthetic
   Self-contained React component (no Tailwind needed)
   Author: Linux Learning Lab
   Usage:  import LinuxStep1 from "./LinuxStep1_WhatIsLinux";
           <LinuxStep1 />
───────────────────────────────────────────── */

// ── Inline styles (CSS-in-JS, no external deps) ──────────────────────────────
const css = {
  // tokens
  bg:      "#0a0c0f",
  bg2:     "#0d1117",
  bg3:     "#111820",
  panel:   "#131a22",
  panel2:  "#1a2332",
  border:  "#1e3a5f",
  border2: "#0f2540",
  green:   "#00ff88",
  green2:  "#00cc6a",
  cyan:    "#00d4ff",
  yellow:  "#ffd700",
  orange:  "#ff8c00",
  red:     "#ff3b3b",
  purple:  "#9d4edd",
  blue:    "#2979ff",
  text:    "#c8d8e8",
  text2:   "#7a9bb5",
  text3:   "#4a6a85",
  mono:    "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  sans:    "'Rajdhani', 'Segoe UI', sans-serif",
};

// ── Reusable styled primitives ────────────────────────────────────────────────

const Panel = ({ icon, title, num, children }) => (
  <div style={{
    background: css.panel,
    border: `1px solid ${css.border2}`,
    marginBottom: 14,
    overflow: "hidden",
  }}>
    <div style={{
      background: css.panel2,
      borderBottom: `1px solid ${css.border}`,
      padding: "8px 16px",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span style={{
        fontFamily: css.sans,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: css.cyan,
      }}>{title}</span>
      <span style={{
        marginLeft: "auto",
        fontSize: 10,
        color: css.text3,
        letterSpacing: 1,
        fontFamily: css.mono,
      }}>{num}</span>
    </div>
    <div style={{ padding: "18px 20px" }}>{children}</div>
  </div>
);

const ConceptBlock = ({ title, children, accent }) => {
  const color = {
    cyan:   css.cyan,
    green:  css.green,
    yellow: css.yellow,
    purple: css.purple,
    orange: css.orange,
  }[accent] || css.cyan;
  return (
    <div style={{
      background: css.bg3,
      border: `1px solid ${css.border2}`,
      borderLeft: `3px solid ${color}`,
      padding: 14,
    }}>
      <div style={{
        fontFamily: css.sans,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: "uppercase",
        color,
        marginBottom: 8,
      }}>{title}</div>
      <div style={{ color: css.text, fontSize: 12.5, lineHeight: 1.7, fontFamily: css.mono }}>
        {children}
      </div>
    </div>
  );
};

const Tag = ({ color, children }) => {
  const map = {
    green:  { bg: "rgba(0,255,136,0.12)",  text: css.green,  border: "rgba(0,255,136,0.3)" },
    cyan:   { bg: "rgba(0,212,255,0.10)",  text: css.cyan,   border: "rgba(0,212,255,0.3)" },
    yellow: { bg: "rgba(255,215,0,0.10)",  text: css.yellow, border: "rgba(255,215,0,0.3)" },
    purple: { bg: "rgba(157,78,221,0.12)", text: css.purple, border: "rgba(157,78,221,0.3)" },
    orange: { bg: "rgba(255,140,0,0.10)",  text: css.orange, border: "rgba(255,140,0,0.3)" },
  }[color] || {};
  return (
    <span style={{
      padding: "3px 10px",
      borderRadius: 2,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: 1,
      textTransform: "uppercase",
      fontFamily: css.sans,
      background: map.bg,
      color: map.text,
      border: `1px solid ${map.border}`,
    }}>{children}</span>
  );
};

const InfoBox = ({ variant = "info", children }) => {
  const isWarn = variant === "warn";
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      padding: "8px 12px",
      background: isWarn ? "rgba(255,215,0,0.06)" : "rgba(0,212,255,0.06)",
      borderLeft: `3px solid ${isWarn ? css.yellow : css.cyan}`,
      margin: "10px 0",
      fontSize: 12,
      color: css.text2,
      fontFamily: css.mono,
    }}>
      <span style={{ color: isWarn ? css.yellow : css.cyan, flexShrink: 0 }}>
        {isWarn ? "⚠" : "ℹ"}
      </span>
      <span>{children}</span>
    </div>
  );
};

const Divider = () => (
  <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${css.border}, transparent)`, margin: "12px 0" }} />
);

const Hl = ({ c, children }) => (
  <span style={{ color: c || css.green, fontWeight: 600 }}>{children}</span>
);

// ── DATA ─────────────────────────────────────────────────────────────────────

const CONCEPT_BLOCKS = [
  {
    accent: "cyan",
    title: "What is an Operating System?",
    body: (
      <>
        An <Hl>Operating System (OS)</Hl> is the master software layer that sits between
        your hardware and your applications. It manages every resource — CPU cycles, memory
        pages, disk I/O, network packets — and provides a controlled, abstracted interface
        so programs don't talk to hardware directly.
        <Divider />
        Without an OS: every program would need to know exact hardware specs.
        With an OS: programs call standardized functions — the OS handles the rest.
      </>
    ),
  },
  {
    accent: "green",
    title: "What is the Linux Kernel?",
    body: (
      <>
        The <Hl>Linux kernel</Hl> is the core engine — written in C by Linus Torvalds in
        1991. It is a <Hl>monolithic kernel</Hl>, meaning all core OS functions (process
        scheduling, memory management, device drivers, file systems) run in a single
        privileged address space (kernel space).
        <Divider />
        The kernel is <em>not</em> the full OS — it's the brain. Everything else is built on top.
      </>
    ),
  },
  {
    accent: "yellow",
    title: "GNU/Linux — The Full Picture",
    body: (
      <>
        Linux = <Hl c={css.yellow}>Kernel only</Hl>.<br />
        GNU/Linux = Kernel + GNU userland tools (bash, coreutils, glibc, gcc…)<br /><br />
        When you use Ubuntu, Fedora, or Kali — you're using the Linux kernel + GNU tools +
        a distribution's package ecosystem, configs, and desktop/server software on top.
      </>
    ),
  },
  {
    accent: "purple",
    title: "What is a Linux Distribution?",
    body: (
      <>
        A <Hl c={css.purple}>distro</Hl> packages the Linux kernel with: a package manager,
        default software, configuration files, init system (systemd), and target-specific tools.
        <br /><br />
        Examples: Ubuntu (general), RHEL (enterprise servers), Kali (penetration testing),
        Alpine (containers), Arch (custom builds).
      </>
    ),
  },
  {
    accent: "orange",
    title: "Open Source & Licensing",
    body: (
      <>
        Linux is released under <Hl c={css.orange}>GPLv2</Hl> (GNU General Public License).
        Anyone can: view, modify, and redistribute the source — as long as derivative works
        remain GPL-licensed.
        <br /><br />
        This enabled an entire ecosystem: Android (Linux kernel), AWS EC2, Docker, embedded
        IoT devices, supercomputers — all built on freely available source.
      </>
    ),
  },
  {
    accent: "cyan",
    title: "Why Linux Matters",
    body: (
      <>
        <Hl>96.3%</Hl> of top web servers run Linux.<br />
        <Hl>100%</Hl> of the top 500 supercomputers run Linux.<br />
        <Hl>~72%</Hl> of cloud infrastructure runs Linux.<br />
        <Hl>~90%</Hl> of cybersecurity tools target/run on Linux.
        <Divider />
        Linux is the default infrastructure layer of the modern internet.
      </>
    ),
  },
];

const ARCH_LAYERS = [
  {
    label: "USER APPS",
    labelColor: "#5599ff",
    boxBorder: "rgba(41,121,255,0.5)",
    boxBg:     "rgba(41,121,255,0.07)",
    nameColor: "#5599ff",
    name: "Application Layer",
    sub: "Programs running in user space — no direct hardware access",
    chips: ["bash", "nginx", "python", "ssh client", "vim", "firefox"],
    arrow: "↕ System Call Interface (ABI Boundary)",
  },
  {
    label: "SHELL/LIBS",
    labelColor: css.cyan,
    boxBorder: "rgba(0,212,255,0.5)",
    boxBg:     "rgba(0,212,255,0.07)",
    nameColor: css.cyan,
    name: "GNU C Library (glibc) + Shell",
    sub: "Wraps system calls into friendly functions. Shell interprets commands.",
    chips: ["glibc", "bash", "zsh", "libpthread", "libssl"],
    arrow: "↕ System Calls: open(), read(), write(), fork(), exec(), mmap()…",
  },
  {
    label: "KERNEL",
    labelColor: css.yellow,
    boxBorder: "rgba(255,215,0,0.6)",
    boxBg:     "rgba(255,215,0,0.08)",
    nameColor: css.yellow,
    name: "Linux Kernel (Privileged / Ring 0)",
    sub: "The monolithic core — runs in kernel space with full hardware access",
    chips: ["Process Mgr", "Memory Mgr", "VFS", "Net Stack", "IPC", "Security (LSM)", "Device Drivers", "Scheduler"],
    chipColor: css.yellow,
    arrow: "↕ Hardware Abstraction / IRQ / DMA",
  },
  {
    label: "HARDWARE",
    labelColor: css.orange,
    boxBorder: "rgba(255,140,0,0.5)",
    boxBg:     "rgba(255,140,0,0.07)",
    nameColor: css.orange,
    name: "Physical Hardware",
    sub: "CPU, RAM, Storage, NIC, GPU, USB, Sensors",
    chips: ["CPU", "RAM", "NVMe/SSD", "NIC", "GPU", "BIOS/UEFI"],
  },
];

const KERNEL_SUBSYSTEMS = [
  { icon: "⚙", name: "Process Scheduler", desc: "CFS — Completely Fair Scheduler. Assigns CPU time." },
  { icon: "◫", name: "Memory Manager",    desc: "Virtual memory, paging, swap, mmap." },
  { icon: "📂", name: "VFS Layer",         desc: "Abstracts ext4, xfs, tmpfs, proc, sys." },
  { icon: "🌐", name: "Network Stack",     desc: "TCP/IP, sockets, netfilter, iptables." },
  { icon: "🔒", name: "LSM (Security)",    desc: "SELinux, AppArmor, capabilities." },
  { icon: "🔌", name: "Device Drivers",    desc: "NIC, block, USB, char drivers." },
];

const WORKFLOW_STEPS = [
  {
    title: "User types command in terminal",
    desc: <>You type <code>ls -la /etc</code> and press Enter. The terminal emulator captures your keystrokes.</>,
    cmd:  "$ ls -la /etc",
  },
  {
    title: "Shell parses the command",
    desc: <>Bash/Zsh tokenizes input: command=<Hl>ls</Hl>, flags=<Hl>-la</Hl>, arg=<Hl>/etc</Hl>. Shell looks up <code>ls</code> in PATH → finds <code>/bin/ls</code>.</>,
  },
  {
    title: "Shell calls fork() + exec()",
    desc: <>Shell issues <code>fork()</code> system call → kernel creates a child process. Then <code>execve("/bin/ls", ["ls","-la","/etc"], envp)</code> → kernel loads the <code>ls</code> binary into the child process memory.</>,
  },
  {
    title: "Kernel executes ls — permission & syscall chain",
    desc: <><code>ls</code> calls <code>openat()</code> → kernel checks DAC permissions on <code>/etc</code>. Then <code>getdents64()</code> → kernel reads directory entries from ext4. Returns data to user-space buffer.</>,
  },
  {
    title: "Output written to stdout",
    desc: <><code>ls</code> formats the directory listing and calls <code>write(1, buffer, len)</code> → kernel writes to fd 1 (stdout) → terminal displays output on screen.</>,
  },
  {
    title: "Process exits, shell resumes",
    desc: <><code>ls</code> calls <code>exit(0)</code>. Kernel cleans up process resources. Shell's <code>wait()</code> returns, new prompt appears. Round trip: typically &lt;5ms.</>,
  },
];

const TERMINAL_LINES = [
  { type: "section", text: "──── IDENTIFY THE KERNEL ────" },
  { type: "prompt",  cmd:  "uname -r" },
  { type: "out",     text: "6.8.0-49-generic" },
  { type: "prompt",  cmd:  "uname -a" },
  { type: "out",     text: "Linux lab 6.8.0-49-generic #49-Ubuntu SMP x86_64 GNU/Linux" },

  { type: "section", text: "──── DISTRO IDENTIFICATION ────" },
  { type: "prompt",  cmd:  "cat /etc/os-release" },
  { type: "cyan",    text: 'NAME="Ubuntu"' },
  { type: "cyan",    text: 'VERSION="24.04.1 LTS (Noble Numbat)"' },
  { type: "cyan",    text: "ID=ubuntu" },
  { type: "cyan",    text: "ID_LIKE=debian" },

  { type: "section", text: "──── CPU ARCHITECTURE ────" },
  { type: "prompt",  cmd:  'lscpu | grep -E "Architecture|CPU\\(s\\)|Model name"' },
  { type: "out",     text: "Architecture:   x86_64" },
  { type: "out",     text: "CPU(s):         4" },
  { type: "out",     text: "Model name:     Intel(R) Core(TM) i7-12700K" },

  { type: "section", text: "──── KERNEL MODULES (LOADED DRIVERS) ────" },
  { type: "prompt",  cmd:  "lsmod | head -5" },
  { type: "out",     text: "Module                  Size  Used by" },
  { type: "out",     text: "nf_conntrack          172032  2 nf_nat,iptable_nat" },
  { type: "out",     text: "ext4                  970752  1" },
  { type: "out",     text: "nvidia               3456000  45" },

  { type: "section", text: "──── SYSTEM CALLS MADE BY ls (strace) ────" },
  { type: "prompt",  cmd:  "strace -c ls /etc 2>&1 | tail -6" },
  { type: "out",     text: "% time   seconds  calls  syscall" },
  { type: "out",     text: "──────────────────────────────────" },
  { type: "yellow",  text: " 45.2    0.000124    342  getdents64" },
  { type: "yellow",  text: " 22.1    0.000061     12  openat" },
  { type: "yellow",  text: " 18.3    0.000050      8  fstat" },

  { type: "section", text: "──── PROCESS TREE ────" },
  { type: "prompt",  cmd:  "pstree -p | head -6" },
  { type: "out",     text: "systemd(1)─┬─cron(892)" },
  { type: "out",     text: "           ├─sshd(1102)───sshd(2341)───bash(2342)" },
  { type: "out",     text: "           ├─nginx(1500)─┬─nginx(1501)" },
  { type: "out",     text: "           └─dockerd(1890)───containerd(1922)" },
];

const USE_CASES = [
  { icon: "🌐", name: "Web Servers",        desc: "Apache, Nginx, Caddy run on Linux. Powers 96%+ of public web servers.",               stat: "96.3% market share", color: css.green },
  { icon: "☁️", name: "Cloud Infrastructure", desc: "AWS EC2, GCP Compute, Azure VMs default to Linux. K8s nodes run Linux.",             stat: "~72% cloud VMs",     color: css.cyan  },
  { icon: "🔒", name: "Cybersecurity",      desc: "Kali Linux for pentesting. nmap, Wireshark, Metasploit all run on Linux.",            stat: "~90% security tools", color: css.red   },
  { icon: "🐳", name: "Containers",         desc: "Docker uses Linux namespaces + cgroups. All container hosts run Linux kernel.",        stat: "100% of containers", color: css.blue  },
  { icon: "⚡", name: "Supercomputers",     desc: "All top 500 supercomputers in the world run Linux.",                                   stat: "500/500 top HPC",   color: css.yellow },
  { icon: "📱", name: "Embedded / IoT",     desc: "Routers, smart TVs, Android phones (Linux kernel), industrial PLCs.",                 stat: "Billions of devices",color: css.orange },
];

const MARKET_BARS = [
  { label: "Web Servers",    pct: 96,  color: css.green  },
  { label: "Cloud VMs",      pct: 72,  color: css.cyan   },
  { label: "Supercomputers", pct: 100, color: css.yellow },
  { label: "Desktop PCs",    pct: 4,   color: css.purple },
];

const COMPARE_ROWS = [
  ["Kernel Type",           "Monolithic — all subsystems in kernel space, fast IPC", "Hybrid — NT kernel; some services in user-mode (CSRSS, LSASS)"],
  ["Kernel Written In",     "C + ASM (GCC)",                                         "C, C++ (MSVC)"],
  ["Source Code",           "✓ Open source (GPLv2) — fully auditable",               "✗ Closed source — proprietary (limited WDK access)"],
  ["File System",           "ext4, xfs, btrfs, zfs, tmpfs, proc, sysfs",             "NTFS, ReFS, FAT32, exFAT"],
  ["Path Separator",        "/ (forward slash)",                                      "\\ (backslash) — legacy DOS heritage"],
  ["Permissions Model",     "DAC (rwx) + ACLs + Capabilities + LSM (SELinux/AppArmor)", "NTFS ACLs + UAC (User Account Control)"],
  ["Root / Admin",          "root (UID 0) — explicit privilege escalation via sudo",  "SYSTEM / Administrator — UAC elevation prompt"],
  ["Process Scheduler",     "CFS (Completely Fair Scheduler) + real-time classes",    "Priority-based preemptive + UMS"],
  ["Package Management",    "apt/dnf/pacman — centralized signed repositories",       "winget, MSI, .exe installers — no universal repo"],
  ["Configuration",         "Plain text files in /etc — human readable, VCS friendly","Registry (binary hive) + XML files + GUI"],
  ["Services / Init",       "systemd (units, targets, journald)",                     "Windows Services (SCM), Task Scheduler"],
  ["Logging",               "journalctl, syslog, /var/log/* — plain text + structured","Event Viewer (.evtx binary format)"],
  ["Networking Config",     "ip, nmcli, /etc/network/interfaces, netplan",            "NCPA, netsh, PowerShell, Registry"],
  ["Firewall",              "iptables / nftables / ufw — kernel netfilter",           "Windows Defender Firewall (wf.msc)"],
  ["Remote Access",         "SSH (default, certificate-based) — encrypted by design", "RDP (GUI-based) — historically had many CVEs"],
  ["Automation",            "Bash, Python, Ansible, cron — native scripting everything","PowerShell, Task Scheduler, GPO"],
  ["Attack Surface",        "Smaller default install, no GUI required, granular controls","Larger by default — many services auto-enabled"],
  ["Malware Prevalence",    "Lower (permission model, open source)",                  "Higher historical target (90%+ malware targets Windows)"],
  ["Memory (idle)",         "~80–200 MB (headless server)",                           "~1.5–2.5 GB (minimal install)"],
  ["License Cost",          "✓ Free (most distros)",                                  "✗ $99–$499+ per license"],
];

const RED_TEAM = [
  "Kernel exploits — privilege escalation via kernel bugs (e.g., Dirty COW CVE-2016-5195)",
  "SUID binary abuse — misconfigured setuid programs run as root",
  "Weak SSH — password auth, no key hardening, default port 22",
  "Misconfigured sudo — NOPASSWD rules or wildcard commands",
  "World-writable scripts in cron — attacker modifies, root executes",
  "PATH hijacking — malicious binary before system binary in PATH",
  "Exposed services — Redis, Memcached, Elasticsearch open to internet",
];

const BLUE_TEAM = [
  "SELinux / AppArmor — mandatory access control, confines processes",
  "Principle of least privilege — limit sudo, use capabilities not full root",
  "SSH hardening — key-only auth, port knocking, fail2ban",
  "Audit framework — auditd captures all system calls, file access",
  "File integrity monitoring — AIDE, Tripwire detect unauthorized changes",
  "Unattended upgrades — automated kernel/package patching",
  "Firewall — nftables default-deny, allow only required ports",
];

const CHECKLIST = [
  { text: "Can you identify the kernel version and distro of any Linux system?",                               domain: "KNOW-HOW", dc: "green"  },
  { text: "Do you understand the user-space / kernel-space boundary and why it exists?",                       domain: "ARCH",     dc: "cyan"   },
  { text: "Can you explain what a system call is and give 5 examples (open, read, write, fork, exec)?",        domain: "SYSCALL",  dc: "yellow" },
  { text: "Do you understand the difference between a kernel and a distribution?",                             domain: "CONCEPT",  dc: "green"  },
  { text: "Can you identify which Linux family a target uses from package manager and file paths?",            domain: "AUDIT",    dc: "orange" },
  { text: "Do you understand why Linux dominates servers, cloud, and containers?",                             domain: "CONTEXT",  dc: "purple" },
  { text: "Can you explain the monolithic vs hybrid kernel difference between Linux and Windows NT?",          domain: "COMPARE",  dc: "cyan"   },
  { text: "Run uname -a, lscpu, lsmod, cat /etc/os-release on a real system and interpret the output.",       domain: "LAB",      dc: "green"  },
];

// ── Main Component ────────────────────────────────────────────────────────────

export default function LinuxStep1() {
  const [activeTab, setActiveTab] = useState("arch");

  return (
    <div style={{
      background: css.bg,
      color: css.text,
      fontFamily: css.mono,
      fontSize: 13,
      lineHeight: 1.6,
      minHeight: "100vh",
      padding: "20px 16px",
    }}>
      {/* Google Font import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Rajdhani:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0c0f; }
        code { background: rgba(255,255,255,0.07); padding: 1px 5px; border-radius: 2px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #00d4ff; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes pulse { 0%,100%{opacity:1; box-shadow:0 0 6px #00ff88} 50%{opacity:0.5; box-shadow:0 0 14px #00ff88} }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{
          background: "linear-gradient(135deg, #0d1a2e 0%, #0a1520 100%)",
          border: `1px solid ${css.border}`,
          borderTop: `3px solid ${css.green}`,
          padding: "20px 24px",
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* glow accent */}
          <div style={{
            position: "absolute", right: -60, top: -60,
            width: 200, height: 200,
            background: "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              {/* pulse badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: css.green,
                  animation: "pulse 2s infinite",
                }} />
                <span style={{ fontFamily: css.sans, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: css.green }}>
                  STEP 01 / MODULE 1 ● ACTIVE
                </span>
              </div>

              <h1 style={{ fontFamily: css.sans, fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: 1, lineHeight: 1.2 }}>
                What Exactly Is <span style={{ color: css.green }}>Linux</span>?
              </h1>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                <Tag color="green">● Beginner</Tag>
                <Tag color="cyan">⊞ Operating Systems</Tag>
                <Tag color="yellow">⊛ System Architecture</Tag>
                <Tag color="purple">⬡ Security</Tag>
                <Tag color="orange">⊕ Enterprise</Tag>
              </div>
            </div>

            <div style={{ textAlign: "right", fontSize: 11, color: css.text3, lineHeight: 1.9, fontFamily: css.mono }}>
              <div>HOST: <span style={{ color: css.cyan }}>linux-lab-01</span></div>
              <div>KERNEL: <span style={{ color: css.cyan }}>6.x.x-generic</span></div>
              <div>ARCH: <span style={{ color: css.cyan }}>x86_64</span></div>
              <div>UPTIME: <span style={{ color: css.cyan }}>∞</span></div>
              <div style={{ marginTop: 6, fontSize: 10, color: "#1e6a3a" }}>▓▓▓▓▓▓▓░░░ LESSON LOADED</div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            PANEL 01 — CONCEPT EXPLANATION
        ═══════════════════════════════════════════ */}
        <Panel icon="◈" title="Concept Explanation" num="PANEL 01">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            {CONCEPT_BLOCKS.map((b, i) => (
              <ConceptBlock key={i} title={b.title} accent={b.accent}>{b.body}</ConceptBlock>
            ))}
          </div>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 02 — ARCHITECTURE DIAGRAM
        ═══════════════════════════════════════════ */}
        <Panel icon="◫" title="Linux System Architecture — Layer Model" num="PANEL 02">
          <div style={{ background: css.bg, border: `1px solid ${css.border2}`, padding: 20 }}>
            {/* Layers */}
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              {ARCH_LAYERS.map((layer, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    {/* label */}
                    <div style={{
                      width: 120, minWidth: 120,
                      display: "flex", alignItems: "center", justifyContent: "flex-end",
                      paddingRight: 14,
                      fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase",
                      color: layer.labelColor,
                      fontFamily: css.sans, fontWeight: 600,
                    }}>{layer.label}</div>
                    {/* box */}
                    <div style={{
                      flex: 1,
                      border: `1px solid ${layer.boxBorder}`,
                      background: layer.boxBg,
                      padding: "10px 16px",
                      textAlign: "center",
                    }}>
                      <div style={{ fontFamily: css.sans, fontSize: 13, fontWeight: 700, color: layer.nameColor, marginBottom: 2, letterSpacing: 1 }}>
                        {layer.name}
                      </div>
                      <div style={{ fontSize: 11, color: css.text2 }}>{layer.sub}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
                        {layer.chips.map((c, j) => (
                          <span key={j} style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            padding: "2px 8px", fontSize: 10,
                            color: layer.chipColor || css.text2,
                            borderRadius: 2,
                          }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* arrow between layers */}
                  {layer.arrow && (
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      height: 26, color: css.text3, fontSize: 12,
                      paddingLeft: 120,
                    }}>{layer.arrow}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Kernel Internals Box */}
            <div style={{
              border: `2px solid rgba(255,215,0,0.5)`,
              background: "rgba(255,215,0,0.04)",
              padding: 16, marginTop: 20,
              maxWidth: 700, margin: "20px auto 0",
            }}>
              <div style={{
                fontFamily: css.sans, fontWeight: 700, fontSize: 13,
                letterSpacing: 2, textTransform: "uppercase", color: css.yellow,
                textAlign: "center", marginBottom: 12,
                paddingBottom: 8, borderBottom: "1px solid rgba(255,215,0,0.2)",
              }}>🔶 Kernel Internal Subsystems</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8 }}>
                {KERNEL_SUBSYSTEMS.map((k, i) => (
                  <div key={i} style={{
                    background: "rgba(255,215,0,0.06)",
                    border: "1px solid rgba(255,215,0,0.2)",
                    padding: "8px 10px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 18, marginBottom: 3 }}>{k.icon}</div>
                    <div style={{ fontFamily: css.sans, fontWeight: 600, fontSize: 11, color: css.yellow }}>{k.name}</div>
                    <div style={{ fontSize: 10, color: css.text3, marginTop: 2 }}>{k.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <InfoBox>
              <strong style={{ color: css.cyan }}>Key principle:</strong> User-space programs CANNOT directly access hardware.
              They must ask the kernel via <strong>system calls</strong>. This isolation is the foundation of Linux security and stability.
            </InfoBox>
          </div>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 03 — WORKFLOW
        ═══════════════════════════════════════════ */}
        <Panel icon="⇢" title="Workflow — How a Command Executes in Linux" num="PANEL 03">
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", position: "relative" }}>
                {/* vertical line */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div style={{
                    position: "absolute",
                    left: 15, top: 32, bottom: -10,
                    width: 1,
                    background: `linear-gradient(to bottom, ${css.green}, transparent)`,
                  }} />
                )}
                {/* dot */}
                <div style={{
                  width: 32, minWidth: 32, height: 32,
                  borderRadius: "50%",
                  border: `2px solid ${css.green}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: css.green,
                  background: "rgba(0,255,136,0.08)", flexShrink: 0,
                  fontFamily: css.sans,
                }}>{i + 1}</div>
                {/* content */}
                <div style={{
                  flex: 1, background: css.bg3,
                  border: `1px solid ${css.border2}`,
                  padding: "10px 14px", marginBottom: 10,
                }}>
                  <div style={{ fontFamily: css.sans, fontWeight: 600, fontSize: 13, color: css.green, marginBottom: 3 }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 11.5, color: css.text2 }}>{step.desc}</div>
                  {step.cmd && (
                    <div style={{
                      marginTop: 6, background: css.bg,
                      padding: "4px 10px", fontSize: 11,
                      color: css.cyan, borderLeft: `2px solid ${css.cyan}`,
                      fontFamily: css.mono,
                    }}>{step.cmd}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 04 — TERMINAL SIMULATION
        ═══════════════════════════════════════════ */}
        <Panel icon="▶" title="Terminal Simulation — Exploring the System" num="PANEL 04">
          <div style={{ background: "#050810", border: `1px solid #1a2d45`, overflow: "hidden" }}>
            {/* macOS-style bar */}
            <div style={{
              background: "#0d1520", borderBottom: "1px solid #1a2d45",
              padding: "7px 14px", display: "flex", alignItems: "center", gap: 8,
            }}>
              {[{ bg: "#ff5f57" }, { bg: "#febc2e" }, { bg: "#28c840" }].map((d, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: d.bg }} />
              ))}
              <span style={{ marginLeft: 8, fontSize: 11, color: css.text3, letterSpacing: 1, fontFamily: css.sans }}>
                root@linux-lab:~ — bash — 120×40
              </span>
            </div>
            <div style={{ padding: "14px 18px", fontSize: 12, lineHeight: 1.8, fontFamily: css.mono }}>
              {TERMINAL_LINES.map((line, i) => {
                if (line.type === "section") return (
                  <div key={i} style={{
                    display: "block", margin: "10px 0 4px",
                    color: css.text3, fontSize: 10, letterSpacing: 2,
                    textTransform: "uppercase",
                    borderTop: "1px solid #1a2d45", paddingTop: 10,
                  }}>{line.text}</div>
                );
                if (line.type === "prompt") return (
                  <div key={i} style={{ display: "block" }}>
                    <span style={{ color: css.green }}>root@lab:~# </span>
                    <span style={{ color: "#fff" }}>{line.cmd}</span>
                  </div>
                );
                const color = { out: css.text2, cyan: css.cyan, yellow: css.yellow, err: css.red }[line.type] || css.text2;
                return <div key={i} style={{ display: "block", color }}>{line.text}</div>;
              })}
            </div>
          </div>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 05 — WHERE IS LINUX USED
        ═══════════════════════════════════════════ */}
        <Panel icon="◎" title="Where Linux Is Deployed — Real-World Domains" num="PANEL 05">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
            {USE_CASES.map((u, i) => (
              <div key={i} style={{
                background: css.bg3, border: `1px solid ${css.border2}`,
                padding: "14px 12px", textAlign: "center",
              }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{u.icon}</div>
                <div style={{ fontFamily: css.sans, fontWeight: 700, fontSize: 13, color: css.text, marginBottom: 4 }}>{u.name}</div>
                <div style={{ fontSize: 10.5, color: css.text3, lineHeight: 1.5 }}>{u.desc}</div>
                <div style={{ marginTop: 8, fontSize: 11, fontWeight: 700, fontFamily: css.sans, color: u.color }}>{u.stat}</div>
              </div>
            ))}
          </div>

          {/* Market bars */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontFamily: css.sans, fontSize: 11, color: css.text3, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>
              Linux vs Windows market share by domain
            </div>
            {MARKET_BARS.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, margin: "5px 0", fontSize: 11.5 }}>
                <span style={{ width: 120, minWidth: 120, color: css.text3, fontFamily: css.sans, fontSize: 11 }}>{b.label}</span>
                <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                  <div style={{ width: `${b.pct}%`, height: "100%", background: b.color }} />
                </div>
                <span style={{ width: 40, textAlign: "right", color: b.color, fontSize: 11 }}>{b.pct}%</span>
              </div>
            ))}
            <div style={{ fontSize: 10, color: css.text3, marginTop: 8 }}>Source: w3techs, Top500.org, StatCounter</div>
          </div>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 06 — DISTRO TREE
        ═══════════════════════════════════════════ */}
        <Panel icon="⊞" title="Linux Distribution Ecosystem" num="PANEL 06">
          <div style={{ background: css.bg, border: `1px solid ${css.border2}`, padding: "16px 20px", fontFamily: css.mono, fontSize: 12, color: css.text2, lineHeight: 1.9 }}>
            {[
              { indent: 0, text: "🐧 Linux Kernel (Linus Torvalds, 1991)", color: css.yellow, bold: true, size: 14 },
              { indent: 1, text: "│" },
              { indent: 1, text: "├── Debian Family", color: css.cyan, bold: true },
              { indent: 2, text: "├── Ubuntu — general purpose, desktop & server" },
              { indent: 2, text: "├── Kali Linux — penetration testing / offensive security" },
              { indent: 2, text: "├── Parrot OS — security & forensics" },
              { indent: 2, text: "└── Raspberry Pi OS — embedded / IoT" },
              { indent: 1, text: "│" },
              { indent: 1, text: "├── Red Hat Family", color: css.cyan, bold: true },
              { indent: 2, text: "├── RHEL — enterprise production servers (paid)" },
              { indent: 2, text: "├── CentOS / AlmaLinux / Rocky — RHEL-compatible free" },
              { indent: 2, text: "└── Fedora — cutting-edge, upstream for RHEL" },
              { indent: 1, text: "│" },
              { indent: 1, text: "├── SUSE Family", color: css.cyan, bold: true },
              { indent: 2, text: "├── SLES — SUSE Linux Enterprise Server" },
              { indent: 2, text: "└── openSUSE — community version" },
              { indent: 1, text: "│" },
              { indent: 1, text: "├── Arch Family", color: css.cyan, bold: true },
              { indent: 2, text: "├── Arch Linux — rolling release, manual config" },
              { indent: 2, text: "└── Manjaro — user-friendly Arch" },
              { indent: 1, text: "│" },
              { indent: 1, text: "└── Minimal / Specialized", color: css.cyan, bold: true },
              { indent: 2, text: "├── Alpine Linux — ultra-small, container base images" },
              { indent: 2, text: "├── Android — Linux kernel, mobile" },
              { indent: 2, text: "└── CoreOS / Flatcar — container-optimized clusters" },
            ].map((row, i) => (
              <div key={i} style={{ paddingLeft: row.indent * 20, color: row.color || css.text2, fontWeight: row.bold ? 700 : 400, fontSize: row.size || 12 }}>
                {row.text}
              </div>
            ))}
          </div>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 07 — LINUX VS WINDOWS
        ═══════════════════════════════════════════ */}
        <Panel icon="⇄" title="Linux vs Windows — Deep Technical Comparison" num="PANEL 07">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr>
                  {[
                    { label: "Dimension",    color: css.text3 },
                    { label: "🐧 Linux",     color: css.yellow },
                    { label: "🪟 Windows",   color: css.blue },
                  ].map((h, i) => (
                    <th key={i} style={{
                      background: css.panel2, padding: "10px 14px", textAlign: "left",
                      fontFamily: css.sans, fontSize: 12, fontWeight: 600,
                      letterSpacing: 1.5, textTransform: "uppercase",
                      borderBottom: `2px solid ${css.border}`, color: h.color,
                    }}>{h.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([dim, lin, win], i) => (
                  <tr key={i}>
                    <td style={{ padding: "9px 14px", borderBottom: `1px solid ${css.border2}`, color: css.text, fontFamily: css.sans, fontWeight: 500, fontSize: 12, verticalAlign: "top" }}>
                      {dim}
                    </td>
                    <td style={{ padding: "9px 14px", borderBottom: `1px solid ${css.border2}`, color: lin.startsWith("✓") ? css.green : lin.startsWith("✗") ? css.red : css.text2, verticalAlign: "top" }}>
                      {lin}
                    </td>
                    <td style={{ padding: "9px 14px", borderBottom: `1px solid ${css.border2}`, color: win.startsWith("✗") ? css.red : css.text2, verticalAlign: "top" }}>
                      {win}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 08 — SECURITY
        ═══════════════════════════════════════════ */}
        <Panel icon="⚠" title="Security Perspective — Linux Threat Model & Defenses" num="PANEL 08">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
            {/* Red Team */}
            <div style={{ background: css.bg3, border: `1px solid ${css.border2}`, padding: 14 }}>
              <div style={{ fontFamily: css.sans, fontSize: 11, letterSpacing: 2, fontWeight: 700, textTransform: "uppercase", color: css.red, marginBottom: 8 }}>
                ⛔ Attack Vectors (Red Team)
              </div>
              <ul style={{ listStyle: "none" }}>
                {RED_TEAM.map((item, i) => (
                  <li key={i} style={{ padding: "4px 0", fontSize: 12, color: css.text2, display: "flex", gap: 8, borderBottom: `1px solid ${css.border2}` }}>
                    <span style={{ color: css.red, flexShrink: 0 }}>›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Blue Team */}
            <div style={{ background: css.bg3, border: `1px solid ${css.border2}`, padding: 14 }}>
              <div style={{ fontFamily: css.sans, fontSize: 11, letterSpacing: 2, fontWeight: 700, textTransform: "uppercase", color: css.green, marginBottom: 8 }}>
                ✔ Defensive Controls (Blue Team)
              </div>
              <ul style={{ listStyle: "none" }}>
                {BLUE_TEAM.map((item, i) => (
                  <li key={i} style={{ padding: "4px 0", fontSize: 12, color: css.text2, display: "flex", gap: 8, borderBottom: `1px solid ${css.border2}` }}>
                    <span style={{ color: css.green, flexShrink: 0 }}>›</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <InfoBox variant="warn">
            <strong style={{ color: css.yellow }}>Auditor note:</strong> On Linux, misconfigurations are more dangerous than malware.
            Check permissions, sudo rules, SUID binaries, and open ports first.
            Run <code>find / -perm -4000 2&gt;/dev/null</code> to enumerate SUID binaries on any new system assessment.
          </InfoBox>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 09 — AUDITOR CHECKLIST
        ═══════════════════════════════════════════ */}
        <Panel icon="✔" title="Auditor / Security Checklist — Step 1 Verification" num="PANEL 09">
          <ul style={{ listStyle: "none" }}>
            {CHECKLIST.map((item, i) => (
              <li key={i} style={{
                padding: "7px 0", borderBottom: `1px solid ${css.border2}`,
                fontSize: 12.5, display: "flex", alignItems: "flex-start",
                gap: 10, color: css.text2,
              }}>
                <div style={{
                  width: 16, height: 16, minWidth: 16,
                  border: `1px solid ${css.green}`,
                  background: "rgba(0,255,136,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, color: css.green, marginTop: 1, flexShrink: 0,
                }}>✓</div>
                <span style={{ flex: 1 }}>{item.text}</span>
                <Tag color={item.dc}>{item.domain}</Tag>
              </li>
            ))}
          </ul>
        </Panel>

        {/* ═══════════════════════════════════════════
            PANEL 10 — SUMMARY
        ═══════════════════════════════════════════ */}
        <Panel icon="◉" title="Summary — Step 1 Complete" num="PANEL 10">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 14 }}>
            {[
              {
                label: "What You Learned",
                val: "Linux = kernel + GNU tools + distro layer. The kernel is monolithic, runs in Ring 0, manages all hardware via system calls. User space is isolated.",
              },
              {
                label: "Why It Matters",
                val: "Every cloud VM, Docker container, K8s node, web server, and security tool runs on this architecture. Understanding it is foundational for admin, security, and auditing.",
              },
              {
                label: "Where It's Used",
                val: "96% of web servers, 100% of supercomputers, all containers, most cloud infra, embedded IoT, Android phones, and all serious security tooling.",
              },
            ].map((s, i) => (
              <div key={i} style={{ background: css.bg3, border: `1px solid ${css.border2}`, padding: 14 }}>
                <div style={{ fontFamily: css.sans, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600, color: css.text3, marginBottom: 6 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: css.text, lineHeight: 1.6 }}>{s.val}</div>
              </div>
            ))}
          </div>

          {/* Next step banner */}
          <div style={{
            background: "linear-gradient(135deg, rgba(0,255,136,0.08), rgba(0,212,255,0.05))",
            border: `1px solid rgba(0,255,136,0.3)`,
            padding: "14px 18px",
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 10,
          }}>
            <div>
              <div style={{ fontFamily: css.sans, fontWeight: 600, fontSize: 14, color: css.green }}>
                ▶ Next: Step 2 — Linux Architecture Deep Dive
              </div>
              <div style={{ fontSize: 11, color: css.text3, marginTop: 2 }}>
                Kernel internals · Process management · Memory management · VFS · IPC · Scheduling · Boot sequence · systemd
              </div>
            </div>
            <div style={{
              background: css.bg, border: `1px solid ${css.border}`,
              padding: "6px 16px", fontSize: 12, color: css.green,
              cursor: "pointer", fontFamily: css.mono,
            }}>
              $ Start Step 2 →
            </div>
          </div>
        </Panel>

      </div>
    </div>
  );
}
