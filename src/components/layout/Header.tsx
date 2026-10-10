"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ContactForm } from "@/components/ui/ContactForm";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    window.dispatchEvent(new CustomEvent("mehrtek:menu-change", { detail: menuOpen }));
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    const focusable = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"))
      : [];
    focusable[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length < 2) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function toggleTheme() {
    const nextDark = !dark;
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-h-11 items-center gap-2 rounded-md text-lg font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground" aria-hidden="true">
            <span className="h-4 w-4 rotate-45 rounded-[0.2rem] border-2 border-current" />
            <span className="absolute h-2 w-2 rounded-[0.15rem] bg-primary-foreground" />
          </span>
          <span>{site.brand.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {site.navigation.map((link) => (
            <a key={link.href} href={link.href} className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ContactForm label={site.hero.primaryCta} className="hidden sm:inline-flex" />
          <button type="button" onClick={toggleTheme} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}>
            {dark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
          </button>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div ref={menuRef} id="mobile-navigation" hidden={!menuOpen} className="border-t border-border bg-background md:hidden">
        <nav aria-label="Mobile primary" className={cn("flex flex-col gap-1 px-4 py-4", menuOpen && "animate-in")}>
          {site.navigation.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu} className="flex min-h-12 items-center rounded-lg px-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {link.label}
            </a>
          ))}
          <ContactForm label={site.hero.primaryCta} className="mt-2 flex min-h-12 w-full text-base" />
        </nav>
      </div>
    </header>
  );
}
