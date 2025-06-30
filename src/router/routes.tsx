import { createBrowserRouter, type RouteObject } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import { RouteGuard } from "./middleware";

export interface RouteHandle {
  meta?: {
    title?: string;
    requiresAuth?: boolean;
    publicOnly?: boolean;
  };
}

declare module "react-router-dom" {
  export default interface RouteObject {
    handle?: RouteHandle;
  }
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RouteGuard />,
    children: [
      {
        path: "",
        lazy: async () => {
          const mod = await import("../layouts/AppLayout");
          return { Component: mod.default };
        },
        children: [
          {
            path: "app",
            handle: {
              meta: { requiresAuth: true },
            },
            children: [
              {
                path: "dashboard",
                lazy: async () => {
                  const mod = await import("../pages/Dashboard");
                  return {
                    Component: mod.default,
                    handle: { meta: { title: "Dashboard" } },
                  };
                },
              },
            ],
          },
          {
            path: "app",
            handle: {
              meta: { requiresAuth: true },
            },
            children: [
              {
                path: "dashboard",
                lazy: async () => {
                  const mod = await import("../pages/Dashboard");
                  return {
                    Component: mod.default,
                    handle: { meta: { title: "Dashboard" } },
                  };
                },
              },
              {
                path: "survey-builder",
                children: [
                  {
                    index: true,
                    lazy: async () => {
                      const mod = await import(
                        "../pages/survey-builder/Step1Metadata"
                      );
                      return {
                        Component: mod.default,
                        handle: {
                          meta: {
                            title: "Survey Builder - Step 1",
                            requiresAuth: true,
                          },
                        },
                      };
                    },
                  },
                  {
                    path: "step-1",
                    lazy: async () => {
                      const mod = await import(
                        "../pages/survey-builder/Step1Metadata"
                      );
                      return {
                        Component: mod.default,
                        handle: {
                          meta: {
                            title: "Survey Builder - Step 1",
                            requiresAuth: true,
                          },
                        },
                      };
                    },
                  },
                  {
                    path: "step-2",
                    lazy: async () => {
                      const mod = await import(
                        "../pages/survey-builder/Step2Questions"
                      );
                      return {
                        Component: mod.default,
                        handle: {
                          meta: {
                            title: "Survey Builder - Step 2",
                            requiresAuth: true,
                          },
                        },
                      };
                    },
                  },
                  {
                    path: "step-3",
                    lazy: async () => {
                      const mod = await import(
                        "../pages/survey-builder/Step3Answers"
                      );
                      return {
                        Component: mod.default,
                        handle: {
                          meta: {
                            title: "Survey Builder - Step 3",
                            requiresAuth: true,
                          },
                        },
                      };
                    },
                  },
                  {
                    path: "step-4",
                    lazy: async () => {
                      const mod = await import(
                        "../pages/survey-builder/Step4Preview"
                      );
                      return {
                        Component: mod.default,
                        handle: {
                          meta: {
                            title: "Survey Builder - Step 4",
                            requiresAuth: true,
                          },
                        },
                      };
                    },
                  },
                  {
                    path: "step-5",
                    lazy: async () => {
                      const mod = await import(
                        "../pages/survey-builder/Step5Export"
                      );
                      return {
                        Component: mod.default,
                        handle: {
                          meta: {
                            title: "Survey Builder - Step 5",
                            requiresAuth: true,
                          },
                        },
                      };
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <RouteGuard />,
    handle: {
      meta: { publicOnly: true },
    },
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
            handle: {
              meta: { title: "Login" },
            },
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>404 - Not Found</h2>
      </div>
    ),
    handle: {
      meta: { title: "404" },
    },
  },
];

export const router = createBrowserRouter(routes);
