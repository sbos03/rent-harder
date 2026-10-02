"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Phone, Mail, Calendar, ArrowLeft } from "lucide-react";
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

type View = "menu" | "mail" | "kennismaking";

export default function ContactPopup({ isOpen, onClose, settings }: ContactPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Which screen of the popup is shown: the action menu, or one of the forms.
  const [view, setView] = useState<View>("menu");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // All four contact buttons are ALWAYS shown. Each uses the value from the
  // CMS (Website Instellingen → Contact) when set, and otherwise falls back to
  // a sensible built-in default, so a button is never a dead click.
  //
  // To change any of these, fill in the matching field in the admin; the CMS
  // value takes over automatically.
  const FALLBACK_PHONE = "0599253032"; // shown in the popup footer
  const FALLBACK_WHATSAPP = "31599253032";

  const whatsappDigits = digitsOnly(settings?.whatsapp) || FALLBACK_WHATSAPP;
  const phoneRaw = (settings?.phone || "").trim();
  const phoneDigits = digitsOnly(phoneRaw) || FALLBACK_PHONE;

  const waHref = `https://wa.me/${whatsappDigits}`;
  // Preserve a leading "+" (international) but never invent one for a local number.
  const telHref = `tel:${phoneRaw.startsWith("+") ? "+" : ""}${phoneDigits}`;

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

  // Reset to the menu whenever the popup is (re)opened or fully closed.
  useEffect(() => {
    if (!isOpen) {
      setView("menu");
      setSent(false);
      setError(null);
      setSending(false);
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      type: view, // "mail" | "kennismaking"
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      preferredDate: String(data.get("preferredDate") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""), // honeypot
      pagePath: typeof window !== "undefined" ? window.location.pathname : "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Er ging iets mis. Probeer het later opnieuw.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er ging iets mis.");
    } finally {
      setSending(false);
    }
  }

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

            {view === "menu" && (
              <>
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
                  <button
                    type="button"
                    onClick={() => { setView("mail"); setSent(false); setError(null); }}
                    className={`${styles.actionBtn} ${styles.actionOutline}`}
                  >
                    <Mail className={styles.actionIcon} />
                    Stuur een mail
                  </button>
                  <button
                    type="button"
                    onClick={() => { setView("kennismaking"); setSent(false); setError(null); }}
                    className={`${styles.actionBtn} ${styles.actionOutline}`}
                  >
                    <Calendar className={styles.actionIcon} />
                    Plan een kennismaking
                  </button>
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
              </>
            )}

            {view !== "menu" && (
              <div className={styles.formView}>
                <button
                  type="button"
                  onClick={() => { setView("menu"); setError(null); }}
                  className={styles.backBtn}
                >
                  <ArrowLeft className={styles.backIcon} /> Terug
                </button>

                <h2 className={styles.formTitle}>
                  {view === "kennismaking" ? "PLAN EEN KENNISMAKING." : "STUUR EEN MAIL."}
                </h2>

                {sent ? (
                  <p className={styles.formSuccess}>
                    Bedankt! Je bericht is verstuurd. We nemen zo snel mogelijk contact met je op.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form} noValidate>
                    {/* Honeypot: hidden from users, bots fill it in. */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      className={styles.honeypot}
                      aria-hidden="true"
                    />

                    <label className={styles.formLabel}>
                      Naam *
                      <input type="text" name="name" required className={styles.formInput} />
                    </label>
                    <label className={styles.formLabel}>
                      E-mail *
                      <input type="email" name="email" required className={styles.formInput} />
                    </label>
                    <label className={styles.formLabel}>
                      Telefoon
                      <input type="tel" name="phone" className={styles.formInput} />
                    </label>

                    {view === "kennismaking" && (
                      <label className={styles.formLabel}>
                        Voorkeursdatum / -tijd
                        <input type="text" name="preferredDate" placeholder="Bijv. volgende week dinsdagmiddag" className={styles.formInput} />
                      </label>
                    )}

                    <label className={styles.formLabel}>
                      {view === "kennismaking" ? "Waar wil je het over hebben?" : "Bericht *"}
                      <textarea
                        name="message"
                        rows={4}
                        required={view === "mail"}
                        className={styles.formTextarea}
                      />
                    </label>

                    {error && <p className={styles.formError}>{error}</p>}

                    <button type="submit" disabled={sending} className={styles.formSubmit}>
                      {sending ? "Versturen..." : "Verstuur"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
