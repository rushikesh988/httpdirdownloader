
function saveOptions(e) {
  e.preventDefault();
  var settingsToStore={
      recursiveDownload: document.querySelector("#recursiveDownload").checked,
    }
  console.log(settingsToStore);
  browser.storage.local.set(settingsToStore);

}
function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#recursiveDownload").checked =(((result.recursiveDownload==undefined)? false:true))? result.recursiveDownload :false; 
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var gettingSetting = browser.storage.local.get();
  gettingSetting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
