import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseInput from "../../components/BaseComponents/BaseInput";
import styled from "styled-components";
import BaseButton from "../../components/BaseComponents/BaseButton";
import { Link } from "react-router-dom";
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
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Password confirmation is required"),
  })
  .required();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    setValue,
    watch,
    trigger,
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
    <LoginWrapper>
      <div className="login-title">Welcome to our Platform!</div>
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
          label="First Name"
          name="firstName"
          register={register}
          error={errors.firstName}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          isSubmitted={isSubmitted}
        />
        <BaseInput
          label="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          isSubmitted={isSubmitted}
        />

        <BaseSelect
          name="region"
          label="Region"
          getOptionValue={(option) => option.value}
          getOptionLabel={(option)=>option.label}
          onChange={(selected) => {
            setValue("region", selected?.value || "");
            trigger("region");
          }}
          options={regionOptions}
          control={control}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          isSubmitted={isSubmitted}
          error={errors.region}
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
        <BaseInput
          label="Password Confirmation"
          name="passwordConfirm"
          type="password"
          register={register}
          error={errors.passwordConfirm}
          setValue={setValue}
          watch={watch}
          trigger={trigger}
          isSubmitted={isSubmitted}
        />
        <BaseButton className="submit-btn" type="submit">
          Register
        </BaseButton>
        <div className="to-login">
          If you have an account
          <Link to="/auth/login" className="to-register">
            {" "}
            login{" "}
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
  .to-login {
    text-align: center;
    margin-bottom: 30px;
    margin-top: 15px;
    font-size: var(--font-size-md);
    a {
      color: var(--blue-color);
      cursor: pointer;
      text-decoration: none;
    }
  }
`;
