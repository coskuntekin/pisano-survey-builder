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
        index: true,
        lazy: async () => {
          const { Navigate } = await import("react-router-dom");
          return {
            Component: () => <Navigate to="/app/dashboard" replace />,
          };
        },
        handle: {
          meta: { requiresAuth: true },
        },
      },
      {
        path: "app",
        lazy: async () => {
          const mod = await import("../layouts/AppLayout");
          return { Component: mod.default };
        },
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
            lazy: async () => {
              const mod = await import("../pages/survey-builder/index");
              return {
                Component: mod.default,
                handle: { meta: { title: "Survey Builder" } },
              };
            },
            children: [
              {
                path: "step-1/:id?",
                lazy: async () => {
                  const mod = await import(
                    "../pages/survey-builder/Step1Metadata"
                  );
                  return {
                    Component: mod.default,
                    handle: { meta: { title: "Survey Details" } },
                  };
                },
              },
              {
                path: "step-2/:id",
                lazy: async () => {
                  const mod = await import(
                    "../pages/survey-builder/Step2QuestionsAnswers"
                  );
                  return {
                    Component: mod.default,
                    handle: {
                      meta: { title: "Survey Questions and Answers" },
                    },
                  };
                },
              },
              {
                path: "step-3/:id",
                lazy: async () => {
                  const mod = await import(
                    "../pages/survey-builder/Step3Preview"
                  );
                  return {
                    Component: mod.default,
                    handle: { meta: { title: "Survey Preview" } },
                  };
                },
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
      <div className="p-8 text-center">
        <h2>404 - Not Found</h2>
      </div>
    ),
    handle: {
      meta: { title: "404" },
    },
  },
];

export const router = createBrowserRouter(routes);
