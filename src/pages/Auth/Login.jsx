import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BaseInput from "../../components/BaseComponents/BaseInput";
import BaseButton from "../../components/BaseComponents/BaseButton";
import { getMe, login } from "../../store/actions/userActions";

const schema = yup.object({
  phone: yup
    .string()
    .matches(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Invalid phone number format")
    .required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const formattedData = {
      phone: data.phone.replace(/\s+/g, ""),
      password: data.password,
    };

    const response = await dispatch(login(formattedData));

    if (login.fulfilled.match(response)) {
      await dispatch(getMe());
      navigate("/", { replace: true });
    }
  };

  return (
    <LoginWrapper>
      <div className="login-title">Login</div>
      <div className="to-register">
        Dont have an account?{" "}
        <Link to="/auth/register" className="to-register">
          Sign up
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="Phone"
          name="phone"
          type="tel"
          control={control}
          error={errors.phone}
        />
        <BaseInput
          label="Password"
          name="password"
          type="password"
          control={control}
          error={errors.password}
        />

        <div className="forgot-password">
          <Link className="forgot-password" to="/auth/forgot-password">
            Forgot password?
          </Link>
        </div>

        <BaseButton
          isLoading={isSubmitting || loading}
          className="submit-btn"
          type="submit"
        >
          Login
        </BaseButton>
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
    margin-bottom: 10px;
  }

  .to-register {
    text-align: center;
    margin-bottom: 20px;
    font-size: var(--font-size-md);
    a {
      color: var(--blue-color);
      text-decoration: none;
    }
  }

  .forgot-password {
    color: var(--blue-color);
    display: block;
    text-align: right;
    margin-top: 10px;
  }

  button {
    width: 100%;
    margin-top: 30px;
    background: var(--primary-color);
  }
`;
