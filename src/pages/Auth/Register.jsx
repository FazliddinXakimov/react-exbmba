import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";
import { Link } from "react-router-dom";
import BaseInput from "../../components/BaseComponents/BaseInput";
import BaseButton from "../../components/BaseComponents/BaseButton";
import BaseSelect from "../../components/BaseComponents/BaseSelect";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    phone: yup
      .string()
      .matches(/^\+998 \d{2} \d{3} \d{2} \d{2}$/, "Invalid phone number format")
      .required("Phone number is required"),
    region: yup.string().required("Region is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  })
  .required();

export default function Register() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const regionOptions = [
    { value: "tashkent", label: "Tashkent" },
    { value: "samarkand", label: "Samarkand" },
  ];

  return (
    <RegisterWrapper>
      <h2 className="register-title">Welcome to our Platform!</h2>
      <p className="to-login">
        Already have an account?{" "}
        <Link to="/auth/login" className="to-register">
          Sign in
        </Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="Phone"
          name="phone"
          type="tel"
          control={control}
          error={errors.phone}
        />
        <BaseInput
          label="First Name"
          name="firstName"
          control={control}
          error={errors.firstName}
        />
        <BaseInput
          label="Last Name"
          name="lastName"
          control={control}
          error={errors.lastName}
        />

        <BaseSelect
          name="region"
          label="Region"
          options={regionOptions}
          control={control}
          error={errors.region}
        />

        <BaseInput
          label="Password"
          name="password"
          type="password"
          control={control}
          error={errors.password}
        />
        <BaseInput
          label="Password Confirmation"
          name="passwordConfirm"
          type="password"
          control={control}
          error={errors.passwordConfirm}
        />

        <BaseButton className="submit-btn" type="submit">
          Register
        </BaseButton>
      </form>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div`
  margin-top: 20px;

  .register-title {
    font-weight: 600;
    font-size: var(--font-size-lg);
    text-align: center;
    margin-bottom: 10px;
  }

  .to-login {
    text-align: center;
    margin-bottom: 20px;
    font-size: var(--font-size-md);
    a {
      color: var(--blue-color);
      text-decoration: none;
      font-weight: bold;
    }
  }

  button {
    width: 100%;
    margin-top: 30px;
    background: var(--primary-color);
  }
`;
