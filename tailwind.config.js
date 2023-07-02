/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "mint": "#1ABC9C",
                "tiffany": "#7FD8CC",
                "gunmetal": "#1F2D3D",
                "charcoal": "#2C3E50",
                "flash": "#E9ECEF",
                "seasalt": "#F8F9FA",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
