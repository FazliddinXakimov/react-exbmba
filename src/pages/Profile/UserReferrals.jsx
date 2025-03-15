import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getReferrals,
  getReferralStatistics,
} from "../../store/actions/userActions";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import BaseButton from "../../components/BaseComponents/BaseButton";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import InviteFriendsModal from "../../components/Modals/InviteFriendsModal";
import { setInviteFriendsModal } from "../../store/slices/modalSlice";

export default function UserReferrals() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const referrals = useSelector((state) => state.user.referrals?.results || []);
  const referralStatistics = useSelector((state) => state.referralStatistics);
  const totalCount = useSelector((state) => state.user.referrals?.count || 0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize);

  const columns = [
    {
      accessorKey: "referred",
      header: "referrer_name",
    },
    {
      accessorKey: "date",
      header: "date",
    },
    {
      accessorKey: "bonus",
      header: "profit",
    },
  ];
  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      dispatch(getReferralStatistics()),
      dispatch(
        getReferrals({
          page,
          page_size: pageSize,
        })
      ),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  return (
    <UserReferralWrapper>
      <BaseButton
        className="invite-friends"
        color="primary"
        isOutline
        fullwidth
        onClick={() => dispatch(setInviteFriendsModal(true))}
      >
        Invite Friends
      </BaseButton>

      <div className="statistic-list">
        <div className="statistic-item">
          <div>{t("number_of_referrals")}:</div>
          <div>{referralStatistics?.total_referrals || 0}</div>
        </div>

        <div className="statistic-item">
          <div>{t("Sum")} :</div>
          <div>{referralStatistics?.total_bonus || 0} sum</div>
        </div>

        <div className="statistic-item">
          <div>{t("number_of_referrals_purchases")} :</div>
          <div>{referralStatistics?.total_active_referrals || 0}</div>
        </div>
        <div className="statistic-item">
          <div>{t("amount_of_withdraw")} :</div>
          <div>{referralStatistics?.total_available_bonus || 0} sum</div>
        </div>
      </div>

      <Table columns={columns} data={referrals} loading={loading} />
      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      )}

      {totalCount / pageSize > 1 && (
        <Pagination page={page} setPage={setPage} count={totalCount} />
      )}

      <InviteFriendsModal />
    </UserReferralWrapper>
  );
}

const UserReferralWrapper = styled.div`
  .invite-friends {
    margin-bottom: 20px;
  }

  .statistic-list {
    margin-bottom: 10px;
  }

  .statistic-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
