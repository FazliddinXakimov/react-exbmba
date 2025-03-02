import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseInput from "../../components/BaseComponents/BaseInput";
import styled from "styled-components";
import BaseButton from "../../components/BaseComponents/BaseButton";
import { Link } from "react-router-dom";
import { login } from "../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const schema = yup
  .object({
    phone: yup
      .string()
      .matches(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Invalid phone number format")
      .required("Phone number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user.loading);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const exportData = {
      phone: data.phone.split(" ").join(""),
      password: data.password,
    };

    const response = await dispatch(login(exportData));

    if (login.fulfilled.match(response)) {
      //
    } else if (login.rejected.match(response)) {
      //
    }
  };

  return (
    <LoginWrapper>
      <div className="login-title">Welcome to our Platform!</div>
      <div>{loading}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="Phone"
          name="phone"
          type="tel"
          register={register}
          error={errors.phone}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          isSubmitted={isSubmitted}
        />

        <BaseInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          isSubmitted={isSubmitted}
        />

        <BaseButton loading={loading} className="submit-btn" type="submit">
          Login
        </BaseButton>

        <div className="to-register">
          If you have not account, please{" "}
          <Link to="/auth/register" className="to-register">
            register
          </Link>
        </div>
      </form>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  margin-top: 20px;

  .login-title {
    font-weight: 600;
    font-size: var(--font-size-lg);
    text-align: center;
    margin-bottom: 30px;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }

  button {
    width: 100%;
    margin-top: 30px;
    background: var(--primary-color);
  }

  .to-register {
    text-align: center;
    margin-top: 15px;
    font-size: var(--font-size-md);
    a {
      color: var(--blue-color);
      cursor: pointer;
      text-decoration: none;
    }
  }
`;
