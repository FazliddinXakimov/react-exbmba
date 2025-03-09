import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import SiteContainer from "../components/BaseComponents/SiteContainer";
import BottomNavigation from "../components/BottomNavigation";
import UserSectionsSlider from "../components/UserSectionsSlider";

export default function MainLayout() {
  const location = useLocation();

  const isProfile = location.pathname.startsWith("/profile");
  return (
    <>
      <Navbar />
      <SiteContainer>
        {isProfile && <UserSectionsSlider />}

        <Outlet />
      </SiteContainer>
      <BottomNavigation />
    </>
  );
}
