const fs = require('fs');
const path = require('path');

const pageMetadata = {
  'sap-business-one-partner-in-odisha/index.html': { category: 'areas', breadcrumb: 'Service Areas / Odisha', title: 'Odisha | Triztek', h1: 'Page Not Found.', desc: 'It looks like nothing was found at this location.' },
  'sap-business-one-partner-in-jharkhand/index.html': { category: 'areas', breadcrumb: 'Service Areas / Jharkhand', title: 'Jharkhand | Triztek', h1: 'Page Not Found.', desc: 'It looks like nothing was found at this location.' },
  'sap-business-one-partner-in-assam/index.html': { category: 'areas', breadcrumb: 'Service Areas / Assam', title: 'Assam | Triztek', h1: 'Page Not Found.', desc: 'It looks like nothing was found at this location.' },
  'sap-business-one-partner-in-bihar/index.html': { category: 'areas', breadcrumb: 'Service Areas / Bihar', title: 'Bihar | Triztek', h1: 'Page Not Found.', desc: 'It looks like nothing was found at this location.' },
  'blogs/index.html': { category: 'blogs', breadcrumb: 'Insights', title: 'SAP Business One Insights | Triztek', h1: 'Insights & <span class="tz-highlight">Resources</span>', desc: 'Practical insights, implementation guidance, and industry expertise from the Triztek team.' },
  'differences-between-sap-and-erp/index.html': { category: 'blogs', breadcrumb: 'Insights / Article', title: 'What are the Differences Between SAP and ERP | Triztek', h1: 'What are the <span class="tz-highlight">Differences Between SAP and ERP</span>', desc: 'An expert guide to choosing and understanding enterprise business technology.' },
  'phases-of-sap-business-one-implementation/index.html': { category: 'blogs', breadcrumb: 'Insights / Article', title: 'Phases of SAP Business One Implementation | Triztek', h1: 'Phases of <span class="tz-highlight">SAP Business One Implementation</span>', desc: 'A practical guide to a confident and successful ERP implementation.' },
  'test-rest/index.html': { category: 'blogs', breadcrumb: 'Insights / Article', title: 'Test rest | Triztek', h1: 'Triztek <span class="tz-highlight">Insights</span>', desc: 'Insights from the Triztek team.' },
  'contact-us/index.html': { category: 'contact', breadcrumb: 'Contact Us', title: 'Contact Triztek | SAP Business One Partner', h1: 'Let?s Start a <span class="tz-highlight">Conversation</span>', desc: 'Connect with our SAP Business One specialists for a tailored consultation.' },
  'carrers/index.html': { category: 'careers', breadcrumb: 'Careers', title: 'Careers at Triztek', h1: 'Build Your Career <span class="tz-highlight">With Triztek</span>', desc: 'Explore opportunities to build meaningful enterprise technology solutions.' },
  'plastic-manufacturing-industry/index.html': { category: 'industries', breadcrumb: 'Industries / Plastic Manufacturing', title: 'SAP ERP for Plastic Manufacturing | Triztek', h1: 'SAP ERP for <span class="tz-highlight">Plastic Manufacturing</span>', desc: 'Connected operational management for modern plastic manufacturing businesses.' },
  'sap-erp-electronics-industry/index.html': { category: 'industries', breadcrumb: 'Industries / Electronics', title: 'SAP ERP for Electronics Industry | Triztek', h1: 'SAP ERP for the <span class="tz-highlight">Electronics Industry</span>', desc: 'Improve planning, traceability, and performance across electronics operations.' },
  'sap-erp-for-chemical-industry/index.html': { category: 'industries', breadcrumb: 'Industries / Chemical', title: 'SAP ERP for Chemical Industry | Triztek', h1: 'SAP ERP for the <span class="tz-highlight">Chemical Industry</span>', desc: 'Improve formula management, compliance, and traceability with SAP Business One.' },
  'index.html': {
    category: 'home',
    title: 'SAP Business One Partner Kolkata | SAP Implementation Partner',
    h1: 'Small Businesses Have a Lot on Their Plate — <span class="tz-highlight">Say Goodbye to Process Complexities With SAP Business One</span>',
    desc: 'Triz Technologies is an authorized SAP Business One partner in Kolkata delivering tailored ERP solutions, agile implementation, customizations, and 24/7 dedicated support.'
  },
  'index-2.html': {
    category: 'solutions',
    title: 'SAP Business One On Premise | Triztek',
    h1: 'SAP Business One On-Premise ERP — <span class="tz-highlight">Maximum Control & Performance</span>',
    desc: 'Empower your enterprise with dedicated on-premise infrastructure, tailored database integration, and high security for full process governance.'
  },
  'index-3.html': {
    category: 'solutions',
    title: 'SAP Business One HANA | Triztek',
    h1: 'SAP Business One HANA — <span class="tz-highlight">In-Memory Computing & Real-Time Analytics</span>',
    desc: 'Accelerate decision-making with high-speed in-memory database processing, advanced operational dashboards, and predictive forecasting.'
  },
  'about-us/index.html': {
    category: 'about',
    breadcrumb: 'About Us',
    title: 'About Triz Technologies | Authorized SAP Business One Partner',
    h1: 'About Triz Technologies — <span class="tz-highlight">Premier SAP Business One Partner in Kolkata</span>',
    desc: 'Delivering end-to-end ERP implementations, business process re-engineering, and mission-critical enterprise support across India.'
  },
  'crystal-reports/index.html': {
    category: 'services',
    breadcrumb: 'Services / Crystal Reports',
    title: 'Crystal Reports for SAP Business One | Triztek',
    h1: 'Crystal Reports for <span class="tz-highlight">SAP Business One</span>',
    desc: 'Transform raw enterprise data into actionable, pixel-perfect management reports, regulatory statements, and dynamic visual dashboards.'
  },
  'smart-data-analytics/index.html': {
    category: 'services',
    breadcrumb: 'Services / Smart Data Analytics',
    title: 'Smart Data Analytics for SAP Business One | Triztek',
    h1: 'Smart Data Analytics for <span class="tz-highlight">SAP Business One</span>',
    desc: 'Gain real-time business visibility and competitive intelligence with custom KPI dashboards and automated data warehousing.'
  },
  'maintenance/index.html': {
    category: 'services',
    breadcrumb: 'Services / Maintenance',
    title: 'SAP Business One Maintenance & Support | Triztek',
    h1: 'SAP Business One Maintenance & <span class="tz-highlight">Support Services</span>',
    desc: 'Ensure system uptime, peak database performance, routine patching, and responsive functional assistance for your SAP landscape.'
  },
  'customization/index.html': {
    category: 'services',
    breadcrumb: 'Services / Customization',
    title: 'SAP Business One Customization Services | Triztek',
    h1: 'SAP Business One Customization & <span class="tz-highlight">Integration Services</span>',
    desc: 'Tailor workflows, develop specialized add-ons, and integrate third-party applications seamlessly with SAP Business One SDK & Service Layer.'
  },
  'implementation/index.html': {
    category: 'services',
    breadcrumb: 'Services / Implementation',
    title: 'SAP Business One Implementation Kolkata | Triztek',
    h1: 'SAP Business One Implementation <span class="tz-highlight">Services in Kolkata</span>',
    desc: 'Structured, proven implementation methodology ensuring rapid onboarding, data cleansing, user training, and predictable go-live success.'
  },
  'sap-business-one-iot-integration/index.html': {
    category: 'services',
    breadcrumb: 'Services / IoT Integration',
    title: 'SAP Business One IoT Integration | Triztek',
    h1: 'SAP Business One <span class="tz-highlight">IoT Integration Solutions</span>',
    desc: 'Connect plant-floor sensors, machinery, and smart devices directly to SAP Business One for automated telemetry and real-time production tracking.'
  },
  'sap-business-one-cloud/index.html': {
    category: 'solutions',
    breadcrumb: 'Solutions / SAP Business One Cloud',
    title: 'SAP Business One Cloud Solutions | Triztek',
    h1: 'SAP Business One Cloud — <span class="tz-highlight">Scalable, Secure, Anywhere Access</span>',
    desc: 'Lower total cost of ownership with enterprise-grade cloud hosting, automated backups, and 99.9% uptime for distributed teams.'
  },
  'sap-business-one-hybrid/index.html': {
    category: 'solutions',
    breadcrumb: 'Solutions / SAP Business One Hybrid',
    title: 'SAP Business One Hybrid ERP | Triztek',
    h1: 'SAP Business One Hybrid — <span class="tz-highlight">Best of Cloud & On-Premise</span>',
    desc: 'Combine on-site operational stability with cloud scalability and remote employee access for a balanced enterprise architecture.'
  },
  'sap-business-one-mobility/index.html': {
    category: 'solutions',
    breadcrumb: 'Solutions / SAP Business One Mobility',
    title: 'SAP Business One Mobility Solutions | Triztek',
    h1: 'SAP Business One Mobility — <span class="tz-highlight">Enterprise Control on Mobile</span>',
    desc: 'Enable field sales, service personnel, and warehouse staff with intuitive mobile apps connected directly to your core SAP ERP.'
  },
  'sap-business-one-e-invoicing/index.html': {
    category: 'solutions',
    breadcrumb: 'Solutions / E-Invoicing',
    title: 'SAP Business One E-Invoicing Solution India | Triztek',
    h1: 'SAP Business One E-Invoicing & <span class="tz-highlight">GST Compliance Solution</span>',
    desc: 'Automate IRN generation, QR code embedding, and GST e-Way bills directly within SAP Business One without third-party manual steps.'
  },
  'sap-b1-apparel/index.html': {
    category: 'solutions',
    breadcrumb: 'Solutions / SAP B1 Apparel',
    title: 'SAP Business One for Apparel & Garment Industry | Triztek',
    h1: 'SAP Business One ERP for <span class="tz-highlight">Apparel & Garment Industry</span>',
    desc: 'End-to-end management of style-size-color matrix, raw material sourcing, cutting, batch tracing, and retail dispatch.'
  },
  'process-manufacturing/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Process Manufacturing',
    title: 'SAP ERP for Process Manufacturing | Triztek',
    h1: 'SAP ERP for <span class="tz-highlight">Process Manufacturing</span>',
    desc: 'Formula and recipe management, batch traceability, quality control, expiry tracking, and regulatory compliance for process manufacturers.'
  },
  'food-and-beverage-industry/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Food & Beverage',
    title: 'SAP Business One ERP for Food & Beverage | Triztek',
    h1: 'SAP Business One ERP for <span class="tz-highlight">Food & Beverage Industry</span>',
    desc: 'Ensure ingredient traceability, strict shelf-life control, recipe consistency, and FSSAI compliance across production and distribution.'
  },
  'pharmaceutical/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Pharmaceutical',
    title: 'SAP Business One ERP for Pharmaceutical Industry | Triztek',
    h1: 'SAP Business One ERP for <span class="tz-highlight">Pharmaceutical Industry</span>',
    desc: 'Strict GMP adherence, batch testing, electronic approvals, formulation control, and comprehensive audit trails for pharmaceutical firms.'
  },
  'flavours-fragrances-industry/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Flavours & Fragrances',
    title: 'SAP ERP for Flavours & Fragrances Industry | Triztek',
    h1: 'SAP ERP for <span class="tz-highlight">Flavours & Fragrances Industry</span>',
    desc: 'Precise ingredient proportioning, scent formulation versioning, chemical compliance, and specialized batch costing.'
  },
  'oil-lubricants-industry/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Oil & Lubricants',
    title: 'SAP ERP for Oil & Lubricants Industry | Triztek',
    h1: 'SAP ERP for <span class="tz-highlight">Oil & Lubricants Industry</span>',
    desc: 'Blending batch management, bulk volume-to-weight conversions, multi-tier packaging, and hazardous materials tracking.'
  },
  'sap-erp-for-tea-industry/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Tea Industry',
    title: 'SAP ERP for Tea Industry in India | Triztek',
    h1: 'SAP ERP for <span class="tz-highlight">Tea Industry & Plantations</span>',
    desc: 'Complete garden-to-cup traceability, green leaf procurement, factory processing, auction bidding, and blend packaging management.'
  },
  'sap-erp-for-aluminium-extrusion/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Aluminium Extrusion',
    title: 'SAP Business One ERP for Aluminium Extrusion | Triztek',
    h1: 'SAP Business One ERP for <span class="tz-highlight">Aluminium Extrusion</span>',
    desc: 'Billet cutting, die life cycle management, heat treatment logging, scrap recovery calculation, and dimensional quality inspection.'
  },
  'sap-erp-for-leather-industry/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Leather Industry',
    title: 'SAP ERP for Leather Industry in India | Triztek',
    h1: 'SAP ERP for <span class="tz-highlight">Leather Industry & Tanning</span>',
    desc: 'Hide grading, square footage measurement, tanning chemical dosage, yield analysis, and finished leather dispatch tracking.'
  },
  'sap-erp-for-transport-company/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Transport & Logistics',
    title: 'SAP ERP for Transport & Logistics Company | Triztek',
    h1: 'SAP ERP for <span class="tz-highlight">Transport & Fleet Management</span>',
    desc: 'Consignment booking, vehicle maintenance, driver trip sheets, fuel monitoring, freight invoicing, and delivery tracking.'
  },
  'sap-erp-for-retail-industry/index.html': {
    category: 'industries',
    breadcrumb: 'Industries / Retail Industry',
    title: 'SAP ERP for Retail Industry in India | Triztek',
    h1: 'SAP ERP for <span class="tz-highlight">Retail & Multi-Store Management</span>',
    desc: 'POS integration, multi-store stock replenishment, barcode scanning, loyalty program tracking, and automated pricing tiers.'
  }
};

function getHeader(prefix, category) {
  return `
<!-- TRIZTEK ENTERPRISE HEADER -->
<header class="tz-main-header" id="masthead">
  <div class="tz-header-wrapper">
    <div class="tz-brand-area">
      <a href="${prefix}index.html" class="tz-brand-link" aria-label="Triztek Home">
        <img src="${prefix}assets/images/TRIZ_logo_web_transperant.png" alt="Triztek Logo" class="tz-brand-logo" width="160" height="48">
      </a>
      <div class="tz-partner-badge-header">
        <a href="https://triztek.com/" target="_blank" rel="noopener" title="Authorized SAP Partner">
          <img src="${prefix}assets/images/SAP_Partner3.png" alt="SAP Partner Logo" width="68" height="38">
        </a>
      </div>
    </div>

    <!-- Desktop Navigation Menu -->
    <nav class="tz-nav-desktop" aria-label="Main Navigation">
      <ul class="tz-nav-list">
        <li class="tz-nav-item ${category === 'home' ? 'active' : ''}">
          <a href="${prefix}index.html" class="tz-nav-link">Home</a>
        </li>
        <li class="tz-nav-item ${category === 'about' ? 'active' : ''}">
          <a href="${prefix}about-us/index.html" class="tz-nav-link">About Us</a>
        </li>
        <li class="tz-nav-item ${category === 'services' ? 'active' : ''}">
          <a href="#" class="tz-nav-link">Services <i class="fas fa-angle-down"></i></a>
          <ul class="tz-dropdown-menu">
            <li class="tz-dropdown-item"><a href="${prefix}crystal-reports/index.html" class="tz-dropdown-link">Crystal Reports</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}smart-data-analytics/index.html" class="tz-dropdown-link">Smart Data Analytics</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}maintenance/index.html" class="tz-dropdown-link">Maintenance</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}customization/index.html" class="tz-dropdown-link">Customization</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}implementation/index.html" class="tz-dropdown-link">Implementation</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-business-one-iot-integration/index.html" class="tz-dropdown-link">IoT Integration</a></li>
          </ul>
        </li>
        <li class="tz-nav-item ${category === 'solutions' ? 'active' : ''}">
          <a href="#" class="tz-nav-link">Solutions <i class="fas fa-angle-down"></i></a>
          <ul class="tz-dropdown-menu">
            <li class="tz-dropdown-item"><a href="${prefix}index-2.html" class="tz-dropdown-link">SAP Business One On Premise</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}index-3.html" class="tz-dropdown-link">SAP Business One HANA</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-business-one-cloud/index.html" class="tz-dropdown-link">SAP Business One Cloud</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-business-one-hybrid/index.html" class="tz-dropdown-link">SAP Business One Hybrid</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-business-one-mobility/index.html" class="tz-dropdown-link">SAP Business One Mobility</a></li>
            <li class="tz-dropdown-item tz-dropdown-has-nested">
              <a href="#" class="tz-dropdown-link">SAP Addons <i class="fas fa-angle-right"></i></a>
              <ul class="tz-nested-menu">
                <li class="tz-dropdown-item"><a href="${prefix}sap-business-one-e-invoicing/index.html" class="tz-dropdown-link">E-invoicing</a></li>
                <li class="tz-dropdown-item"><a href="${prefix}sap-b1-apparel/index.html" class="tz-dropdown-link">SAP B1 Apparel</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="tz-nav-item ${category === 'industries' ? 'active' : ''}">
          <a href="#" class="tz-nav-link">Industries <i class="fas fa-angle-down"></i></a>
          <ul class="tz-dropdown-menu tz-dropdown-wide">
            <li class="tz-dropdown-item"><a href="${prefix}process-manufacturing/index.html" class="tz-dropdown-link">Process Manufacturing</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}food-and-beverage-industry/index.html" class="tz-dropdown-link">Food & Beverage Industry</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}pharmaceutical/index.html" class="tz-dropdown-link">Pharmaceutical</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}flavours-fragrances-industry/index.html" class="tz-dropdown-link">Flavours & Fragrances</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}oil-lubricants-industry/index.html" class="tz-dropdown-link">Oil & Lubricants</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-erp-for-tea-industry/index.html" class="tz-dropdown-link">Tea Industry</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-erp-for-aluminium-extrusion/index.html" class="tz-dropdown-link">Aluminium Extrusion</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-erp-for-leather-industry/index.html" class="tz-dropdown-link">Leather Industry</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-erp-for-transport-company/index.html" class="tz-dropdown-link">Transport Industry</a></li>
            <li class="tz-dropdown-item"><a href="${prefix}sap-erp-for-retail-industry/index.html" class="tz-dropdown-link">Retail Industry</a></li>
          </ul>
        </li>
        <li class="tz-nav-item">
          <a href="#" class="tz-nav-link">Service Areas <i class="fas fa-angle-down"></i></a>
          <ul class="tz-dropdown-menu">
            <li class="tz-dropdown-item"><a href="https://triztek.com/sap-business-one-partner-in-bihar/" class="tz-dropdown-link">Bihar</a></li>
            <li class="tz-dropdown-item"><a href="https://triztek.com/sap-business-one-partner-in-assam/" class="tz-dropdown-link">Assam</a></li>
            <li class="tz-dropdown-item"><a href="https://triztek.com/sap-business-one-partner-in-jharkhand/" class="tz-dropdown-link">Jharkhand</a></li>
            <li class="tz-dropdown-item"><a href="https://triztek.com/sap-business-one-partner-in-odisha/" class="tz-dropdown-link">Odisha</a></li>
          </ul>
        </li>
        <li class="tz-nav-item">
          <a href="${prefix}blogs/index.html" class="tz-nav-link">Blogs</a>
        </li>
      </ul>
    </nav>

    <!-- Header Tools & Call-To-Action -->
    <div class="tz-header-actions">
      <a href="tel:+919903088480" class="tz-header-phone" title="Call Triztek">
        <i class="fas fa-phone-alt"></i>
        <span>+91-9903088480</span>
      </a>
      <a href="#tzEnquireModal" class="tz-btn-cta tz-open-enquire" id="headerCtaBtn">
        <span>Book Consultation</span>
        <i class="fas fa-arrow-right"></i>
      </a>
      <button class="tz-mobile-toggle" id="tzMobileToggle" aria-label="Open Navigation Menu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>
</header>
`;
}

function getMobileDrawer(prefix) {
  return `
<!-- MOBILE OFFCANVAS DRAWER -->
<div class="tz-mobile-drawer-backdrop" id="tzMobileBackdrop"></div>
<div class="tz-mobile-drawer" id="tzMobileDrawer">
  <div class="tz-mobile-header">
    <img src="${prefix}assets/images/TRIZ_logo_web_transperant.png" alt="Triztek Logo" height="36" style="filter: brightness(0) invert(1);">
    <button class="tz-mobile-close" id="tzMobileClose" aria-label="Close Navigation Menu">
      <i class="fas fa-times"></i>
    </button>
  </div>
  <ul class="tz-mobile-nav-list">
    <li class="tz-mobile-nav-item"><a href="${prefix}index.html" class="tz-mobile-nav-link">Home</a></li>
    <li class="tz-mobile-nav-item"><a href="${prefix}about-us/index.html" class="tz-mobile-nav-link">About Us</a></li>
    <li class="tz-mobile-nav-item">
      <a href="#" class="tz-mobile-nav-link tz-mobile-submenu-toggle" data-target="mobServices">Services <i class="fas fa-angle-down"></i></a>
      <ul class="tz-mobile-submenu" id="mobServices">
        <li><a href="${prefix}crystal-reports/index.html">Crystal Reports</a></li>
        <li><a href="${prefix}smart-data-analytics/index.html">Smart Data Analytics</a></li>
        <li><a href="${prefix}maintenance/index.html">Maintenance</a></li>
        <li><a href="${prefix}customization/index.html">Customization</a></li>
        <li><a href="${prefix}implementation/index.html">Implementation</a></li>
        <li><a href="${prefix}sap-business-one-iot-integration/index.html">IoT Integration</a></li>
      </ul>
    </li>
    <li class="tz-mobile-nav-item">
      <a href="#" class="tz-mobile-nav-link tz-mobile-submenu-toggle" data-target="mobSolutions">Solutions <i class="fas fa-angle-down"></i></a>
      <ul class="tz-mobile-submenu" id="mobSolutions">
        <li><a href="${prefix}index-2.html">SAP Business One On Premise</a></li>
        <li><a href="${prefix}index-3.html">SAP Business One HANA</a></li>
        <li><a href="${prefix}sap-business-one-cloud/index.html">SAP Business One Cloud</a></li>
        <li><a href="${prefix}sap-business-one-hybrid/index.html">SAP Business One Hybrid</a></li>
        <li><a href="${prefix}sap-business-one-mobility/index.html">SAP Business One Mobility</a></li>
        <li><a href="${prefix}sap-business-one-e-invoicing/index.html">E-invoicing</a></li>
        <li><a href="${prefix}sap-b1-apparel/index.html">SAP B1 Apparel</a></li>
      </ul>
    </li>
    <li class="tz-mobile-nav-item">
      <a href="#" class="tz-mobile-nav-link tz-mobile-submenu-toggle" data-target="mobIndustries">Industries <i class="fas fa-angle-down"></i></a>
      <ul class="tz-mobile-submenu" id="mobIndustries">
        <li><a href="${prefix}process-manufacturing/index.html">Process Manufacturing</a></li>
        <li><a href="${prefix}food-and-beverage-industry/index.html">Food & Beverage</a></li>
        <li><a href="${prefix}pharmaceutical/index.html">Pharmaceutical</a></li>
        <li><a href="${prefix}flavours-fragrances-industry/index.html">Flavours & Fragrances</a></li>
        <li><a href="${prefix}oil-lubricants-industry/index.html">Oil & Lubricants</a></li>
        <li><a href="${prefix}sap-erp-for-tea-industry/index.html">Tea Industry</a></li>
        <li><a href="${prefix}sap-erp-for-aluminium-extrusion/index.html">Aluminium Extrusion</a></li>
        <li><a href="${prefix}sap-erp-for-leather-industry/index.html">Leather Industry</a></li>
        <li><a href="${prefix}sap-erp-for-transport-company/index.html">Transport Industry</a></li>
        <li><a href="${prefix}sap-erp-for-retail-industry/index.html">Retail Industry</a></li>
      </ul>
    </li>
    <li class="tz-mobile-nav-item">
      <a href="#" class="tz-mobile-nav-link tz-mobile-submenu-toggle" data-target="mobAreas">Service Areas <i class="fas fa-angle-down"></i></a>
      <ul class="tz-mobile-submenu" id="mobAreas">
        <li><a href="https://triztek.com/sap-business-one-partner-in-bihar/">Bihar</a></li>
        <li><a href="https://triztek.com/sap-business-one-partner-in-assam/">Assam</a></li>
        <li><a href="https://triztek.com/sap-business-one-partner-in-jharkhand/">Jharkhand</a></li>
        <li><a href="https://triztek.com/sap-business-one-partner-in-odisha/">Odisha</a></li>
      </ul>
    </li>
    <li class="tz-mobile-nav-item"><a href="https://triztek.com/blogs/" class="tz-mobile-nav-link" target="_blank">Blogs</a></li>
  </ul>
  <div class="tz-mobile-footer">
    <a href="tel:+919903088480" class="tz-header-phone" style="justify-content: center;">
      <i class="fas fa-phone-alt"></i> +91-9903088480
    </a>
    <a href="#tzEnquireModal" class="tz-btn-cta tz-open-enquire" style="width: 100%;">
      Book Consultation
    </a>
  </div>
</div>
`;
}

function getHomepageHero(prefix) {
  return `
<!-- ENTERPRISE SPLIT HERO (PRESERVING EXACT ORIGINAL MESSAGES) -->
<section class="tz-hero-enterprise" id="hero">
  <div class="tz-container">
    <div class="tz-hero-grid">
      <!-- Left Column: Content Area -->
      <div class="tz-hero-content-col">
        <div class="tz-hero-badge">
          <span class="tz-hero-badge-dot"></span>
          Authorized SAP Business One Partner • Kolkata
        </div>

        <div class="tz-hero-text-slider">
          <!-- Slide 1 (Original) -->
          <div class="tz-hero-slide-item active" data-slide="0">
            <h1 class="tz-hero-title">
              Small Businesses Have a Lot on Their Plate<br>
              <span class="tz-highlight">Say Goodbye to Process Complexities With SAP Business One</span>
            </h1>
            <p class="tz-hero-desc">
              Triz Technologies delivers complete ERP solutions tailored for manufacturing, retail, and trading enterprises — streamlining financials, inventory, and operations on one unified platform.
            </p>
          </div>

          <!-- Slide 2 (Original) -->
          <div class="tz-hero-slide-item" data-slide="1">
            <h2 class="tz-hero-title">
              Has Your Business Outgrown Traditional Process Management Tools?<br>
              <span class="tz-highlight">Say Hello to SAP Business One - The Future Proof ERP!</span>
            </h2>
            <p class="tz-hero-desc">
              Upgrade from fragmented spreadsheets and legacy accounting software to a global-standard ERP built to scale seamlessly with your organizational growth.
            </p>
          </div>

          <!-- Slide 3 (Original) -->
          <div class="tz-hero-slide-item" data-slide="2">
            <h2 class="tz-hero-title">
              Future-Proof Your Business Processes With SAP Business One<br>
              <span class="tz-highlight">The Best ERP Solution For Small & Midsize Businesses</span>
            </h2>
            <p class="tz-hero-desc">
              Trusted by over 70,000 companies worldwide, SAP Business One unifies all business functions to provide actionable operational insights and real-time control.
            </p>
          </div>

          <!-- Slide 4 (Original) -->
          <div class="tz-hero-slide-item" data-slide="3">
            <h2 class="tz-hero-title">
              Break Free From Inefficient Business Processes<br>
              <span class="tz-highlight">Unlock Business Process Efficiency With SAP Business One</span>
            </h2>
            <p class="tz-hero-desc">
              Eliminate data bottlenecks, reduce manual reporting overhead, and empower leadership with automated decision workflows and real-time KPIs.
            </p>
          </div>
        </div>

        <!-- Call to Action Buttons -->
        <div class="tz-hero-buttons">
          <a href="#tzEnquireModal" class="tz-btn-cta tz-open-enquire">
            <span>Schedule Consultation</span>
            <i class="fas fa-arrow-right"></i>
          </a>
          <a href="${prefix}implementation/index.html" class="tz-btn-secondary">
            <span>Explore Implementation</span>
            <i class="fas fa-cubes"></i>
          </a>
        </div>

        <!-- Slide Indicators -->
        <div class="tz-hero-controls">
          <button class="tz-hero-dot active" aria-label="Slide 1"></button>
          <button class="tz-hero-dot" aria-label="Slide 2"></button>
          <button class="tz-hero-dot" aria-label="Slide 3"></button>
          <button class="tz-hero-dot" aria-label="Slide 4"></button>
        </div>

        <!-- Trust Indicators -->
        <div class="tz-hero-trust">
          <div class="tz-trust-item">
            <span class="tz-trust-num">15+</span>
            <span class="tz-trust-label">Years ERP Experience</span>
          </div>
          <div class="tz-trust-item">
            <span class="tz-trust-num">100+</span>
            <span class="tz-trust-label">Go-Lives Delivered</span>
          </div>
          <div class="tz-trust-item">
            <span class="tz-trust-num">100%</span>
            <span class="tz-trust-label">Certified SAP Consultants</span>
          </div>
        </div>
      </div>

      <!-- Right Column: Visual Area -->
      <div class="tz-hero-visual">
        <div class="tz-hero-card-frame">
          <div class="tz-hero-img-container">
            <img id="tzHeroMainImage" src="${prefix}assets/images/staff-meeting.jpg" alt="Triztek SAP Business One Implementation" width="600" height="412" loading="eager">
          </div>
          <div class="tz-hero-floating-badge">
            <div class="tz-floating-text">
              <span class="tz-floating-title">SAP Business One • Certified Excellence</span>
              <span class="tz-floating-sub">Trusted by industry leaders across Eastern India</span>
            </div>
            <div class="tz-floating-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;
}

function getSubpageHero(prefix, meta) {
  return `
<!-- SUBPAGE ENTERPRISE HERO -->
<section class="tz-subpage-hero" id="page-hero">
  <div class="tz-container">
    <nav class="tz-breadcrumbs" aria-label="Breadcrumbs">
      <a href="${prefix}index.html">Home</a>
      <i class="fas fa-chevron-right"></i>
      <span class="active">${meta.breadcrumb || meta.category}</span>
    </nav>
    <h1 class="tz-subpage-hero-title">${meta.h1}</h1>
    <p class="tz-subpage-hero-desc">${meta.desc}</p>
  </div>
</section>
`;
}

function getFooter(prefix) {
  return `
<!-- TRIZTEK MULTI-COLUMN ENTERPRISE FOOTER -->
<footer class="tz-footer-enterprise" id="colophon">
  <div class="tz-container">
    <div class="tz-footer-grid">
      <!-- Col 1: Brand & Overview -->
      <div class="tz-footer-col">
        <a href="${prefix}index.html">
          <img src="${prefix}assets/images/TRIZ_logo_web_transperant.png" alt="Triztek Logo" class="tz-footer-logo" width="160" height="44">
        </a>
        <p class="tz-footer-about">
          Triz Technologies is an authorized SAP Business One Partner in Kolkata, delivering world-class ERP implementations, customizations, and cloud hosting for growth-oriented enterprises.
        </p>
        <div class="tz-footer-cin">CIN: U72200WB2022PTC258632</div>
        <div class="tz-footer-socials">
          <a href="https://www.facebook.com/triztechnologies" class="tz-social-icon" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://x.com/triztechnology" class="tz-social-icon" target="_blank" rel="noopener" aria-label="X Twitter"><i class="fab fa-x-twitter"></i></a>
          <a href="https://www.linkedin.com/company/triztechnologies" class="tz-social-icon" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <!-- Col 2: Quick Links -->
      <div class="tz-footer-col">
        <h4 class="tz-footer-heading">Quick Links</h4>
        <ul class="tz-footer-links">
          <li><a href="${prefix}about-us/index.html">About Us</a></li>
          <li><a href="https://triztek.com/carrers/">Careers</a></li>
          <li><a href="${prefix}sap-b1-apparel/index.html">SAP B1 Apparel</a></li>
          <li><a href="${prefix}sap-business-one-e-invoicing/index.html">E-invoicing Solution</a></li>
          <li><a href="https://triztek.com/blogs/">Latest Blogs</a></li>
          <li><a href="#tzEnquireModal" class="tz-open-enquire">Contact Us</a></li>
        </ul>
      </div>

      <!-- Col 3: Solutions -->
      <div class="tz-footer-col">
        <h4 class="tz-footer-heading">Solutions</h4>
        <ul class="tz-footer-links">
          <li><a href="${prefix}index-2.html">SAP Business One On Premise</a></li>
          <li><a href="${prefix}index-3.html">SAP Business One HANA</a></li>
          <li><a href="${prefix}sap-business-one-cloud/index.html">SAP Business One Cloud</a></li>
          <li><a href="${prefix}sap-business-one-hybrid/index.html">SAP Business One Hybrid</a></li>
          <li><a href="${prefix}sap-business-one-mobility/index.html">Mobility Solutions</a></li>
          <li><a href="${prefix}process-manufacturing/index.html">Process Manufacturing</a></li>
        </ul>
      </div>

      <!-- Col 4: Services -->
      <div class="tz-footer-col">
        <h4 class="tz-footer-heading">Services</h4>
        <ul class="tz-footer-links">
          <li><a href="${prefix}crystal-reports/index.html">Crystal Reports</a></li>
          <li><a href="${prefix}smart-data-analytics/index.html">Smart Data Analytics</a></li>
          <li><a href="${prefix}maintenance/index.html">Maintenance & Support</a></li>
          <li><a href="${prefix}customization/index.html">Customization</a></li>
          <li><a href="${prefix}implementation/index.html">Implementation</a></li>
          <li><a href="${prefix}sap-business-one-iot-integration/index.html">IoT Integration</a></li>
        </ul>
      </div>

      <!-- Col 5: Contact Details -->
      <div class="tz-footer-col">
        <h4 class="tz-footer-heading">Contact Details</h4>
        <ul class="tz-footer-contact-list">
          <li class="tz-footer-contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>Merlin Matrix, 7th Floor, 10, DN Block, Sector V, Saltlake, Kolkata, West Bengal - 700091, India</span>
          </li>
          <li class="tz-footer-contact-item">
            <i class="fas fa-phone-alt"></i>
            <a href="tel:+919903088480" style="color: inherit;">+91-9903088480</a>
          </li>
          <li class="tz-footer-contact-item">
            <i class="fas fa-envelope"></i>
            <a href="mailto:info@triztek.com" style="color: inherit;">info@triztek.com</a>
          </li>
          <li class="tz-footer-contact-item">
            <i class="fas fa-clock"></i>
            <span>Mon - Fri: 09:30 AM - 06:30 PM</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="tz-footer-bottom">
      <div>&copy; 2026 Triz Technologies Pvt. Ltd. All rights reserved.</div>
      <div>Authorized SAP Business One Implementation Partner • Kolkata, West Bengal</div>
    </div>
  </div>
</footer>
`;
}

function getFloatingActions() {
  return `
<!-- FLOATING CONTACT ACTIONS -->
<div class="tz-floating-actions" aria-label="Quick Actions">
  <a href="https://wa.me/+91963700142?text=Hello%20Triztek," target="_blank" rel="noopener" class="tz-floating-btn tz-floating-whatsapp" title="Chat on WhatsApp" aria-label="WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>
  <a href="tel:+919903088480" class="tz-floating-btn tz-floating-phone" title="Call Us" aria-label="Call Us">
    <i class="fas fa-phone-alt"></i>
  </a>
</div>
`;
}

function getEnquireModal() {
  return `
<!-- ENQUIRE NOW MODAL POPUP -->
<div class="tz-modal-backdrop" id="tzEnquireModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
  <div class="tz-modal-card">
    <button class="tz-modal-close" id="tzModalClose" aria-label="Close Modal">
      <i class="fas fa-times"></i>
    </button>
    <h3 class="tz-modal-title" id="modalTitle">Enquire Now</h3>
    <p class="tz-modal-desc">Connect with an authorized SAP Business One consultant for a customized demo and assessment.</p>
    <form class="tz-modal-form" method="post" action="#" onsubmit="event.preventDefault(); alert('Thank you! Our SAP consultant will contact you shortly.'); document.getElementById('tzEnquireModal').classList.remove('open');">
      <div class="tz-form-group">
        <label class="tz-form-label" for="tz_name">Full Name *</label>
        <input type="text" id="tz_name" name="name" class="tz-input" placeholder="Your Full Name" required>
      </div>
      <div class="tz-form-group">
        <label class="tz-form-label" for="tz_phone">Phone Number *</label>
        <input type="tel" id="tz_phone" name="phone" class="tz-input" placeholder="Your Phone Number" required>
      </div>
      <div class="tz-form-group">
        <label class="tz-form-label" for="tz_email">Business Email *</label>
        <input type="email" id="tz_email" name="email" class="tz-input" placeholder="name@company.com" required>
      </div>
      <div class="tz-form-group">
        <label class="tz-form-label" for="tz_company">Company Name</label>
        <input type="text" id="tz_company" name="company" class="tz-input" placeholder="Company Name">
      </div>
      <div class="tz-form-group">
        <label class="tz-form-label" for="tz_message">Message</label>
        <textarea id="tz_message" name="message" class="tz-textarea" rows="3" placeholder="Tell us about your requirements..."></textarea>
      </div>
      <button type="submit" class="tz-btn-cta" style="width: 100%; border: none;">
        <span>Submit Enquiry</span>
        <i class="fas fa-paper-plane"></i>
      </button>
    </form>
  </div>
</div>
`;
}

function processPage(relPath) {
  if (!fs.existsSync(relPath)) {
    console.warn(`File not found: ${relPath}`);
    return;
  }

  const normalizedRelPath = relPath.replace(/\\/g, '/');
  const prefix = normalizedRelPath.includes('/') ? '../'.repeat(normalizedRelPath.split('/').length - 1) : '';
  const meta = pageMetadata[relPath.replace(/\\/g, '/')] || {
    category: 'services',
    title: 'Triztek — SAP Business One Partner',
    h1: 'Triz Technologies — SAP Solutions',
    desc: 'Authorized SAP Business One Partner in Kolkata.'
  };

  let html = fs.readFileSync(relPath, 'utf8');

  // Rebuild the shared subpage hero from current route metadata on every run.
  html = html.replace(/<section class="tz-subpage-hero"[\s\S]*?<\/section>/i, '');

  // 1. Remove redesign.css link and insert triztek-theme.css link
  html = html.replace(/<link[^>]*href=["'][^"']*redesign\.css["'][^>]*>/gi, '');
  if (!html.includes('triztek-theme.css')) {
    html = html.replace('</head>', `  <link rel="stylesheet" href="${prefix}assets/css/triztek-theme.css" media="all">\n</head>`);
  }

  // 2. Replace Header
  // The header starts at <header ... id="masthead" and ends at </header>
  const headerRegex = /<header[\s\S]*?id="masthead"[\s\S]*?<\/header>/i;
  if (headerRegex.test(html)) {
    html = html.replace(headerRegex, getHeader(prefix, meta.category).trim());
  }

  // 3. Replace Hero
  if (relPath === 'index.html' || relPath === 'index-2.html' || relPath === 'index-3.html') {
    // Replace section dee3f6f (old Smart Slider hero)
    const heroRegex = /<section[^>]*class="[^"]*tz-home-hero[^"]*"[\s\S]*?<\/section>/i;
    const heroRegex2 = /<section[^>]*data-id="dee3f6f"[\s\S]*?<\/section>/i;
    if (heroRegex.test(html)) {
      html = html.replace(heroRegex, getHomepageHero(prefix).trim());
    } else if (heroRegex2.test(html)) {
      html = html.replace(heroRegex2, getHomepageHero(prefix).trim());
    }
  } else {
    // Subpages: Check for old header banners (elementor-element-b1bde8c / elementor-element-490b3f4)
    // We replace the first subpage hero section if present, or prepend getSubpageHero to <main>
    const subHeroRegex = /<section[^>]*class="[^"]*elementor-element-b1bde8c[^"]*"[\s\S]*?<\/section>[\s\S]*?<section[^>]*class="[^"]*elementor-element-490b3f4[^"]*"[\s\S]*?<\/section>/i;
    if (subHeroRegex.test(html)) {
      html = html.replace(subHeroRegex, getSubpageHero(prefix, meta).trim());
    } else {
      // Check if subpage hero already exists or insert after <main id="main-content"...><div...>
      if (!html.includes('tz-subpage-hero')) {
        const hero = getSubpageHero(prefix, meta).trim();
        if (/<main[^>]*>[\s\S]*?<div[^>]*class="elementor[^"]*"[^>]*>/i.test(html)) {
          html = html.replace(/(<main[^>]*>[\s\S]*?<div[^>]*class="elementor[^"]*"[^>]*>)/i, '$1\n' + hero + '\n');
        } else {
          html = html.replace(/(<\/header>)/i, '$1\n' + hero + '\n');
        }
      }
    }
  }

  // 4. Clean up spam links (line 1972 on index.html etc.)
  html = html.replace(/<p><a href="https:\/\/homelabfabric\.com\/"[\s\S]*?<\/p>/gi, '');

  // 5. Replace Footer and old trailing popup/fixed buttons
  // Look for <footer ... id="colophon" ...> ... </footer>
  const footerRegex = /<footer[\s\S]*?id="colophon"[\s\S]*?<\/footer>/i;
  if (footerRegex.test(html)) {
    html = html.replace(footerRegex, getFooter(prefix).trim());
  }

  // Remove old fixed enquiry button section if present (section 0afdc9f)
  html = html.replace(/<section[^>]*data-id="0afdc9f"[\s\S]*?<\/section>/gi, '');
  // Remove old fixed whatsapp button section if present (section 42c4d59)
  html = html.replace(/<section[^>]*data-id="42c4d59"[\s\S]*?<\/section>/gi, '');

  // Remove old popup elementor-5950 if present (we replaced it with clean tz-modal-backdrop)
  html = html.replace(/<div data-elementor-type="popup" data-elementor-id="5950"[\s\S]*?<\/section>\s*<\/div>/gi, '');

  // 6. Ensure Mobile Drawer, Floating Actions, Modal Popup, and JS script are included before </body>
  // First clean any previous occurrences
  html = html.replace(/<!-- MOBILE OFFCANVAS DRAWER -->[\s\S]*?<\/div>\s*<\/div>/gi, '');
  html = html.replace(/<!-- FLOATING CONTACT ACTIONS -->[\s\S]*?<\/div>/gi, '');
  html = html.replace(/<!-- ENQUIRE NOW MODAL POPUP -->[\s\S]*?<\/div>\s*<\/div>/gi, '');
  html = html.replace(/<script[^>]*src=["'][^"']*triztek-main\.js["'][^>]*><\/script>/gi, '');

  const trailingComponents = `
${getMobileDrawer(prefix)}
${getFloatingActions()}
${getEnquireModal()}
<script src="${prefix}assets/js/triztek-main.js"></script>
</body>`;

  html = html.replace('</body>', trailingComponents.trim());

  fs.writeFileSync(relPath, html, 'utf8');
  console.log(`Successfully redesigned: ${relPath}`);
}

// Process all 25 files
const pagesToProcess = [];
function collectPages(dir = '.') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'assets' || entry.name.startsWith('.')) continue;
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) collectPages(rel);
    else if (entry.isFile() && entry.name === 'index.html') pagesToProcess.push(rel === 'index.html' ? rel : rel.replace(/\\/g, '/'));
  }
}
collectPages();
pagesToProcess.forEach(processPage);

function rewriteInternalLinks() {
  const routeToFile = new Map();
  pagesToProcess.forEach(file => {
    const dir = path.posix.dirname(file.replace(/\\/g, '/'));
    routeToFile.set(dir === '.' ? '/' : '/' + dir + '/', file.replace(/\\/g, '/'));
  });
  pagesToProcess.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    const fromDir = path.posix.dirname(file.replace(/\\/g, '/'));
    html = html.replace(/(<a\b[^>]*\bhref=)(["'])(https?:\/\/triztek\.com\/[^"']*)(\2)/gi, (match, prefix, quote, url) => {
      let parsed;
      try { parsed = new URL(url); } catch { return match; }
      let route = parsed.pathname.replace(/\/+/g, '/');
      if (!route.endsWith('/')) route += '/';
      const target = routeToFile.get(route);
      if (!target) return match;
      let relative = path.posix.relative(fromDir === '.' ? '.' : fromDir, target);
      if (!relative) relative = 'index.html';
      return prefix + quote + relative + parsed.search + parsed.hash + quote;
    });
    fs.writeFileSync(file, html, 'utf8');
  });
}
rewriteInternalLinks();
console.log('All ' + pagesToProcess.length + ' archived pages successfully updated with new design system!');
