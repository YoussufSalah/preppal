// app/upload/layout.js

import PrepPalNavbar from "./uniqueNavbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <PrepPalNavbar/>
      {children}
    </>
  );
}