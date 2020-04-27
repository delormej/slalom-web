export default class Util {

  getBaseUrl() {
    const defaultApiHostname = process.env.REACT_APP_SKIAPI_HOST; 
    // Default if not overide, just returns empty, and app will use relative to current request.
    var baseUrl = '';
    
    // If a hostname was provided, match the protocol (http/https).
    if (defaultApiHostname !== undefined) {
      if (typeof window !== 'undefined') {
        baseUrl = window.location.protocol + '//' + defaultApiHostname;
      }
      else {
        baseUrl = 'http://' + defaultApiHostname;
      }
    }
    return baseUrl;
  }
}