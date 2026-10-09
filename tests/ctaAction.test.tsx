import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { makeCtaHandler } from "@/app/lib/ctaAction";

/** Build a fake click event that records preventDefault. */
function fakeEvent() {
  return { preventDefault: vi.fn() } as unknown as React.MouseEvent & {
    preventDefault: ReturnType<typeof vi.fn>;
  };
}

describe("makeCtaHandler", () => {
  let hrefSetter: ReturnType<typeof vi.fn>;
  let openSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    document.body.innerHTML = "";
    // Intercept window.location.href assignments.
    hrefSetter = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { pathname: "/voor-wie/machineverhuur", set href(v: string) { hrefSetter(v); }, get href() { return ""; } },
    });
    openSpy = vi.fn();
    (window as any).open = openSpy;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens the contact popup when the link is empty", () => {
    const onContact = vi.fn();
    makeCtaHandler("", onContact)(fakeEvent());
    expect(onContact).toHaveBeenCalledOnce();
  });

  it("opens an external url in a new tab", () => {
    makeCtaHandler("https://example.com", vi.fn())(fakeEvent());
    expect(openSpy).toHaveBeenCalledWith("https://example.com", "_blank", "noopener,noreferrer");
  });

  it("scrolls to a same-page anchor when the block exists here", () => {
    const el = document.createElement("div");
    el.id = "methode";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);

    makeCtaHandler("#methode", vi.fn())(fakeEvent());
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    expect(hrefSetter).not.toHaveBeenCalled();
  });

  it("navigates to the homepage anchor when the block is NOT on this page", () => {
    // No #methode element on this page → should go to "/#methode".
    makeCtaHandler("#methode", vi.fn())(fakeEvent());
    expect(hrefSetter).toHaveBeenCalledWith("/#methode");
  });

  it("navigates to a bare internal path, root-absolute", () => {
    makeCtaHandler("voor-verhuurbedrijven", vi.fn())(fakeEvent());
    expect(hrefSetter).toHaveBeenCalledWith("/voor-verhuurbedrijven");
  });

  it("navigates to a path + anchor on another page", () => {
    makeCtaHandler("/#methode", vi.fn())(fakeEvent());
    expect(hrefSetter).toHaveBeenCalledWith("/#methode");
  });

  it("scrolls when path+anchor points at the current page", () => {
    const el = document.createElement("div");
    el.id = "assortiment";
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);

    makeCtaHandler("/voor-wie/machineverhuur#assortiment", vi.fn())(fakeEvent());
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});
