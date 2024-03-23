import type { Config } from "tailwindcss";

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
      colors: {
        mainColor1: "#ff0000",
        mainColor2: "#890105",
        subColor1: "#fb8494",
        subColor2: "#ffd7db",
        subColor3: "#777777",
        subColor4: "#efefef",
      },
      dropShadow: {
        DEFAULT: "2px 2px 0 #890105",
      },
      dropShadowTodo: {
        DEFAULT: "10px 10px 0 #FFD7DB",
      },
      dropShadowGray: {
        DEFAULT: "2px 2px 0 #890105",
      },
      borderRadius: {
        lg: "50px",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
