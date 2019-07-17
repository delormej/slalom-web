export default class Util {

  getBaseUrl() {
    // sets the appropriate baseurl based on whether we're called via ssl or not (https:// or http://)
    var imageApiPath = '//ski-app.azurewebsites.net'; 
    var baseUrl = '';
    
    if (typeof window !== 'undefined') {
      baseUrl = window.location.protocol + imageApiPath;
    }
    else {
      baseUrl = 'http://' + imageApiPath;
    }
    return baseUrl;
  }
}