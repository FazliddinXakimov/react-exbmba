import React from "react";
import BaseSelect from "../components/BaseComponents/BaseSelect";

export default function Home() {
  const options = [
    {
      firstName: "Fazliddin",
    },
  ];

  return (
    <>
      <BaseSelect options={options} name="firstName" />
    </>
  );
}
