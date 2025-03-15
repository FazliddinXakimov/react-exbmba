import React from "react";
import AppRoutes from "./routes";
import SuccessModal from "@/components/Modals/SuccessModal";
import FailModal from "@/components/Modals/FailModal";
import LanguageModal from "./components/Modals/LanguageModal";

function App() {
  return (
    <>
      <AppRoutes />
      <SuccessModal />
      <FailModal />
      <LanguageModal />
    </>
  );
}

export default App;
