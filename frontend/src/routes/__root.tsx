import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { NavBar } from "../components/NavBar";
import type { QueryClient } from "@tanstack/react-query";

interface MyRooterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRooterContext>()({
  component: Root,
});

function Root() {
  return (
    <>
      <NavBar />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
