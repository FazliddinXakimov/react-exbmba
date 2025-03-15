import React from "react";
import BaseModal from "../BaseComponents/BaseModal";
import BaseButton from "../BaseComponents/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import {
  setInviteFriendsModal,
  setSuccessModal,
} from "../../store/slices/modalSlice";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const InviteFriendsModal = () => {
  const dispatch = useDispatch();
  const inviteFriendsModal = useSelector(
    (state) => state.modal.inviteFriendsModal
  );
  const hashId = useSelector((state) => state.user.user.hashed_id);
  const { t } = useTranslation();

  const clickClipboard = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(
        `https://t.me/Exbmba_bot?start=getCommand-referral=${hashId}`
      );

      dispatch(setInviteFriendsModal(false));

      dispatch(
        setSuccessModal({ modal: true, text: t("copied_to_clipboard") })
      );
    }
  };

  return (
    <BaseModal
      isOpen={inviteFriendsModal}
      onClose={() => dispatch(setInviteFriendsModal(false))}
      size={"md"}
    >
      <InviteModalWrapper>
        <div className="title">{t("link_for_offer")}</div>
        <div className="copied-item">
          {`https://t.me/Exbmba_bot?start=getCommand-referral=${hashId}`}
        </div>
        <BaseButton onClick={clickClipboard} color="primary" fullwidth>
          {t("copy")}
        </BaseButton>
      </InviteModalWrapper>
    </BaseModal>
  );
};

export default InviteFriendsModal;

const InviteModalWrapper = styled.div`
  .title {
    text-align: center;
    font-size: var(--font-size-md);
    font-weight: 600;
    margin-bottom: 10px;
  }

  .copied-item {
    margin-bottom: 10px;
  }
`;
