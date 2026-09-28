import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Allows local /public images without optimization config
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      // ── Legacy PHP → new clean URLs (Section 10) ─────────────────────────
      // Departments
      { source: "/departments/civil-engineering.php",        destination: "/departments/civil-engineering",        permanent: true },
      { source: "/departments/electrical-electronics.php",   destination: "/departments/electrical-electronics",   permanent: true },
      { source: "/departments/electronics-communication.php",destination: "/departments/electronics-communication", permanent: true },
      { source: "/departments/information-technology.php",   destination: "/departments/information-technology",   permanent: true },
      { source: "/departments/mechanical-engineering.php",   destination: "/departments/mechanical-engineering",   permanent: true },
      { source: "/departments/textile-technology.php",       destination: "/departments/textile-technology",       permanent: true },
      { source: "/departments/departments.php",              destination: "/departments",                          permanent: true },
      // Admissions
      { source: "/admission/admission.php",                  destination: "/admissions",                          permanent: true },
      { source: "/admission/admission-details.php",          destination: "/admissions",                          permanent: true },
      { source: "/admission/enquiry.php",                    destination: "/admissions/enquiry",                  permanent: true },
      // Gallery
      { source: "/gallery/:dept/gallery.php",                destination: "/gallery",                             permanent: true },
      // Placement
      { source: "/placement/:path*",                         destination: "/placements",                          permanent: true },
      // Blogs
      { source: "/blogs/blogs.php",                          destination: "/news",                                permanent: true },
      // Contact / institutional
      { source: "/contact/ncc/:path*",                       destination: "/ncc",                                 permanent: true },
      { source: "/contact/nss/:path*",                       destination: "/nss",                                 permanent: true },
      { source: "/contact/rrc/:path*",                       destination: "/rrc",                                 permanent: true },
      { source: "/contact/ciicp/:path*",                     destination: "/ciicp",                              permanent: true },
      { source: "/contact/transportation/:path*",            destination: "/transportation",                      permanent: true },
      { source: "/contact/aicte/:path*",                     destination: "/documents",                           permanent: true },
      { source: "/contact/feedback.php",                     destination: "/feedback",                            permanent: true },
      { source: "/contact/online-grievance.php",             destination: "/grievance",                           permanent: true },
      { source: "/contact/old-student-entry.php",            destination: "/alumni",                              permanent: true },
      // Management
      { source: "/management/management.php",                destination: "/management",                          permanent: true },
      // Legacy faculty/admin portals
      { source: "/faculty/:path*",                           destination: "/admin",                               permanent: true },
      { source: "/admin/admin.php",                          destination: "/admin",                               permanent: true },
    ];
  },
};

export default nextConfig;
