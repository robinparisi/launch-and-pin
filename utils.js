// Set this to false for production
const DEBUG = true;

window.log = function (...args) {
  if (DEBUG) {
    console.log(...args);
  }
};

window.error = function (...args) {
  // Always log errors, even in production
  console.error(...args);
};

window.normalizeUrl = function (url) {
  // Trim whitespace and remove trailing slash
  return url.trim().replace(/\/$/, "");
};
