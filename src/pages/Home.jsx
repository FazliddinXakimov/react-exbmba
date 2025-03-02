import React, { useEffect } from "react";
import TopBanners from "../components/TopBanners";
import MiddleBanners from "../components/MiddleBanners";

import { useDispatch, useSelector } from "react-redux";
import {
  getBanners,
  getSelections,
  getSubjects,
  getTestTypes,
} from "../store/actions/referencesActions";
import styled from "styled-components";
import InfoImg from "../assets/images/info.png";
import { Link } from "react-router-dom";
import {
  BANNER_TYPES,
  SELECTION_API_TYPES,
  SUBJECT_API_TYPES,
  TARIFF_TYPES,
} from "../utils/constants";
import MiddleBelowBanners from "../components/MiddleBelowBanners";

export default function Home() {
  const dispatch = useDispatch();
  const testTypes = useSelector((state) => state.references.testTypes);
  const subjects = useSelector((state) => state.references.subjects);
  const olympicTests = useSelector((state) => state.references.olympicTests);
  const englishTests = useSelector((state) => state.references.englishTests);
  const topBanners = useSelector((state) => state.references.topBanners);
  const middleBanners = useSelector((state) => state.references.middleBanners);
  const middleBelowBanners = useSelector(
    (state) => state.references.middleBelowBanners
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(
            getBanners({
              apiType: BANNER_TYPES.TOP,
              params: {
                place: BANNER_TYPES.TOP,
              },
            })
          ),
          dispatch(
            getBanners({
              apiType: BANNER_TYPES.MIDDLE,
              params: {
                place: BANNER_TYPES.MIDDLE,
              },
            })
          ),
          dispatch(
            getBanners({
              apiType: BANNER_TYPES.MIDDLE_BELOW,
              params: {
                place: BANNER_TYPES.MIDDLE_BELOW,
              },
            })
          ),
          dispatch(getTestTypes()),
          dispatch(
            getSelections({
              apiType: SELECTION_API_TYPES.ENGLISH,
              params: { for_english: true },
            })
          ),
          dispatch(
            getSelections({
              apiType: SELECTION_API_TYPES.OLYMPIC,
              params: { olympic: true },
            })
          ),
          dispatch(
            getSubjects({
              apiType: SUBJECT_API_TYPES.SUBJECTS,
              params: {
                page: 1,
                page_size: 100,
                by_subjects: true,
              },
            })
          ),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const premiumTests = testTypes.filter(
    (testType) => testType.tariff_unique_name == TARIFF_TYPES.PREMIUM.code
  );

  const primeTests = testTypes.filter(
    (testType) => testType.tariff_unique_name == TARIFF_TYPES.PRIME.code
  );

  return (
    <>
      <TopBanners banners={topBanners} />
      <Link to="/auth/login">HIIII</Link>

      <TARIFF_LIST_WRAPPER>
        <div className="title">
          <div className="title-text">Premium test</div>
          <img className="title-info" src={InfoImg} />
        </div>
        <div className="list">
          {premiumTests.map((testType, index) => (
            <div className="list-item" key={index}>
              <img src={testType.image} />
              <div>{testType.title}</div>
            </div>
          ))}
        </div>
      </TARIFF_LIST_WRAPPER>

      <TARIFF_LIST_WRAPPER>
        <div className="title">
          <div className="title-text">Prime test</div>
          <img className="title-info" src={InfoImg} />
        </div>
        <div className="list">
          {primeTests.map((testType, index) => (
            <div className="list-item" key={index}>
              <img src={testType.image} />
              <div>{testType.title}</div>
            </div>
          ))}
        </div>
      </TARIFF_LIST_WRAPPER>
      <MiddleBanners banners={middleBanners} />

      {/* SUBJECT TESTS */}
      <SUBJECT_WRAPPER>
        <div className="section-title">Subject tests</div>
        <div className="subjects-list">
          {subjects.map((item) => (
            <div className="subject-item" key={item.id}>
              <img
                className="subject-image"
                src={item.image}
                alt={item.title}
              />
              <div className="subject-title">{item.title}</div>
            </div>
          ))}
        </div>
      </SUBJECT_WRAPPER>

      <MiddleBelowBanners banners={middleBelowBanners} />

      {/* OLYMPIC_TESTS */}
      <SUBJECT_WRAPPER>
        <div className="section-title">Subject tests</div>
        <div className="subjects-list">
          {olympicTests.map((item) => (
            <div className="subject-item" key={item.id}>
              <img
                className="subject-image"
                src={item.image}
                alt={item.title}
              />
              <div className="subject-title">{item.title}</div>
            </div>
          ))}
        </div>
      </SUBJECT_WRAPPER>

      <SUBJECT_WRAPPER>
        <div className="section-title">English tests</div>
        <div className="subjects-list">
          {englishTests.map((item) => (
            <div className="subject-item" key={item.id}>
              <img
                className="subject-image"
                src={item.image}
                alt={item.title}
              />
              <div className="subject-title">{item.title}</div>
            </div>
          ))}
        </div>
      </SUBJECT_WRAPPER>
    </>
  );
}

const TARIFF_LIST_WRAPPER = styled.div`
  margin-bottom: 50px;
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

  .list-item {
    border: 1px solid var(--secondary-color);
    border-radius: var(--radius-lg);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* background: var(--white-color); */

    padding: 20px 0;
    img {
      height: 50px;
    }
    div {
      text-align: center;
    }
  }
`;

const SUBJECT_WRAPPER = styled.div`
  .section-title {
    font-size: var(--font-size-lg);
  }

  .subjects-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 20px 0;
    gap: 20px;

    @media (max-width: 640px) {
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
  }
  .subject-item {
    border: 1px solid var(--slate-color);
    /* background-color: var(--white-color); */
    border-radius: var(--radius-md);
    text-align: center;
    padding: 10px 0;
  }

  img {
    width: 50px;
  }
`;
