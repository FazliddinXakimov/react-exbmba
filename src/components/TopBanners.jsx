import React from "react";
import BannersSwiper from "./BannersSwiper";

const TopBanners = ({ banners = [] }) => {
  return (
    <>
      <BannersSwiper className="top-banners" banners={banners} />
    </>
  );
};

export default TopBanners;
