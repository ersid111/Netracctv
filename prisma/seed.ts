import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@netracctv.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@Netra2024";
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { name: "Admin", email: adminEmail, password: hashedPassword, role: "ADMIN" },
  });
  console.log(`✓ Admin user: ${adminEmail}`);

  // Sample Products
  const products = [
    {
      name: "Hikvision DS-2CD2143G2-I 4MP AcuSense Fixed Dome",
      slug: "hikvision-ds-2cd2143g2-i",
      category: "IP_CAMERAS",
      brand: "Hikvision",
      model: "DS-2CD2143G2-I",
      description: "4MP AcuSense fixed dome network camera with deep learning AI, perfect for indoor and outdoor installation.",
      features: JSON.stringify(["4MP resolution", "AcuSense AI detection", "IR up to 40m", "IP67 weatherproof", "IK10 vandal-resistant"]),
      specifications: JSON.stringify({ "Resolution": "4MP (2688×1520)", "IR Range": "40m", "Lens": "2.8mm / 4mm / 6mm", "Weatherproof": "IP67", "Compression": "H.265+" }),
      priceOnRequest: true,
      imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: "Dahua IPC-HDW2849H-S-IL 8MP Smart Dual Light Fixed-focal Eyeball",
      slug: "dahua-ipc-hdw2849h",
      category: "IP_CAMERAS",
      brand: "Dahua",
      model: "IPC-HDW2849H-S-IL",
      description: "8MP 4K Smart Dual Light fixed-focal eyeball network camera with AI detection and full-color night vision.",
      features: JSON.stringify(["8MP 4K resolution", "Smart dual light", "Full color night vision", "AI human & vehicle detection", "H.265+ compression"]),
      specifications: JSON.stringify({ "Resolution": "8MP (3840×2160)", "Night Vision": "Full Color + IR 30m", "Lens": "2.8mm", "Protection": "IP67, IK10" }),
      priceOnRequest: true,
      imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&h=300&fit=crop",
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: "Hikvision DS-2DE4425IWG-E PTZ Network Camera",
      slug: "hikvision-ds-2de4425iwg",
      category: "PTZ_CAMERAS",
      brand: "Hikvision",
      model: "DS-2DE4425IWG-E",
      description: "4MP 25× optical zoom PTZ camera with deep learning AI and long-range IR illumination for wide-area surveillance.",
      features: JSON.stringify(["4MP resolution", "25× optical zoom", "IR range 100m", "Deep learning detection", "Auto-tracking"]),
      specifications: JSON.stringify({ "Resolution": "4MP", "Optical Zoom": "25×", "IR Range": "100m", "Pan Range": "360° endless", "Tilt Range": "-15° to 90°" }),
      priceOnRequest: true,
      imageUrl: "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=400&h=300&fit=crop",
      isFeatured: true,
      sortOrder: 3,
    },
    {
      name: "Hikvision DS-7608NI-K2/8P 8-Channel NVR",
      slug: "hikvision-ds-7608ni-k2-8p",
      category: "NVR_DVR",
      brand: "Hikvision",
      model: "DS-7608NI-K2/8P",
      description: "8-channel PoE NVR supporting up to 8MP cameras with 2 SATA HDD bays and H.265+ compression.",
      features: JSON.stringify(["8-channel PoE", "Supports up to 8MP", "2× SATA HDD", "H.265+ compression", "HDMI & VGA output", "Remote access"]),
      specifications: JSON.stringify({ "Channels": "8", "Max Resolution": "8MP", "HDD Bays": "2 (up to 10TB each)", "PoE Power": "8×PoE, total 100W", "Bandwidth": "80Mbps" }),
      priceOnRequest: true,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      sortOrder: 4,
    },
    {
      name: "Dahua DHI-NVR4108HS-8P-4KS2/L 8CH PoE NVR",
      slug: "dahua-dhi-nvr4108hs-8p",
      category: "NVR_DVR",
      brand: "Dahua",
      model: "DHI-NVR4108HS-8P-4KS2/L",
      description: "Compact 8-channel 4K NVR with built-in 8-port PoE switch, supporting AI features and H.265+ video compression.",
      features: JSON.stringify(["8-channel 4K", "Built-in 8-port PoE", "H.265+ compression", "Smart detection", "P2P remote access"]),
      specifications: JSON.stringify({ "Channels": "8", "Max Resolution": "4K (8MP)", "PoE Ports": "8", "HDD Bays": "1 (up to 8TB)" }),
      priceOnRequest: true,
      sortOrder: 5,
    },
    {
      name: "Hikvision DS-K1T341CMF Face Recognition Terminal",
      slug: "hikvision-ds-k1t341cmf",
      category: "ACCESS_CONTROL",
      brand: "Hikvision",
      model: "DS-K1T341CMF",
      description: "AI-powered face recognition access control terminal with card, fingerprint, and PIN authentication.",
      features: JSON.stringify(["Face recognition", "Fingerprint scanner", "Card & PIN access", "Temperature detection", "Time attendance"]),
      specifications: JSON.stringify({ "Face Capacity": "6,000", "Card Capacity": "100,000", "Verification Time": "< 0.2s", "Display": "4.3\" touch screen" }),
      priceOnRequest: true,
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      sortOrder: 6,
    },
    {
      name: "CP Plus CP-E24B Bullet Camera 2MP Full HD",
      slug: "cp-plus-cp-e24b",
      category: "ANALOG_HD",
      brand: "CP Plus",
      model: "CP-E24B",
      description: "2MP Full HD bullet camera with 40m IR range, suitable for outdoor perimeter security.",
      features: JSON.stringify(["2MP Full HD", "40m IR range", "IP66 weatherproof", "Wide dynamic range", "Day/night switching"]),
      specifications: JSON.stringify({ "Resolution": "2MP (1920×1080)", "IR Range": "40m", "Lens": "3.6mm", "Weatherproof": "IP66" }),
      priceOnRequest: false,
      price: 2499,
      sortOrder: 7,
    },
    {
      name: "Dahua VTO2211G-P IP Video Door Phone",
      slug: "dahua-vto2211g-p",
      category: "INTERCOM",
      brand: "Dahua",
      model: "VTO2211G-P",
      description: "PoE-powered HD video door phone with two-way audio, night vision, and mobile app access.",
      features: JSON.stringify(["HD video", "Two-way audio", "Night vision", "Mobile app unlock", "Tamper detection", "IP65 weatherproof"]),
      specifications: JSON.stringify({ "Resolution": "2MP", "Night Vision": "Yes", "PoE": "IEEE 802.3af", "Connectivity": "Wi-Fi + Ethernet" }),
      priceOnRequest: true,
      sortOrder: 8,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }
  console.log(`✓ ${products.length} sample products seeded`);

  // Sample Portfolio
  const portfolios = [
    {
      title: "Kumar Textiles Factory — 48 Camera Installation",
      slug: "kumar-textiles-factory",
      clientName: "Kumar Textiles Pvt Ltd",
      clientIndustry: "Manufacturing",
      location: "Thane, Maharashtra",
      summary: "Complete surveillance overhaul for a 120,000 sq ft textile manufacturing facility with AI-powered analytics.",
      challenge: "The factory had outdated analog cameras with poor coverage, blind spots in the production floor, and no remote monitoring capability.",
      solution: "Designed and installed 48 IP cameras including PTZ cameras for wide-area coverage, integrated with AI video analytics for perimeter intrusion detection and unauthorized access alerts.",
      outcome: "100% facility coverage achieved. Remote monitoring from management's mobile devices. Security incidents reduced by 78%. ROI achieved within 18 months.",
      camerasInstalled: 48,
      projectDuration: "2 weeks",
      coverageArea: "120,000 sq ft",
      afterImageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
      tags: JSON.stringify(["Industrial", "IP Cameras", "PTZ", "AI Analytics", "Remote Monitoring"]),
      isPublished: true,
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: "Horizon IT Park — Multi-Floor Office Complex",
      slug: "horizon-it-park",
      clientName: "Horizon IT Park",
      clientIndustry: "Commercial",
      location: "Pune, Maharashtra",
      summary: "8-floor IT park surveillance system with access control and visitor management integration.",
      challenge: "Multiple tenants required individual access control while the building management needed centralized surveillance.",
      solution: "Installed 64 IP cameras across all floors with floor-wise access control. Integrated video analytics for people counting and occupancy monitoring.",
      outcome: "Tenant satisfaction improved significantly. Operational costs reduced by 30% through automated monitoring.",
      camerasInstalled: 64,
      projectDuration: "3 weeks",
      coverageArea: "250,000 sq ft",
      afterImageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop",
      tags: JSON.stringify(["Commercial", "Office", "Access Control", "Video Analytics"]),
      isPublished: true,
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: "Sunrise International School — Child Safety System",
      slug: "sunrise-international-school",
      clientName: "Sunrise International School",
      clientIndustry: "Education",
      location: "Thane, Maharashtra",
      summary: "Comprehensive child safety surveillance with facial recognition for authorized visitor management.",
      challenge: "School needed to ensure child safety with unknown visitor alerts and complete campus coverage.",
      solution: "32 cameras with facial recognition for staff and authorized visitors. Real-time alerts for unknown faces. Safe zone monitoring around school gates.",
      outcome: "Zero security incidents post-installation. Parent confidence increased significantly. Compliant with school safety regulations.",
      camerasInstalled: 32,
      projectDuration: "10 days",
      afterImageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop",
      tags: JSON.stringify(["Education", "Facial Recognition", "Child Safety", "IP Cameras"]),
      isPublished: true,
      sortOrder: 3,
    },
  ];

  for (const portfolio of portfolios) {
    await prisma.portfolio.upsert({
      where: { slug: portfolio.slug },
      update: {},
      create: portfolio,
    });
  }
  console.log(`✓ ${portfolios.length} portfolio projects seeded`);

  // Site Settings
  await prisma.siteSetting.upsert({
    where: { key: "whatsapp_number" },
    update: {},
    create: { key: "whatsapp_number", value: "919876543210" },
  });

  console.log("✓ Database seeded successfully!");
  console.log(`\n📧 Admin Login:`);
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
