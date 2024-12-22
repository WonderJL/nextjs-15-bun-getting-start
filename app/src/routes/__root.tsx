import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { queryClient } from "../queryClient";
import "./../index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </>
    </QueryClientProvider>
  );
}
