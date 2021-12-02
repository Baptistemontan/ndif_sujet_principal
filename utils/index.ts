import { MouseEventHandler, KeyboardEvent } from "react";
import PromiseCanceller from "./PromiseCanceller";

export { PromiseCanceller };

export function deviceType() {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua,
    )
  ) {
    return "mobile";
  }
  return "desktop";
}

export function openNewTab(url: string) {
  window.open(url, "_blank");
}

export function forceLinkNewTab(url: string) {
  const func: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    openNewTab(url);
  };
  return func;
}

export function queryToString(query: string | string[] | undefined): string {
  if (query) {
    return Array.isArray(query) ? query.join("&") : query;
  }
  return "";
}

export function spaceInAbstract(abstract: string): string {
  return abstract.replace(/,(?!\s)/g, ", ").replace(/\.(?!\s)/g, ". ");
}

export function handleEnterKeyDown(
  event: KeyboardEvent<HTMLDivElement>,
  cb: () => void,
) {
  if (event.key === "Enter") {
    cb();
  }
}

export function createCookie(name: string, value: string, days: number) {
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  } else {
    expires = "";
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

export function parseCookies(cookieString: string) {
  const cookies: Record<string, string> = {};
  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookies[key.trim()] = value;
  });
  return cookies;
}

// set body overflow to hidden, return function to reset to old value
export function disableScrolling() {
  const previous = document.body.style.overflowY;
  document.body.style.overflowY = "hidden";
  return () => {
    document.body.style.overflowY = previous;
  };
}
