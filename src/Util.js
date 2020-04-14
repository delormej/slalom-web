export default class Util {

  getBaseUrl() {
    // sets the appropriate baseurl based on whether we're called via ssl or not (https:// or http://)
    const defaultApiHostname = process.env.REACT_APP_SKIAPI_HOST || 'ski-app.azurewebsites.net'; 
    var baseUrl = '';
    
    if (typeof window !== 'undefined') {
      baseUrl = window.location.protocol + '//' + defaultApiHostname;
    }
    else {
      baseUrl = 'http://' + defaultApiHostname;
    }
    return baseUrl;
  }
}