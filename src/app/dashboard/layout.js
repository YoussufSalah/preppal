// app/upload/layout.js

import PrepPalNavbar from "./dashboardNavbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <PrepPalNavbar/>
      {children}
    </>
  );
}