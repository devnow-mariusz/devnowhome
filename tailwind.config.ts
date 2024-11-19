import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    container: {
      center: true,
    },
    colors: {
      newlight: "#a6adbb1a",
      accent_secondary: "#e6e5e5",
      purple_dark: "#420745",
      purple_light: "#a52e8d",
      navbar: "rgb(39,21,51)",
      third: "#221639",
      fourth: "#351639",
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          neutral: "#000000",
          primary: "#a52e8d",
          secondary: "#351639",
          accent: "#f2ca94",
        },
      },
    ],
  },
  plugins: [daisyui, typography],
};

export default config;
