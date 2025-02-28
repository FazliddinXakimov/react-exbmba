import React, { useEffect } from "react";
import TopBanners from "../components/TopBanners";
import { useDispatch, useSelector } from "react-redux";
import { getBanners, getTestTypes } from "../store/actions/referencesActions";
import styled from "styled-components";
import InfoImg from "../assets/images/info.png";
import { Link } from "react-router-dom";

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

  const premiumTests = testTypes.filter(
    (testType) => testType.tariff_unique_name == "premium"
  );

  // const primeTests = testTypes.filter(
  //   (testType) => testType.tariff_unique_name == "premium"
  // );

  return (
    <> 
      <TopBanners banners={topBanners} />
      <Link to="/auth/login">HIIII</Link>
      <PremiumTestsList>
        <div className="title">
          <div className="title-text">Premium test</div>
          <img className="title-info" src={InfoImg} />
        </div>
        <div className="list">
          {premiumTests.map((testType, index) => (
            <PremiumTestListItem key={index}>
              <img src={testType.image} />
              <div>{testType.title}</div>
            </PremiumTestListItem>
          ))}
        </div>
      </PremiumTestsList>

      <TopBanners banners={middleBanners} />

      <TopBanners banners={middleBelowBanners} />
    </>
  );
}

const PremiumTestsList = styled.div`
  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 20px 0;
    gap: 20px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }

  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    color: var(--primary-color);
    font-weight: 500;
    text-transform: uppercase;
  }
  .title-info {
    height: 24px;
  }
`;

const PremiumTestListItem = styled.div`
  border: 1px solid var(--secondary-color);
  border-radius: var(--radius-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 20px 0;
  img {
    height: 50px;
  }
  div {
    text-align: center;
  }
`;
