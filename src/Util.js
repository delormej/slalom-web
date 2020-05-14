
export default function getBaseUrl() {
  // NOTE: This value only works at build time, it's written statically during the build.
  const defaultApiHostname = process.env.REACT_APP_SKIAPI_HOST; 
  // Default if not overide, just returns empty, and app will use relative to current request.
  var baseUrl = '';
  
  // If a hostname was provided, match the protocol (http/https).
  if (defaultApiHostname !== undefined && defaultApiHostname !== '') {
    if (typeof window !== 'undefined') {
      baseUrl = window.location.protocol + '//' + defaultApiHostname;
    }
    else {
      baseUrl = 'http://' + defaultApiHostname;
    }
  }
  return baseUrl;
}
