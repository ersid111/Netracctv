export const SERVICES = [
  {
    id: "cctv-installation",
    title: "CCTV Installation",
    shortDesc: "Professional HD & IP camera installation for homes, offices, and industrial sites.",
    description:
      "End-to-end CCTV installation services with industry-leading cameras. We design, supply, install and configure your complete surveillance system.",
    icon: "Camera",
    features: ["HD & 4K cameras", "IP & Analog systems", "Night vision", "Weatherproof outdoor"],
    color: "blue",
  },
  {
    id: "smart-surveillance",
    title: "Smart Surveillance",
    shortDesc: "AI-powered intelligent surveillance with facial recognition and behavior analytics.",
    description:
      "Next-generation surveillance powered by artificial intelligence. Detect intrusions, recognize faces, and analyze behavior in real-time.",
    icon: "Brain",
    features: ["AI analytics", "Facial recognition", "Crowd detection", "License plate recognition"],
    color: "purple",
  },
  {
    id: "remote-monitoring",
    title: "Remote Monitoring",
    shortDesc: "24/7 remote monitoring from anywhere using your smartphone or tablet.",
    description:
      "Monitor your property from anywhere in the world. Get instant alerts, live feeds, and recorded footage on any device.",
    icon: "Monitor",
    features: ["Mobile app access", "Real-time alerts", "Cloud recording", "Multi-site view"],
    color: "teal",
  },
  {
    id: "access-control",
    title: "Access Control",
    shortDesc: "Biometric and card-based access control systems for complete perimeter security.",
    description:
      "Restrict and monitor access to sensitive areas. From biometric fingerprint scanners to smart card systems.",
    icon: "Lock",
    features: ["Biometric scanners", "Smart card access", "Time attendance", "Visitor management"],
    color: "orange",
  },
  {
    id: "industrial-security",
    title: "Industrial Security",
    shortDesc: "Heavy-duty security solutions for factories, warehouses, and large industrial sites.",
    description:
      "Purpose-built security systems for challenging industrial environments. Explosion-proof, dust-resistant, and extreme temperature rated.",
    icon: "Factory",
    features: ["Explosion-proof cameras", "Wide area coverage", "Perimeter alarm", "Thermal imaging"],
    color: "red",
  },
  {
    id: "video-analytics",
    title: "Video Analytics",
    shortDesc: "Extract actionable intelligence from your camera feeds with advanced analytics.",
    description:
      "Transform passive surveillance into active intelligence. Count people, track movement patterns, and detect anomalies automatically.",
    icon: "BarChart2",
    features: ["People counting", "Heat mapping", "Anomaly detection", "Business intelligence"],
    color: "green",
  },
  {
    id: "intercom-systems",
    title: "Intercom Systems",
    shortDesc: "Video door phones and IP intercom systems for multi-unit buildings.",
    description:
      "Secure your entry points with modern video intercom solutions. See and speak to visitors before granting access.",
    icon: "Phone",
    features: ["HD video door phone", "IP intercom", "Multi-tenant systems", "Mobile unlock"],
    color: "indigo",
  },
  {
    id: "amc-services",
    title: "AMC Services",
    shortDesc: "Annual maintenance contracts ensuring 99.9% uptime for your security systems.",
    description:
      "Keep your security systems running at peak performance. Comprehensive annual maintenance with guaranteed response times.",
    icon: "Wrench",
    features: ["Preventive maintenance", "4-hour response", "Parts replacement", "24/7 support"],
    color: "yellow",
  },
];

export const PRODUCT_CATEGORIES = [
  { id: "ALL", label: "All Products" },
  { id: "IP_CAMERAS", label: "IP Cameras" },
  { id: "ANALOG_HD", label: "Analog HD" },
  { id: "PTZ_CAMERAS", label: "PTZ Cameras" },
  { id: "THERMAL", label: "Thermal" },
  { id: "NVR_DVR", label: "NVR / DVR" },
  { id: "VIDEO_ANALYTICS", label: "Video Analytics" },
  { id: "ACCESS_CONTROL", label: "Access Control" },
  { id: "INTERCOM", label: "Intercom" },
];

export const PROPERTY_TYPES = [
  { id: "home", label: "Home / Villa", icon: "Home" },
  { id: "office", label: "Office", icon: "Building2" },
  { id: "factory", label: "Factory", icon: "Factory" },
  { id: "warehouse", label: "Warehouse", icon: "Package" },
  { id: "school", label: "School / College", icon: "GraduationCap" },
  { id: "hospital", label: "Hospital / Clinic", icon: "Heart" },
  { id: "retail", label: "Retail / Shop", icon: "ShoppingBag" },
  { id: "other", label: "Other", icon: "Building" },
];

export const BUDGET_RANGES = [
  { id: "below_25000", label: "Below ₹25,000" },
  { id: "25000_50000", label: "₹25,000 – ₹50,000" },
  { id: "50000_100000", label: "₹50,000 – ₹1,00,000" },
  { id: "100000_200000", label: "₹1,00,000 – ₹2,00,000" },
  { id: "200000_500000", label: "₹2,00,000 – ₹5,00,000" },
  { id: "above_500000", label: "Above ₹5,00,000" },
];

export const TIMELINES = [
  { id: "immediate", label: "Immediately (ASAP)" },
  { id: "1month", label: "Within 1 Month" },
  { id: "3months", label: "Within 3 Months" },
  { id: "planning", label: "Just Planning" },
];

export const REQUIREMENTS = [
  "24/7 Recording",
  "Night Vision",
  "Remote Mobile Access",
  "AI Analytics",
  "Motion Detection Alerts",
  "Facial Recognition",
  "License Plate Recognition",
  "Cloud Storage",
  "Weatherproof Cameras",
  "High Resolution (4MP+)",
  "Wide Angle Coverage",
  "Access Control Integration",
];

export const RESOLUTIONS = [
  { id: "2mp", label: "2MP HD (720p/1080p)" },
  { id: "4mp", label: "4MP Full HD" },
  { id: "8mp", label: "8MP 4K Ultra HD" },
  { id: "thermal", label: "Thermal Imaging" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Owner",
    company: "Kumar Textiles Pvt Ltd",
    location: "Mumbai",
    rating: 5,
    review:
      "NETRA CCTV transformed our factory security completely. Their team installed 48 cameras with AI analytics — we can now monitor everything from my phone. Exceptional quality and professional service.",
    avatar: "RK",
    industry: "Manufacturing",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Facility Manager",
    company: "Horizon IT Park",
    location: "Pune",
    rating: 5,
    review:
      "We needed a reliable system for our 8-floor IT park. NETRA CCTV delivered on time, on budget, with zero disruption to our tenants. The remote monitoring feature is outstanding.",
    avatar: "PS",
    industry: "Commercial",
  },
  {
    id: 3,
    name: "Mohammed Ali",
    role: "CEO",
    company: "Ali Warehousing Solutions",
    location: "Navi Mumbai",
    rating: 5,
    review:
      "Best CCTV company in the region. Their industrial-grade cameras handle our 24/7 harsh warehouse environment perfectly. AMC support is fast and reliable.",
    avatar: "MA",
    industry: "Industrial",
  },
  {
    id: 4,
    name: "Sunita Patel",
    role: "Principal",
    company: "Sunrise International School",
    location: "Thane",
    rating: 5,
    review:
      "Child safety is our top priority. NETRA designed a comprehensive camera network covering every corner. The facial recognition feature alerts us to unknown faces immediately.",
    avatar: "SP",
    industry: "Education",
  },
];

export const FAQ_ITEMS = [
  {
    question: "How many cameras do I need for my home?",
    answer:
      "For an average 3BHK home, we typically recommend 4–6 cameras: 2 outdoor cameras covering the main entrance and driveway, 1 camera for the back door, and indoor cameras for common areas. We provide a free site survey to give you the exact recommendation.",
  },
  {
    question: "What is the difference between IP cameras and HD analog cameras?",
    answer:
      "IP cameras send data over a network, offer higher resolution (up to 4K), and support advanced features like AI analytics. HD analog cameras use coaxial cable, are more cost-effective, and work well for standard surveillance needs. We'll recommend the right type based on your requirements and budget.",
  },
  {
    question: "Do you provide 24/7 monitoring services?",
    answer:
      "Yes, we offer round-the-clock remote monitoring services. Our monitoring center operates 24/7/365. We can also configure your system for self-monitoring via mobile app with real-time alerts.",
  },
  {
    question: "How long does the installation take?",
    answer:
      "Installation time depends on the system size. A home installation (4–8 cameras) typically takes 1 day. Office/commercial installations take 2–5 days. Large industrial projects are planned in phases. We'll provide a detailed timeline during the site survey.",
  },
  {
    question: "What is included in the AMC (Annual Maintenance Contract)?",
    answer:
      "Our AMC includes: quarterly preventive maintenance visits, free replacement of failed cameras or DVR/NVR within warranty, 4-hour response time for critical issues, 24/7 phone support, software updates, and a dedicated service manager.",
  },
  {
    question: "Can I access cameras remotely on my phone?",
    answer:
      "Absolutely. All our systems support mobile access via iOS and Android apps. You can view live feeds, playback recordings, receive motion alerts, and control PTZ cameras remotely from anywhere in the world.",
  },
  {
    question: "Do you offer financing or EMI options?",
    answer:
      "Yes, we partner with leading banks to offer 0% EMI options for projects above ₹50,000. Contact us to know more about flexible payment plans tailored to your budget.",
  },
  {
    question: "How much storage do I need for 30 days of recording?",
    answer:
      "Storage depends on resolution, frame rate, and compression. As a guide: for 8 cameras recording at 1080p with 15fps using H.265 compression, approximately 4TB of storage covers 30 days. Our free calculator on this page will give you an exact estimate.",
  },
];

export const STATS = [
  { value: 500, suffix: "+", label: "Projects Completed", icon: "CheckCircle" },
  { value: 10, suffix: "+", label: "Years Experience", icon: "Award" },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: "Star" },
  { value: 24, suffix: "×7", label: "Support", icon: "Clock" },
];

export const WHY_NETRA = {
  others: [
    "Generic off-the-shelf setup",
    "Slow response to service calls",
    "Old analog technology",
    "No post-installation support",
    "Untrained technicians",
    "No system design consultation",
  ],
  netra: [
    "Custom-designed security architecture",
    "4-hour guaranteed response time",
    "Latest AI-powered IP technology",
    "Dedicated lifetime support team",
    "Certified & trained engineers",
    "Free site survey & consultation",
  ],
};

export const CHATBOT_RESPONSES: Record<string, string> = {
  hello: "Hello! Welcome to NETRA CCTV. How can I help you today? I can assist with camera recommendations, pricing, or booking a free site visit.",
  hi: "Hi there! I'm the NETRA CCTV assistant. Are you looking for a home or commercial security solution?",
  price:
    "Our pricing varies by project size. A basic home package (4 cameras + DVR) starts from ₹15,000. For commercial projects, prices start from ₹50,000. Would you like a free site survey for an accurate quote?",
  cost: "Pricing depends on your requirements. Use our free Cost Calculator on this page for an instant estimate, or fill out the enquiry form for a detailed quote.",
  camera:
    "We supply and install IP cameras, HD analog cameras, PTZ cameras, thermal cameras, and more. What type of property are you securing?",
  installation: "Our installation service is end-to-end — we design, supply, install, and configure your complete system. Book a free site visit to get started.",
  contact:
    "You can reach us at:\n📞 +91 83295 91217\n📧 netraelectronics9@gmail.com\n💬 WhatsApp the same number\n\nOr use the Enquiry form for a detailed consultation.",
  support: "We offer 24/7 customer support with 4-hour on-site response time under AMC contracts. Call us anytime at +91 83295 91217.",
  amc: "Our AMC (Annual Maintenance Contract) ensures your system stays at peak performance with quarterly servicing, 4-hour response time, and free parts replacement within warranty.",
  default:
    "Thank you for your question! For a detailed answer, please fill out our enquiry form or call us at +91 83295 91217. Our experts are available 24/7.",
};
