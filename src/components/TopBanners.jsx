import React from "react";
import BannersSwiper from "./BannersSwiper";

const TopBanners = ({ banners = [] }) => {
  return (
    <>
      <BannersSwiper banners={banners} />
    </>
  );
};

export default TopBanners;
