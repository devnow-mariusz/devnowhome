import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = withBundleAnalyzer({
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://www.google.com https://www.recaptcha.net;",
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "react-datepicker",
      "quill",
      "react-google-recaptcha",
      "react-quilljs",
      "react-i18next",
      "i18next",
      "photoswipe",
      "nodemailer",
      "framer-motion",
      "formik",
    ],
  },
});

export default nextConfig;
