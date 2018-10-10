const Axios = require("axios"); // Axios library for promisified fetch
BASE_URL = "https://free.currencyconverterapi.com/api/v6/";
BASE_URL_COMPILE = "https://rextester.com/rundotnet/Run/?";
js = ""

module.exports = {
  /**
   * Get the rate exchange
   * @param {*} source
   * @param {*} destination
   */
  getRate(source, destination) {
    query = `${source}_${destination}`;
    return Axios.get(`${BASE_URL}convert?q=${query}&compact=ultra`);
  }

};
  /**
   * Get the rate exchange
   * @param {*} source
   * @param {*} destination
   */
module.exports = {
  postCompile(source, code) {
    query = `${source}_${destination}`;
    return Axios.get(`${BASE_URL_COMPILE}LanguageChoiceWrapper=17&EditorChoiceWrapper=1&LayoutChoiceWrapper=1&Program=${js}&Input=&Privacy=&PrivacyUsers=&Title=&SavedOutput=&WholeError=&WholeWarning=&StatsToSave=&CodeGuid=&IsInEditMode=False&IsLive=False`);
  }
};
