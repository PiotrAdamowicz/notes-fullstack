import { hc } from "hono/client";
import type { ApiRoutes } from "../../../server/app";
import { queryOptions } from "@tanstack/react-query";

export const client = hc<ApiRoutes>("/");

async function getCurrentUser() {
  const res = await client.api.me.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity,
});
