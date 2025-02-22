import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteContainer from "../components/BaseComponents/SiteContainer";
import BottomNavigation from "../components/BottomNavigation";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <SiteContainer>
        <Outlet />
      </SiteContainer>
      <BottomNavigation />
    </>
  );
}
