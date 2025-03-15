import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BaseInput from "../../components/BaseComponents/BaseInput";
import BaseButton from "../../components/BaseComponents/BaseButton";
import BaseSelect from "../../components/BaseComponents/BaseSelect";
import Avatar from "../../assets/images/avatar.png";
import Camera from "../../assets/images/camera.png";
import { getRegions } from "../../store/actions/referencesActions";
import { getMe, updateUser } from "../../store/actions/userActions";
import { setSuccessModal } from "../../store/slices/modalSlice";
import { useTranslation } from "react-i18next";

const schema = yup
  .object({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    region: yup.string().required("Region is required"),
  })
  .required();

const EditUser = () => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const regions = useSelector((state) => state.references.regions);
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(user?.image || Avatar);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      region: user?.region_id || "",
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRegions());
    };

    fetchData();
  }, [dispatch]);

  const onSubmit = async (data) => {
    await dispatch(updateUser(data));
    await dispatch(getMe());

    dispatch(setSuccessModal({ modal: true, text: t("successfully_changed") }));
  };

  return (
    <EditUserWrapper>
      <h4 className="centered">Change Information</h4>

      <div className="centered">
        <span className="avatar-wrapper">
          <img src={previewImage} className="user-avatar" alt="user avatar" />
          <img
            className="camera-icon"
            src={Camera}
            alt="Change avatar"
            onClick={handleCameraClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="First Name"
          name="first_name"
          control={control}
          error={errors.first_name}
        />
        <BaseInput
          label="Last Name"
          name="last_name"
          control={control}
          error={errors.last_name}
        />

        <BaseSelect
          name="region"
          label="Region"
          options={regions}
          control={control}
          error={errors.region}
          getOptionValue={(option) => option.id} // Set value dynamically
          getOptionLabel={(option) => option.title} // Set label dynamically
        />

        <BaseButton
          isLoading={isSubmitting || loading}
          className="submit-btn"
          type="submit"
          fullwidth
        >
          Change
        </BaseButton>
      </form>
    </EditUserWrapper>
  );
};

export default EditUser;

const EditUserWrapper = styled.div`
  .centered {
    text-align: center;
  }

  h4 {
    margin-bottom: 20px;
  }

  .avatar-wrapper {
    position: relative;
    display: inline-block;
    margin: 0 auto 10px;
  }

  .user-avatar {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    /* padding: 5px; */
    border: 1px solid var(--primary-color);
  }

  .camera-icon {
    position: absolute;
    bottom: 3px;
    right: -5px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 7px;
    border: 1px solid var(--primary-color);
    cursor: pointer;
    background-color: var(--white-color);
  }

  .submit-btn {
    margin-top: 20px;
  }
`;
