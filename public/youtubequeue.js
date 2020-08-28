const url = "https://vmengabot.herokuapp.com/requests"
var mediaRequests = []
var currentVideoIndex = 0
setInterval(() => {
      httpGet(url)
      var iframe = document.getElementById('ytplayer')
      if(Array.isArray(mediaRequests) && mediaRequests.length && iframe.getAttribute('src') == "") {
        iframe.src = parseYoutubeLink(mediaRequests[0])
      }
}, 500);

document.addEventListener("DOMContentLoaded", function(event) { 
  document.getElementById("nextButton").addEventListener("click", nextVideoClick)
  var iframe = document.getElementById('ytplayer')
  httpGet(url)
  });
  function httpGet(theUrl)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false );
      xmlHttp.send( null );
      var gottenRequests = JSON.parse(xmlHttp.responseText)
      if(!checkIfArraysAreSame(mediaRequests, gottenRequests)) {
        mediaRequests = JSON.parse(xmlHttp.responseText)
        emptyTable()
        mediaRequests.forEach(setTableRows)
      }
  }

  function setTableRows(item, index) {
    var table = document.getElementById("linkTable")
    var row = table.insertRow(index + 1)
    var dataInRow = row.insertCell(0)
    dataInRow.innerHTML = `<a href='${item}'>${item}</a>`
  }

  function checkIfArraysAreSame(array1, array2) {
    if(array1.length !== array2.length) {return false}
    for(var i = 0 ; array1.length > i; i++) {
      if(array1[i] !== array2[i]) {
        return false
      }
    }
      return true
  }

  function emptyTable() {
    var table = document.getElementById("linkTable")
    while(table.hasChildNodes()) {
      table.removeChild(table.firstChild)
    }
    var row = table.insertRow(0)
    var th = document.createElement("th")
    th.innerHTML = "Youtube links"
    row.appendChild(th)
  }

  function nextVideoClick(){
      if(mediaRequests.length <= 1)  {
        window.alert("there is none or only 1 video")
      }
      if(mediaRequests.length != currentVideoIndex) {
        var iframe = document.getElementById('ytplayer')
        iframe.src = parseYoutubeLink(mediaRequests[++currentVideoIndex])
      } else {
        currentVideoIndex = 0
        iframe.src = parseYoutubeLink(mediaRequests[currentVideoIndex])
      }
  }

  function parseYoutubeLink(link) {

    const partEmbed = "https://www.youtube.com/embed/"
    if(link.startsWith("https://www.youtube.com/watch?v=")) {
      var watchV = link.substring(link.indexOf("/watch?v=") + 9)
      return youtubeLink = partEmbed + watchV
    }
    if(link.startsWith("https://m.youtube.com/watch?v=")) {
      var watchV = link.substring(link.indexOf("/watch?v=") + 9)
      return youtubeLink = partEmbed + watchV
    }
    if(link.startsWith("https://youtu.be/")) {
      var watchV = link.substring(link.indexOf("youtu.be/") + 9)
      return youtubeLink = partEmbed + watchV
    }
  }