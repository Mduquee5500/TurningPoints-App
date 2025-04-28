import { Routes, Route } from "react-router-dom";
import { Login } from "@/auth/login.tsx";
import Layout from "@/layout/layout.tsx";
import UploadFile from "@/upload-file";
import Dashboard from "@/dashboard";
import AccountCreation from "@/createAccount/userCreation";

import Reports from "@/reports";
import ReportIntake from "@/reports/reportIntake";
import ReportFlowThrough from "@/reports/flow-through";
import ReportRentSupplement from "@/reports/rent-supplement-request";
import ReportGoalsProgress from "@/reports/goals-and-progress";
import ReportSafetyPlan from "@/reports/safety-plan";
import ReportOverdoseSafetyPlan from "@/reports/overdose-safety-plan";
import ReportIncident from "@/reports/incident-report";
import ReportIndividuals from "@/reports/individuals-report";
import ReportShelterDiversion from "@/reports/shelter-diversion-log";
import ReportSiteList from "@/reports/site-list";
import ReportLOS from "@/reports/loss-of-service/index.tsx";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/UploadFile" element={<UploadFile />} />
      <Route path="/Search" element={<UploadFile />} />
      <Route path="/Report" element={<Reports />} />
      <Route path="/CreateAccount" element={<AccountCreation />} />

      <Route path="/report/intake-reporting" element={<ReportIntake />} />
      <Route path="/report/flow-through/:id" element={<ReportFlowThrough />} />
      <Route path="/report/loss-of-service/:id" element={<ReportLOS />} />
      <Route
        path="/report/goals-and-progress/:id"
        element={<ReportGoalsProgress />}
      />
      <Route path="/report/incident-report/:id" element={<ReportIncident />} />
      <Route
        path="/report/individuals-report/:id"
        element={<ReportIndividuals />}
      />
      <Route
        path="/report/overdose-safety-plan/:id"
        element={<ReportOverdoseSafetyPlan />}
      />
      <Route path="/report/safety-plan/:id" element={<ReportSafetyPlan />} />
      <Route
        path="/report/rent-supplement-request/:id"
        element={<ReportRentSupplement />}
      />
      <Route
        path="/report/shelter-diversion-log/:id"
        element={<ReportShelterDiversion />}
      />
      <Route path="/report/site-list/:id" element={<ReportSiteList />} />

      <Route
        path="/report/rent-supplement-request"
        element={<ReportRentSupplement />}
      />
      <Route
        path="/report/goals-and-progress"
        element={<ReportGoalsProgress />}
      />
      <Route path="/report/safety-plan" element={<ReportSafetyPlan />} />
      <Route
        path="/report/overdose-safety-plan"
        element={<ReportOverdoseSafetyPlan />}
      />
      <Route path="/report/incident-report" element={<ReportIncident />} />
      <Route
        path="/report/individuals-report"
        element={<ReportIndividuals />}
      />
      <Route
        path="/report/shelter-diversion-log"
        element={<ReportShelterDiversion />}
      />
      <Route path="/report/site-list" element={<ReportSiteList />} />
    </Route>
  </Routes>
);

export default AppRoutes;
