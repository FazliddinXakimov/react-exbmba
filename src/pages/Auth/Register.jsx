import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseInput from "../../components/BaseComponents/BaseInput";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseInput
        label="First Name"
        name="firstName"
        register={register}
        error={errors.firstName}
      />
      <BaseInput
        label="Age"
        name="age"
        type="number"
        register={register}
        error={errors.age}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
