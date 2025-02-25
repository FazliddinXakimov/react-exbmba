import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import React, { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Leaders = lazy(() => import("./pages/Leaders"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserInformation = lazy(() => import("./pages/Profile/UserInformation"));
const Tests = lazy(() => import("./pages/Tests/index"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route
            path="/profile/user-information"
            element={<UserInformation />}
          />
          <Route path="/tests" element={<Tests />} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
