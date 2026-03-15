import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { HRConsulting } from "./pages/HRConsulting";
import { FinancialConsulting } from "./pages/FinancialConsulting";
import { LegalConsulting } from "./pages/LegalConsulting";
import { ITConsulting } from "./pages/ITConsulting";
import { HireThroughOfstride } from "./pages/HireThroughOfstride";
import { ApplyForJobs } from "./pages/ApplyForJobs";
import { About } from "./pages/About";
import { Founder } from "./pages/Founder";
import { Team } from "./pages/Team";
import { Contact } from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hr-consulting" element={<HRConsulting />} />
          <Route path="/financial-consulting" element={<FinancialConsulting />} />
          <Route path="/legal-consulting" element={<LegalConsulting />} />
          <Route path="/it-consulting" element={<ITConsulting />} />
          <Route path="/hire-through-ofstride" element={<HireThroughOfstride />} />
          <Route path="/apply-for-jobs" element={<ApplyForJobs />} />
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<Founder />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
