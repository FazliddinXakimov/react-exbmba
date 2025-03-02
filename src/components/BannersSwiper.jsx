import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styled from "styled-components";
import "swiper/css";

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const BannersSwiper = ({ banners = [], className }) => {
  return (
    <Swiper
      className={className}
      slidesPerView={1} // ✅ Fixed prop name
      spaceBetween={0}
      pagination={{ clickable: true }}
      loop={banners.length > 1} // ✅ Simplified condition
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      modules={[Autoplay, Pagination]}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <StyledImage src={banner.image} alt={banner.title || "Banner"} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannersSwiper;
