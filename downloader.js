(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

console.log("Links from a tag");
var docTitle=document.title;
titleAfterRemovingDash=docTitle.split("-")
var all_links_from_page=document.getElementsByTagName("a");
var i=0;
var files_aray=new Array();
var directories_array=new Array()
while(++i<all_links_from_page.length){
    if(all_links_from_page[i].href.length>all_links_from_page[i].baseURI.length){
      splitted_link=all_links_from_page[i].href.split('/')
      
      if(splitted_link[splitted_link.length-1]==""){
        console.log(all_links_from_page[i].href + " is directory")
        directories_array.push(all_links_from_page[i].href)
      continue;
      }
      if(splitted_link[splitted_link.length-1].split(".").length>1){
        console.log(all_links_from_page[i].href + " is a file")
        files_aray.push(all_links_from_page[i].href)
        continue;
      }
    }
 }
 
 console.log("returning list of files and directories");
 return new Array(directories_array , files_aray);
})();