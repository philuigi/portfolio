import { useEffect, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DocsLayout({ sections, children }) {
  const [active, setActive] = useState(sections?.[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [sections]);

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      {/* HEADER */}
      <header className="border-b border-neutral-800 bg-black/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="/"
            className="font-semibold text-lg text-white hover:text-emerald-400 transition-colors"
          >
            My Digital Portfolio
          </a>

          <a
            href="https://drive.google.com/file/d/1H1rJVa6p_neU360EedrwUHrdtviwodZR/view?usp=drive_link"
            target="_blank"
            className="text-sm text-neutral-300 hover:text-emerald-400 underline transition-colors"
          >
            Resume (PDF)
          </a>
        </div>
      </header>

      {/* MAIN GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 px-10 py-10">
        {/* SIDEBAR */}
        <aside className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-4 border-r border-neutral-800">
          <nav className="text-sm space-y-6">
            <div>
              <div className="text-xs uppercase text-emerald-500 mb-2 tracking-[0.2em] font-medium">
                Contents
              </div>

              <ul className="space-y-1.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        "block px-3 py-2 rounded-md transition-all duration-200 border-l-2",
                        active === s.id
                          ? "border-emerald-500 bg-neutral-900 text-emerald-400 font-semibold shadow-[inset_0_0_10px_rgba(16,185,129,0.15)]"
                          : "border-transparent text-neutral-400 hover:text-emerald-300 hover:bg-neutral-900/40 hover:border-emerald-500/40"
                      )}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className="prose prose-invert max-w-none w-full
  prose-headings:text-white
  prose-headings:font-semibold
  prose-headings:tracking-tight
  prose-p:text-neutral-300
  prose-p:leading-relaxed
  prose-li:text-neutral-300
  prose-strong:text-white
  prose-a:text-emerald-400 hover:prose-a:text-emerald-300
  prose-img:rounded-xl
"
        >
          {children}
        </main>
      </div>
    </div>
  );
}