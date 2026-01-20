import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home";
import "./App.css";
import { frontendRoutes } from "./utils/frontendRoutes";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import LoadAnimation from "./components/LoadAnimation";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

const stripePromise = loadStripe('pk_test_51QnViyF1vLG8nlrHDfi0ryxde9fiAT2Mm3ND780vXmb3r7YbNZ2wPPrVMgAhUaT4h8UKbU8TTff6ed3woPYPYSrh007ojJgaVA');

const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
const ProviderDashboard = React.lazy(() => import("./pages/ProviderDashboard"));
const ProviderProfileSetup = React.lazy(() => import("./pages/ProviderProfileSetup"));
const ServiceProviders = React.lazy(() => import("./pages/ServiceProviders"));
const PortfolioPage = React.lazy(() => import("./pages/PortfolioPage"));
const Login = React.lazy(() => import("./pages/Login"));
const RegistrationPage = React.lazy(() => import("./pages/Registration"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const ProviderAvailibility = React.lazy(() => import("./pages/ProviderAvailibility"));
const ClientBookingPage = React.lazy(() => import("./pages/BookingSlots"));
const PortfolioMakerPage = React.lazy(() => import("./pages/PortfolioMaker"));
const TermsAndConditions = React.lazy(() => import("./pages/TermsAndConditions"));
const Payment = React.lazy(() => import("./pages/Payment"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const ProviderProfile = React.lazy(() => import("./pages/ProviderProfile"));
const MyBookings = React.lazy(() => import("./pages/MyBookings"));


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={frontendRoutes.LOGIN}
          element={<ExcludeNavbar Component={Login} />}
        />
        <Route
          path={frontendRoutes.REGISTER}
          element={<ExcludeNavbar Component={RegistrationPage} />}
        />
        <Route
          path="/forgot-password"
          element={<ExcludeNavbar Component={ForgotPassword} />}
        />
        <Route
          path="/reset-password"
          element={<ExcludeNavbar Component={ResetPassword} />}
        />
        <Route
          path={frontendRoutes.PAYMENT}
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'user']}>
              <ExcludeNavbarStripe Component={Payment} />
            </ProtectedRoute>
          }
        />

        <Route
          path={frontendRoutes.HOME}
          element={<IncludeNavbar Component={Home} />}
        />
        <Route
          path={frontendRoutes.DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'user']}>
              <IncludeNavbar Component={UserDashboard} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'user', 'ROLE_PROVIDER', 'provider', 'admin']}>
              <ProfileRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'user']}>
              <Suspense fallback={<LoadAnimation />}>
                <MyBookings />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${frontendRoutes.SERVICE}/:service`}
          element={<IncludeNavbar Component={ServiceProviders} />}
        />
        <Route
          path={`${frontendRoutes.PORTFOLIO}/:providerName`}
          element={<IncludeNavbar Component={PortfolioPage} />}
        />
        <Route
          path={frontendRoutes.ADD_AVAIBILITY}
          element={
            <ProtectedRoute allowedRoles={['ROLE_PROVIDER', 'provider', 'admin']}>
              <IncludeNavbar Component={ProviderAvailibility} />
            </ProtectedRoute>
          }
        />
        <Route
          path={frontendRoutes.BOOKING}
          element={
            <ProtectedRoute allowedRoles={['ROLE_USER', 'user']}>
              <IncludeNavbar Component={ClientBookingPage} />
            </ProtectedRoute>
          }
        />
        <Route
          path={frontendRoutes.PROVIDER_DASHBOARD}
          element={
            <ProtectedRoute allowedRoles={['ROLE_PROVIDER', 'provider', 'admin']}>
              <IncludeNavbar Component={ProviderDashboard} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider-setup"
          element={
            <ProtectedRoute allowedRoles={['ROLE_PROVIDER', 'provider', 'admin']}>
              <Suspense fallback={<LoadAnimation />}>
                <ProviderProfileSetup />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path={`${frontendRoutes.REGISTER_SERVICE}/:providerName`}
          element={
            <ProtectedRoute allowedRoles={['ROLE_PROVIDER', 'provider', 'admin']}>
              <IncludeNavbar Component={PortfolioMakerPage} />
            </ProtectedRoute>
          }
        />
        <Route
          path={frontendRoutes.TERMS_AND_CONDITIONS}
          element={<IncludeNavbar Component={TermsAndConditions} />}
        />
      </Routes>
    </Router>
  );
}
const ExcludeNavbar = ({ Component }) => (
  <Suspense fallback={<LoadAnimation />}>
    <Component />
  </Suspense>
);

const ExcludeNavbarStripe = ({ Component }) => (
  <Elements stripe={stripePromise}>
    <Suspense fallback={<LoadAnimation />}>
      <Component />
    </Suspense>
  </Elements>
);

const IncludeNavbar = ({ Component }) => (
  <>
    <Header />
    <Suspense fallback={<LoadAnimation />}>
      <Component />
    </Suspense>
  </>
);

const ProfileRouter = () => {
  const [userRole, setUserRole] = React.useState(null);

  React.useEffect(() => {
    const role = localStorage.getItem('token') ?
      JSON.parse(atob(localStorage.getItem('token').split('.')[1]))?.roles?.[0] : null;
    setUserRole(role);
  }, []);

  if (!userRole) return <LoadAnimation />;

  const isProvider = userRole === 'ROLE_PROVIDER' || userRole === 'provider' || userRole === 'admin';

  return (
    <>
      <Header />
      <Suspense fallback={<LoadAnimation />}>
        {isProvider ? <ProviderProfile /> : <UserProfile />}
      </Suspense>
    </>
  );
};

export default App;
