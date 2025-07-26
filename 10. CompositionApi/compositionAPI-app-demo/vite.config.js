/* module.exports = {
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
  },
  server: {
    target: 'http://localhost:3000/',
    rewrite: (path) => path.replace(/^\/api/, ''),
  }
} */
export default {
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
  },
  proxy: {
    "/api": {
      target: "http://localhost:3000/",
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
};
