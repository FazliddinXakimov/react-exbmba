import React, { useEffect } from "react";
import TopBanners from "../components/TopBanners";
import { useDispatch, useSelector } from "react-redux";
import { getBanners, getTestTypes } from "../store/actions/referencesActions";

export default function Home() {
  const dispatch = useDispatch();
  const banners = useSelector((state) => state.references.banners);
  const testTypes = useSelector((state) => state.references.testTypes) || [];

  const topBanners = banners.filter(
    (banner) => banner.place === "home_page_top"
  );

  const middleBanners = banners.filter(
    (banner) => banner.place === "home_page_middle"
  );

  const middleBelowBanners = banners.filter(
    (banner) => banner.place === "home_page_middle_below"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([dispatch(getBanners()), dispatch(getTestTypes())]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <TopBanners banners={topBanners} />

      {testTypes.map((testType, index) => (
        <div  key={index}>{testType.title}</div>
      ))}
      <TopBanners banners={middleBanners} />

      <TopBanners banners={middleBelowBanners} />
    </>
  );
}
