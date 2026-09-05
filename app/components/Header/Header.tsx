"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.scss";

interface HeaderProps {
  onContactClick: () => void;
  settings?: any;
}

interface MenuItem {
  label: string;
  href: string;
  num: string;
  isContact?: boolean;
  children?: { label: string; href: string }[];
}

const FALLBACK_MENU: MenuItem[] = [
  { label: "HOME", href: "/", num: "01" },
  { label: "WAT WE DOEN", href: "/#wat-we-bouwen", num: "02" },
  {
    label: "VOOR WIE",
    href: "/#voor-wie",
    num: "03",
    children: [
      { label: "Machineverhuur", href: "/machineverhuur" },
      { label: "Containerverhuur", href: "/containerverhuur" },
      { label: "Pomp- en wateroplossingen", href: "/pomp-en-wateroplossingen" },
      { label: "Hoogwerkerverhuur", href: "/voor-wie/hoogwerkerverhuur" },
    ],
  },
  { label: "PARTNERVERHALEN", href: "/#built-to-rent-harder", num: "04" },
  { label: "DE METHODE", href: "/#methode", num: "05" },
  { label: "CONTACT", href: "#", num: "06", isContact: true },
];

function buildMenuFromSettings(settings?: any): MenuItem[] {
  const nav = settings?.navigation;
  if (!Array.isArray(nav) || nav.length === 0) return FALLBACK_MENU;
  return nav.map((item: any, i: number): MenuItem => {
    const children = Array.isArray(item.children) && item.children.length > 0
      ? item.children
          .filter((c: any) => c?.label)
          .map((c: any) => ({ label: c.label, href: c.href || "#" }))
      : undefined;
    return {
      label: item.label ?? "",
      href: item.href || "#",
      num: String(i + 1).padStart(2, "0"),
      isContact: item.type === "contact",
      children,
    };
  });
}

export default function Header({ onContactClick, settings }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<number, boolean>>({});
  const { scrollY } = useScroll();

  const menuItems = buildMenuFromSettings(settings);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.logoWrap}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src="/images/RENT-HARDER-LOGO2.svg"
              alt="RENT HARDER"
              width={224}
              height={40}
              priority
            />
          </Link>
        </div>

        <div className={styles.menuTrigger}>
          <button
            onClick={() => setMenuOpen(true)}
            className={styles.menuButton}
            aria-label="Open menu"
          >
            <span>MENU</span>
            <Menu className={styles.menuIcon} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label="Navigatiemenu"
          >
            <div className={styles.overlayTop}>
              <Link href="/" onClick={() => setMenuOpen(false)} className={styles.overlayLogo}>
                <Image
                  src="/images/RENT-HARDER-LOGO2.svg"
                  alt="RENT HARDER"
                  width={224}
                  height={40}
                  className={styles.invertLogo}
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className={styles.closeButton}
                aria-label="Sluiten"
              >
                <span className={styles.closeText}>SLUITEN</span>
                <X className={styles.closeIcon} />
              </button>
            </div>

            <nav className={styles.overlayNav}>
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                >
                  {item.isContact ? (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onContactClick();
                      }}
                      className={styles.navItem}
                    >
                      <span className={styles.navNum}>{item.num}</span>
                      <span className={styles.navLabel}>{item.label}</span>
                    </button>
                  ) : item.children ? (
                    <>
                      <div className={styles.navItem}>
                        <span className={styles.navNum}>{item.num}</span>
                        <Link
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className={styles.navLabel}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setOpenSubmenus((prev) => ({ ...prev, [i]: !prev[i] }))}
                          className={styles.submenuToggle}
                          aria-label={openSubmenus[i] ? "Submenu inklappen" : "Submenu uitklappen"}
                          aria-expanded={!!openSubmenus[i]}
                        >
                          {openSubmenus[i] ? "−" : "+"}
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {openSubmenus[i] && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className={styles.submenu}
                          >
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMenuOpen(false)}
                                  className={styles.submenuItem}
                                >
                                  <span className={styles.submenuArrow}>→</span>
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={styles.navItem}
                    >
                      <span className={styles.navNum}>{item.num}</span>
                      <span className={styles.navLabel}>{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.overlayBottom}
            >
              <div>DE DIGITALE SIDEKICK<br />ACHTER JOUW VERHUUR.</div>
              <div className={styles.overlayBottomCenter}>DIGITAAL WAAR HET KAN.<br />MENSELIJK WAAR HET MOET.</div>
              <div className={styles.overlayBottomRight}>BUILD. RENT. GROW.</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
