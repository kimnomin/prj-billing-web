import { createBrowserRouter, RouteObject } from "react-router-dom";
import BillingList from "../pages/billing/BillingList";
import MainLayout from "../pages/layout/MainLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <MainLayout />
    ),
    handle: { breadcrumb: "Home" },
    children: [
      {
        path: "billing/list",
        element: <BillingList />,
        handle: { breadcrumb: "Billing List" },
      },
      {
        path: "billing/stats",
        lazy: async() => {
          const module = await import('../pages/billing/BillingStats');
          return { Component: module.default };
        },
        handle: { breadcrumb: "Billing Stats" },
      },
    ],
  },
];

const router = createBrowserRouter(routes, {
  // basename: '/prj-billing-web'
});

export default router;
