import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "../../store/actions/billlingActions";
import styled from "styled-components";
import PrimeIcon from "@/assets/images/prime_icon.png";
import PremiumIcon from "@/assets/images/premium_icon.png";
import { useTranslation } from "react-i18next";
import { formatDate, formatMoney } from "../../utils/formatters";

const UserSubscriptions = () => {
  const dispatch = useDispatch();
  const mySubscriptions = useSelector((state) => state.billing.mySubscriptions);

  const { t } = useTranslation();

  async function fetchData() {
    await dispatch(getSubscriptions());
    console.log("mySubscriptions", mySubscriptions);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SubscriptionWrapper>
      {mySubscriptions.results.map((item) => (
        <div className="subscription-item" key={item.id}>
          <div className="subscription-title">
            <img
              src={item.tariff.unique_name == "prime" ? PrimeIcon : PremiumIcon}
              className="tariff-icon"
            />
            <div>{item.tariff.name}</div>
          </div>

          <div className="subscription-info">
            <span>{t("price")}:</span>
            <span>{formatMoney(item.price / 100)}</span>
          </div>
          <div className="subscription-info">
            <span>{t("start_date")}:</span>
            <span>{formatDate(item.created)}</span>
          </div>
          <div className="subscription-info">
            <span>{t("end_date")}:</span>
            <span>{formatDate(item.expire_date, "DD/MM/YYYY")}</span>
          </div>
        </div>
      ))}
    </SubscriptionWrapper>
  );
};

export default UserSubscriptions;

const SubscriptionWrapper = styled.div`
  .subscription-item {
    border: 1px solid var(--slate-color);
    height: 150px;
    margin-bottom: 10px;
    border-radius: var(--radius-lg);
    padding: 20px;
    position: relative;
  }
  .subscription-title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .tariff-icon {
    width: 20px;
  }

  .subscription-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
`;
