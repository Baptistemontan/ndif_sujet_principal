import { serverURL } from "./envconst";

const apiRoute = `${serverURL}/api`;

export async function getAPI<T>(
  route: string,
  init?: RequestInit,
  api_url = apiRoute,
): Promise<T | string | null> {
  try {
    const res = await fetch(`${api_url}/${route}/`, {
      ...init,
      method: "GET",
    });
    const data: T & {
      error?: string;
    } = await res.json();
    return data.error || data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("get API error, route :", route, "error:", e);
    return null;
  }
}

interface IPostAPIOptions {
  contentType?: string;
  init?: RequestInit;
  api_url?: string;
}

export async function postAPI<T, P>(
  route: string,
  body: P,
  {
    contentType = "application/json",
    init = {},
    api_url = apiRoute,
  }: IPostAPIOptions = {},
): Promise<T | string | null> {
  try {
    const res = await fetch(`${api_url}/${route}/`, {
      headers: {
        "Content-Type": contentType,
      },
      ...init,
      method: "POST",
      body: JSON.stringify(body),
    });
    const data: T & {
      error?: string;
    } = await res.json();
    return data.error || data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("post API error, route :", route, "error:", e);
    return null;
  }
}
