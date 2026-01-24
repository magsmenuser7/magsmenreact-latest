import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'; // 1. Added Outlet import
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Expertise from './pages/Expertise';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import BrandAudit from './pages/BrandAudit';
import Insights from './pages/Insights';
import Careers from './pages/Careers';
import PartnerWithUs from './pages/PartnerWithUs';
import Contact from './pages/Contact';
import BrandConsultingPage from './pages/BrandConsulting';
import PersonalBrandConsultingPage from './pages/PersonalBrandConsulting';
import ImageConsultingPage from './pages/ImageConsulting';
import CorporateRebrandingPage from './pages/CorporateRebranding';
import BrandExpressoPage from './pages/BrandExpresso';
import BrandCreationPage from './pages/BrandCreation';
import LinkFluencePage from './pages/LinkFluence';
import LaunchpadPage from './pages/Launchpad';
import BlogDetail from './pages/BlogDetails';
import ScrollToTopWithHash from './components/ScrollToTopWithHash';
import WorkDetails from './pages/workDetails'
import Media from './pages/Media';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Faqs from './pages/Faqs';
import NewsletterViewer from "./pages/NewsletterViewer";

// 2. Define a Layout Component that includes Header and Footer
const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders the child route's element (Home, About, etc.) */}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router basename="/magsmenreact/">
      <div className="min-h-screen bg-white">
        <ScrollToTopWithHash headerOffset={80} />
        
        <Routes>
          {/* GROUP 1: All pages that REQUIRE Header & Footer */}
          {/* We wrap them in the MainLayout route */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/brand-audit" element={<BrandAudit />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/partner-with-us" element={<PartnerWithUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/brand-consulting" element={<BrandConsultingPage />} />
            <Route path="/personal-brand-consulting" element={<PersonalBrandConsultingPage />} />
            <Route path="/image-consulting" element={<ImageConsultingPage />} />
            <Route path="/corporate-rebranding" element={<CorporateRebrandingPage />} />
            <Route path="/brand-expresso" element={<BrandExpressoPage />} />
            <Route path="/brand-creation" element={<BrandCreationPage />} />
            <Route path="/link-fluence" element={<LinkFluencePage />} />
            <Route path="/launchpad" element={<LaunchpadPage />} />
            <Route path="/workdetails" element={<WorkDetails />} />
            <Route path="/media" element={<Media />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
          </Route>

          {/* GROUP 2: Pages WITHOUT Header & Footer */}
          {/* This sits outside the MainLayout */}
          <Route path="/:slug" element={<NewsletterViewer />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import About from './pages/About';
// import Expertise from './pages/Expertise';
// import CaseStudies from './pages/CaseStudies';
// import CaseStudyDetail from './pages/CaseStudyDetail';
// import BrandAudit from './pages/BrandAudit';
// import Insights from './pages/Insights';
// import Careers from './pages/Careers';
// import PartnerWithUs from './pages/PartnerWithUs';
// import Contact from './pages/Contact';
// import BrandConsultingPage from './pages/BrandConsulting';
// import PersonalBrandConsultingPage from './pages/PersonalBrandConsulting';
// import ImageConsultingPage from './pages/ImageConsulting';
// import CorporateRebrandingPage from './pages/CorporateRebranding';
// import BrandExpressoPage from './pages/BrandExpresso';
// import BrandCreationPage from './pages/BrandCreation';
// import LinkFluencePage from './pages/LinkFluence';
// import LaunchpadPage from './pages/Launchpad';
// import BlogDetail from './pages/BlogDetails';
// import ScrollToTopWithHash from './components/ScrollToTopWithHash';
// import WorkDetails from './pages/workDetails'
// import Media from './pages/Media';
// import PrivacyPolicy from './pages/PrivacyPolicy';
// import Faqs from './pages/Faqs';
// import NewsletterViewer from "./pages/NewsletterViewer";
// import { useLocation } from "react-router-dom";




// function App() {
  
//   return (
//     <Router basename="/magsmenreact/">
//       <div className="min-h-screen bg-white">
//         <ScrollToTopWithHash headerOffset={80} />
//         <Header />
//         <main>
//           <Routes>

//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/expertise" element={<Expertise />} />
//             <Route path="/case-studies" element={<CaseStudies />} />
//             <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
//             <Route path="/brand-audit" element={<BrandAudit />} />
//             <Route path="/insights" element={<Insights />} />
//             <Route path="/careers" element={<Careers />} />
//             <Route path="/partner-with-us" element={<PartnerWithUs />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/brand-consulting" element={<BrandConsultingPage />} />
//             <Route path="/personal-brand-consulting" element={<PersonalBrandConsultingPage />} />
//             <Route path="/image-consulting" element={<ImageConsultingPage />} />
//             <Route path="/corporate-rebranding" element={<CorporateRebrandingPage />} />
//             <Route path="/brand-expresso" element={<BrandExpressoPage />} />
//             <Route path="/brand-creation" element={<BrandCreationPage />} />
//             <Route path="/link-fluence" element={<LinkFluencePage />} />
//             <Route path="/launchpad" element={<LaunchpadPage />} />
//             <Route path="/workdetails" element={<WorkDetails />} />
//             <Route path="/media" element={<Media />} />
//             <Route path="/faqs" element={<Faqs />} />
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/:slug" element={<NewsletterViewer />} />
//             <Route path="/blog/:slug" element={<BlogDetail />} />
            
            
            
//             {/* <Route path="/blog-details" element={<BlogDetail />} /> */}
//           </Routes>
//         </main>
//        <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;







