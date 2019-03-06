"use strict";
console.log("HTTP Directory Downloader Started");

var pendingDirectoryLists=new Array();

browser.browserAction.onClicked.addListener(onButtonClickedFunction);
function onStartedDownload(id) {
}

function onError(error) {
  console.log(`Download failed: ${error}`);
}


function downloadFile(downloadLink){
  var dashSplitString = downloadLink.split("://");
  var fileNameToStore = "HTTP Directory/" +  dashSplitString[dashSplitString.length-1];

  var downloading = browser.downloads.download({
    url: downloadLink,
    conflictAction: 'uniquify',
    filename: fileNameToStore
    });
  downloading.then(onStartedDownload, onError);

}

function onLinksReceived(downloadLinks) {

  if (downloadLinks[0][1] == undefined) {
    console.log("unable to fetch files");
    return;
  }

  
  var gettingSettings = browser.storage.local.get().then(function (result) {
    var storedSettings = {
      recursiveDownload: false,
    };
  
    if(Object.keys(result).length === 0){
      console.log("Received Empty Result");
    }else{
      storedSettings = result;
    }
    console.log("Using following Settings to Download in OnLinkReceivedFunction");
    console.log(storedSettings);
  
    var i=-1;
    while (++i < downloadLinks[0][1].length) {
      downloadFile(downloadLinks[0][1][i])
    }
    
    if(storedSettings.recursiveDownload){
      var i;
      for(i=0;i<downloadLinks[0][0];i++ ){
        pendingDirectoryLists.push(downloadLinks[0][0][i])
      }
    }

  }, onError);
}

function onButtonClickedFunction() {
  browser.tabs.executeScript({
    file: "downloader.js"
  }).then(onLinksReceived, onError);

  return;
}
