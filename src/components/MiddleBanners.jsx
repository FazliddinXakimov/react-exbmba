import React from "react";
import BannersSwiper from "./BannersSwiper";
import styled from "styled-components";

const MiddleBanners = ({ banners = [] }) => {
  return (
    <MiddleBannerWrapper>
      <BannersSwiper className="middle-banners" banners={banners} />
    </MiddleBannerWrapper>
  );
};

export default MiddleBanners;

const MiddleBannerWrapper = styled.div`
  .middle-banners {
    margin: 0 -10px;
    border-radius: none !important;
  }
`;
