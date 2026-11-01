"use client";

import { useEffect } from "react";

const VALUE = "google-scholar";
const LABEL = "Google Scholar";
const ORDER_KEY = "portfolio_social_order";

type SocialLink = {
  platform: string;
  url: string;
  label: string;
};

type SocialOrderItem = {
  social: SocialLink;
  id: string;
};

/**
 * Admin-only enhancement for the existing social-link editor.
 * Adds Google Scholar plus drag handles without duplicating the editor.
 * The existing HeroEditor remains the source of truth; this component only
 * reorders the DOM and rewrites the socials array immediately before Save.
 */
export default function AdminSocialPlatformEnhancer() {
  useEffect(() => {
    if (window.location.pathname !== "/admin") return;

    let draggedRow: HTMLElement | null = null;
    let pendingOrder: string[] = [];
    let observer: MutationObserver | null = null;
    let nextId = 0;

    const getSection = () => {
      const label = Array.from(document.querySelectorAll("label")).find(
        (el) => el.textContent?.trim() === "Social Links"
      );
      return label?.parentElement ?? null;
    };

    const getRows = (section: HTMLElement) => {
      const list = section.querySelector("div.space-y-2");
      if (!list) return [];
      return Array.from(list.children).filter(
        (el): el is HTMLElement =>
          el instanceof HTMLElement && el.querySelector("select") !== null
      );
    };

    const ensureIds = (rows: HTMLElement[]) => {
      rows.forEach((row) => {
        if (!row.dataset.socialOrderId) {
          row.dataset.socialOrderId = `social-${nextId++}`;
        }
      });
    };

    const getOrder = (rows: HTMLElement[]) =>
      rows.map((row) => row.dataset.socialOrderId!).filter(Boolean);

    const saveOrder = (rows: HTMLElement[]) => {
      ensureIds(rows);
      pendingOrder = getOrder(rows);
      try {
        sessionStorage.setItem(ORDER_KEY, JSON.stringify(pendingOrder));
      } catch {}
    };

    const loadOrder = () => {
      try {
        const raw = sessionStorage.getItem(ORDER_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed)
          ? parsed.filter((x): x is string => typeof x === "string")
          : [];
      } catch {
        return [];
      }
    };

    const reorderDom = (rows: HTMLElement[]) => {
      if (pendingOrder.length === 0) return;
      ensureIds(rows);

      const rank = new Map(pendingOrder.map((id, index) => [id, index]));
      const sorted = [...rows].sort((a, b) => {
        const ar = rank.get(a.dataset.socialOrderId!);
        const br = rank.get(b.dataset.socialOrderId!);
        if (ar === undefined && br === undefined) return 0;
        if (ar === undefined) return 1;
        if (br === undefined) return -1;
        return ar - br;
      });

      const list = rows[0]?.parentElement;
      if (!list) return;
      const alreadyOrdered = sorted.every((row, index) => row === rows[index]);
      if (alreadyOrdered) return;
      sorted.forEach((row) => list.appendChild(row));
    };

    const addOption = () => {
      document.querySelectorAll<HTMLSelectElement>("select").forEach((select) => {
        const values = Array.from(select.options).map((option) => option.value);
        if (!values.includes("researchgate") || !values.includes("youtube")) return;
        if (values.includes(VALUE)) return;
        select.add(new Option(LABEL, VALUE));
      });
    };

    const addHandle = (row: HTMLElement) => {
      if (row.dataset.socialDragReady === "1") return;
      const firstCell = row.children[0];
      if (!(firstCell instanceof HTMLElement)) return;

      row.dataset.socialDragReady = "1";
      row.dataset.socialOrderId ||= `social-${nextId++}`;
      row.style.position = "relative";

      const handle = document.createElement("button");
      handle.type = "button";
      handle.draggable = true;
      handle.setAttribute("aria-label", "Drag to reorder social link");
      handle.title = "Drag to reorder";
      handle.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14"/></svg>`;
      handle.style.cssText = [
        "position:absolute",
        "left:-28px",
        "top:50%",
        "transform:translateY(-50%)",
        "width:24px",
        "height:34px",
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "border:0",
        "background:transparent",
        "color:#71717a",
        "cursor:grab",
        "border-radius:8px",
        "touch-action:none",
        "user-select:none",
        "z-index:5",
        "padding:0",
      ].join(";");

      handle.addEventListener("mouseenter", () => {
        handle.style.color = "#6366f1";
      });
      handle.addEventListener("mouseleave", () => {
        handle.style.color = "#71717a";
      });

      handle.addEventListener("dragstart", (event) => {
        draggedRow = row;
        handle.style.cursor = "grabbing";
        row.style.opacity = "0.55";
        event.dataTransfer?.setData("text/plain", row.dataset.socialOrderId ?? "");
        if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
      });

      handle.addEventListener("dragend", () => {
        if (draggedRow) draggedRow.style.opacity = "";
        handle.style.cursor = "grab";
        draggedRow = null;
      });

      row.addEventListener("dragover", (event) => {
        if (!draggedRow || draggedRow === row) return;
        event.preventDefault();
        if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
      });

      row.addEventListener("drop", (event) => {
        if (!draggedRow || draggedRow === row) return;
        event.preventDefault();
        const list = row.parentElement;
        if (!list) return;

        const rect = row.getBoundingClientRect();
        if (event.clientY < rect.top + rect.height / 2) {
          list.insertBefore(draggedRow, row);
        } else {
          list.insertBefore(draggedRow, row.nextSibling);
        }

        const section = getSection();
        if (section) saveOrder(getRows(section));
      });

      firstCell.appendChild(handle);
    };

    const enhance = () => {
      addOption();
      const section = getSection();
      if (!section) return;

      const rows = getRows(section);
      if (rows.length === 0) return;

      ensureIds(rows);

      if (pendingOrder.length === 0) {
        const stored = loadOrder();
        pendingOrder = stored.length ? stored : getOrder(rows);
      }

      rows.forEach(addHandle);
      reorderDom(rows);
    };

    const clearPendingAfterSave = () => {
      try {
        sessionStorage.removeItem(ORDER_KEY);
      } catch {}
      pendingOrder = [];
    };

    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof Request
            ? input.url
            : String(input);
      const method = (
        init?.method ?? (input instanceof Request ? input.method : "GET")
      ).toUpperCase();

      if (
        url.includes("/api/content/hero") &&
        method === "POST" &&
        pendingOrder.length > 0 &&
        init?.body
      ) {
        try {
          const body = JSON.parse(String(init.body));
          if (Array.isArray(body.socials)) {
            const section = getSection();
            if (section) {
              const rows = getRows(section);
              ensureIds(rows);
              const domIds = getOrder(rows);
              const current: SocialOrderItem[] = body.socials.map(
                (social: SocialLink, index: number) => ({
                  social,
                  id: `social-${index}`,
                })
              );
              const byId = new Map<string, SocialOrderItem>(
                current.map((item) => [item.id, item])
              );
              const reordered = domIds
                .map((id) => byId.get(id))
                .filter((item): item is SocialOrderItem => item !== undefined)
                .map((item) => item.social);

              if (reordered.length === body.socials.length) {
                body.socials = reordered;
              }
            }

            init = { ...init, body: JSON.stringify(body) };
            const response = await originalFetch(input, init);
            if (response.ok) clearPendingAfterSave();
            return response;
          }
        } catch {
          // Fall through to the original request if the body is not JSON.
        }
      }

      return originalFetch(input, init);
    };

    enhance();
    observer = new MutationObserver(() => {
      window.requestAnimationFrame(enhance);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer?.disconnect();
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}
