import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <section className="w-[90%] mx-auto py-10">
      <section>
        <Navbar />
        <section className="py-10">
          <Outlet />
        </section>
      </section>
    </section>
  );
}
