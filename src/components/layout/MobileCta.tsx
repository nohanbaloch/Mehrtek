"use client";

import { useEffect, useState } from "react";

import { ContactForm } from "@/components/ui/ContactForm";

interface MobileCtaProps {
  label: string;
}

export function MobileCta({ label }: MobileCtaProps) {
  const [heroHidden, setHeroHidden] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const finalCta = document.getElementById("final-cta");
    if (!hero || !finalCta || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) setHeroHidden(!entry.isIntersecting);
          if (entry.target === finalCta) setFinalCtaVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(hero);
    observer.observe(finalCta);

    const handleMenuChange = (event: Event) => {
      setMenuOpen((event as CustomEvent<boolean>).detail);
    };
    window.addEventListener("mehrtek:menu-change", handleMenuChange);
    const dialogObserver = new MutationObserver(() => {
      setDialogOpen(Boolean(document.querySelector('[role="dialog"], dialog[open]')));
    });
    dialogObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
    return () => {
      observer.disconnect();
      dialogObserver.disconnect();
      window.removeEventListener("mehrtek:menu-change", handleMenuChange);
    };
  }, []);

  const visible = heroHidden && !finalCtaVisible && !menuOpen && !dialogOpen;

  useEffect(() => {
    document.body.style.paddingBottom = visible ? "calc(5rem + env(safe-area-inset-bottom))" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  return (
    <div
      data-testid="mobile-sticky-cta"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-medium backdrop-blur-md md:hidden ${
        visible ? "" : "hidden"
      }`}
    >
      <ContactForm label={label} className="w-full" />
    </div>
  );
}
