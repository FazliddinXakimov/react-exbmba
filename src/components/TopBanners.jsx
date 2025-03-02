import React from "react";
import BannersSwiper from "./BannersSwiper";
import styled from "styled-components";

const TopBanners = ({ banners = [] }) => {
  return (
    <TopBannersWrapper>
      <BannersSwiper className="top-banners" banners={banners} />
    </TopBannersWrapper>
  );
};

export default TopBanners;

const TopBannersWrapper = styled.div`
  .top-banners {
    img {
      border-radius: var(--radius-md);
    }
  }
`;
