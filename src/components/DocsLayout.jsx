import { useEffect, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DocsLayout({ sections, children }) {
  const [active, setActive] = useState(sections?.[0]?.id ?? "");
  const [menuOpen, setMenuOpen] = useState(false);

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
          {/* BRAND */}
          <a
            href="/"
            className="font-semibold text-lg text-white hover:text-emerald-400 transition-colors"
          >
            My Digital Portfolio
          </a>

          <div className="flex items-center gap-4">
<a
  href="https://drive.google.com/file/d/1H1rJVa6p_neU360EedrwUHrdtviwodZR/view?usp=drive_link"
  target="_blank"
  className="inline-block px-4 py-1.5 text-sm rounded-lg 
             border border-neutral-700 bg-neutral-900 
             text-neutral-300 hover:border-emerald-500 
             hover:text-emerald-400 transition-colors shadow-sm"
>
  Resume (PDF)
</a>


            {/* HAMBURGER BUTTON (MOBILE) */}
            <button
              className="lg:hidden text-neutral-300 hover:text-white transition"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* MOBILE SIDEBAR PANEL */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-neutral-900 border-r border-neutral-800 p-6
          transform transition-transform duration-300 lg:hidden
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* CLOSE BUTTON */}
        <button
          className="text-neutral-300 hover:text-white mb-6"
          onClick={() => setMenuOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* MOBILE NAV CONTENT */}
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
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 rounded-md border-l-2 border-transparent
                      text-neutral-300 hover:text-emerald-300 hover:bg-neutral-800"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP LAYOUT */}
      {/* ========================================================= */}

      <div className="w-full grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 px-10 py-10">
        {/* DESKTOP SIDEBAR */}
        <aside
          className="hidden lg:block pr-4 border-r border-neutral-800
          sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto"
        >
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
          className="prose prose-invert max-w-none w-full min-w-0
            prose-headings:text-white
            prose-headings:font-semibold
            prose-headings:tracking-tight
            prose-p:text-neutral-300
            prose-p:leading-relaxed
            prose-li:text-neutral-300
            prose-strong:text-white
            prose-a:text-emerald-400 hover:prose-a:text-emerald-300
            prose-img:rounded-xl"
        >
          {children}
        </main>
      </div>

      {/* FOOTER */}
      <footer
        id="contact"
        className="border-t border-neutral-800 relative mt-24 animate-fadeIn opacity-0"
      >
        {/* glowing bar */}
        <div className="absolute -top-[1px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60 blur-[2px]" />

        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Philip Luigi Garcia
            </h3>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest mb-3">
              Navigation
            </h4>

            <ul className="space-y-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-neutral-400 hover:text-emerald-400 transition"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-300 uppercase tracking-widest mb-3">
              Contact
            </h4>

            <p className="text-neutral-400 text-sm mb-4 max-w-xs">
              Here are my socials — feel free to reach out anytime.
            </p>

            <div className="flex items-center gap-4">
              {/* EMAIL */}
              <a
                href="mailto:philipluigi09@gmail.com"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-emerald-500 hover:text-emerald-400 transition flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8l9-6 9 6"
                  />
                </svg>
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/philuigi"
                target="_blank"
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-emerald-500 hover:text-emerald-400 transition flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 
                  0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
                  -.01-.53.63-.01 1.08.58 1.23.82.72 1.2 1.87.86 2.33.65.07-.52.28-.86.51-1.06-1.78-.2-3.64-.89-3.64
                  -3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.62 7.62 0 0 1 2-.27c.68
                  0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 
                  1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 
                  1.93-.01 2.19 0 .21.15.45.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-4 mt-8">
          <p className="text-center text-neutral-500 text-xs">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}