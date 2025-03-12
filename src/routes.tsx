import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import React, { lazy, Suspense } from "react";
import GlobalLoader from "./components/GlobalLoader"; // Import the new loader

const Home = lazy(() => import("./pages/Home"));
const Leaders = lazy(() => import("./pages/Leaders/index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserInformation = lazy(() => import("./pages/Profile/UserInformation"));
const UserReferrals = lazy(() => import("./pages/Profile/UserReferrals"));
const Tests = lazy(() => import("./pages/Tests/index"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const UserResults = lazy(() => import("./pages/Profile/UserResults"));
const UserSubscriptions = lazy(() =>
  import("./pages/Profile/UserSubscriptions")
);
const EditUserInformation = lazy(() =>
  import("./pages/Profile/EditUserInformation")
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route
            path="/profile/user-information"
            element={<UserInformation />}
          />
          <Route
            path="/profile/edit-user-information"
            element={<EditUserInformation />}
          />
          <Route path="/profile/user-referrals" element={<UserReferrals />} />
          <Route path="/profile/user-results" element={<UserResults />} />
          <Route
            path="/profile/user-subscriptions"
            element={<UserSubscriptions />}
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
