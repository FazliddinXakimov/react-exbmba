import React from "react";
import styled from "styled-components";
import BaseButton from "../../components/BaseComponents/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../assets/images/avatar.png";
import LogoutModal from "../../components/Modals/LogoutModal";
import { setLogoutModal } from "../../store/slices/modalSlice";

export default function UserInformation() {
  // const userStore = useUser
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log("user", user);

  return (
    <>
      <UserInformationWrapper>
        <div className="user-card">
          <div className=" user-top-info">
            <img
              src={user.image ? user.image : Avatar}
              className="user-avatar"
              alt="user image"
            />

            <div className="user-name">{user.full_name}</div>
          </div>

          <div className="user-info">
            <div>Hudud</div>
            <div>{user.region_id ? user.region_id : "Mavjud emas"}</div>
          </div>
          <div className="user-info">
            <div>Premium</div>
            <div>{user.region_id ? user.region_id : "Mavjud emas"}</div>
          </div>
          <div className="user-info">
            <div>Prime</div>
            <div>{user.region_id ? user.region_id : "Mavjud emas"}</div>
          </div>

          <div className="user-info">
            <div>Akkountni o`chirish</div>
            <BaseButton color="danger" isOutline={true}>
              Delete Account
            </BaseButton>
          </div>
        </div>
        <div className="actions-group">
          <BaseButton color="primary" fullwidth={true}>
            Edit
          </BaseButton>
          <BaseButton
            onClick={() => dispatch(setLogoutModal(true))}
            color="danger"
            fullwidth
          >
            Logout
          </BaseButton>
        </div>
      </UserInformationWrapper>

      <LogoutModal />
    </>
  );
}

const UserInformationWrapper = styled.div`
  .user-card {
    padding: 12px 16px;
    border: 2px solid var(--primary-color);
    border-radius: var(--radius-md);
  }

  .user-top-info {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--slate-color);
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
    padding: 4px;
    border-radius: 50%;
    border: 1px solid var(--slate-color);
  }

  .user-name {
    font-size: var(--font-size-md);
    font-weight: 600;
  }

  .actions-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
  }
`;
