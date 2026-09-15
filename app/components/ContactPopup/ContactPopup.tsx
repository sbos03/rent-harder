"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Phone, Mail, Calendar } from "lucide-react";
import styles from "./ContactPopup.module.scss";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: any;
}

/** Keep digits only, so a nicely formatted number becomes a valid wa.me / tel target. */
function digitsOnly(value?: string) {
  return (value || "").replace(/[^\d]/g, "");
}

export default function ContactPopup({ isOpen, onClose, settings }: ContactPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // All four contact buttons are ALWAYS shown. Each uses the value from the
  // CMS (Website Instellingen → Contact) when set, and otherwise falls back to
  // a sensible built-in default, so a button is never a dead click.
  //
  // To change any of these, fill in the matching field in the admin; the CMS
  // value takes over automatically.
  const FALLBACK_PHONE = "0599253032"; // shown in the popup footer
  const FALLBACK_EMAIL = "info@rentharder.nl";
  const FALLBACK_WHATSAPP = "31599253032";
  const FALLBACK_BOOKING = "mailto:info@rentharder.nl?subject=Kennismaking%20plannen";

  const whatsappDigits = digitsOnly(settings?.whatsapp) || FALLBACK_WHATSAPP;
  const phoneRaw = (settings?.phone || "").trim();
  const phoneDigits = digitsOnly(phoneRaw) || FALLBACK_PHONE;
  const email = (settings?.email || "").trim() || FALLBACK_EMAIL;
  const bookingUrl = (settings?.bookingUrl || "").trim() || FALLBACK_BOOKING;

  const waHref = `https://wa.me/${whatsappDigits}`;
  // Preserve a leading "+" (international) but never invent one for a local number.
  const telHref = `tel:${phoneRaw.startsWith("+") ? "+" : ""}${phoneDigits}`;
  const mailHref = `mailto:${email}`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector("button");
        if (closeBtn) closeBtn.focus();
      }
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.backdrop}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Contact opnemen met Rent Harder"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={styles.modal}
          >
            <button
              onClick={onClose}
              aria-label="Sluiten"
              className={styles.closeBtn}
            >
              <X className={styles.closeIcon} />
            </button>

            <h2 className={styles.title}>
              LAAT ZIEN WAT<br />JE VERHUURT.
            </h2>

            <div className={styles.subtitle}>
              <span className={styles.subtitleLabel}>Geen verkooppraatje.</span>
              <p>
                Gewoon direct contact over jouw verhuurbedrijf, jouw ambitie en
                de kansen die wij zien.
              </p>
            </div>

            <div className={styles.actions}>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.actionBtn} ${styles.actionPrimary}`}
              >
                <MessageCircle className={styles.actionIcon} />
                Start WhatsApp
              </a>
              <a href={telHref} className={`${styles.actionBtn} ${styles.actionDark}`}>
                <Phone className={styles.actionIcon} />
                Bel ons
              </a>
              <a href={mailHref} className={`${styles.actionBtn} ${styles.actionOutline}`}>
                <Mail className={styles.actionIcon} />
                Stuur een mail
              </a>
              <a
                href={bookingUrl}
                target={bookingUrl.startsWith("http") ? "_blank" : undefined}
                rel={bookingUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`${styles.actionBtn} ${styles.actionOutline}`}
              >
                <Calendar className={styles.actionIcon} />
                Plan een kennismaking
              </a>
            </div>

            <div className={styles.footer}>
              <h4 className={styles.footerTitle}>RENT+HARDER</h4>
              <p className={styles.footerSub}>Powered by KIX 360</p>
              <address className={styles.footerAddress}>
                Nomdenweg 2<br />
                9561 AM Ter Apel<br />
                0599 - 253032
              </address>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
