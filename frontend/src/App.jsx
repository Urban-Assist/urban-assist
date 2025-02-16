import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import Home from "./pages/Home";
import "./App.css";
import { frontendRoutes } from "./utils/frontendRoutes";


import LoadAnimation from "./components/LoadAnimation";
import Header from "./components/Header";
const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
const ProviderDashboard = React.lazy(() => import("./pages/ProviderDashboard"));
const ServiceProviders = React.lazy(() => import("./pages/ServiceProviders"));
const PortfolioPage = React.lazy(() => import("./pages/PortfolioPage"));
const Login = React.lazy(() => import("./pages/Login"));
const RegistrationPage = React.lazy(() => import("./pages/Registration"));
const ProviderAvailibility = React.lazy(() => import("./pages/ProviderAvailibility"));
const ClientBookingPage = React.lazy(() => import("./pages/BookingSlots"));
const PortfolioMakerPage = React.lazy(() => import("./pages/PortfolioMaker"));
const TermsAndConditions = React.lazy(() =>import("./pages/TermsAndConditions"));


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
            path={frontendRoutes.HOME}
            element={<IncludeNavbar Component={Home} />}
          />
          <Route
            path={frontendRoutes.DASHBOARD}
            element={<IncludeNavbar Component={UserDashboard} />}
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
            element={<IncludeNavbar Component={ProviderAvailibility} />}
          />
          <Route
            path={frontendRoutes.BOOKING}
            element={<IncludeNavbar Component={ClientBookingPage} />}
          />
          <Route
            path={frontendRoutes.PROVIDER_DASHBOARD}
            element={<IncludeNavbar Component={ProviderDashboard} />}
          />
          <Route
            path={`${frontendRoutes.REGISTER_SERVICE}/:providerName`}
            element={<IncludeNavbar Component={PortfolioMakerPage} />}
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
const IncludeNavbar = ({ Component }) => (
  <>
    <Header />
    <Suspense fallback={<LoadAnimation />}>
      <Component />
    </Suspense>
  </>
);
export default App;
