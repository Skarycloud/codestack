/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    // Adds vendor prefixes (e.g. -webkit-mask-image for Safari) to the generated CSS.
    autoprefixer: {},
  },
};

export default config;
