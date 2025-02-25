import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseInput from "../../components/BaseComponents/BaseInput";
import styled from "styled-components";
import BaseButton from "../../components/BaseComponents/BaseButton";

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    age: yup.number().positive().integer().required("Age is required"),
  })
  .required();

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <LoginWrapper>
      <div className="login-title">Welcome to our Platform!</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          label="Phone"
          name="phone"
          register={register}
          error={errors.phone}
        />
        <BaseInput
          label="Password"
          name="password"
          type="password"
          register={register}
          error={errors.password}
        />

        <BaseButton className="submit-btn" type="submit">
          Submit
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
    margin-bottom: 30px;
  }

  button {
    width: 100%;
    margin-top: 30px;
    background: var(--primary-color);
  }
`;
