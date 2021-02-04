let headword = document.getElementById("headword");
let definition = document.getElementById("definition");

let defDisplay = document.getElementById("defDisplay");
let camDisplay = document.getElementById("camDisplay");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=ebc2cc93-cb28-4e21-9dcd-074c0d3cfcf8')
  .then(response => response.json())
  .then(data => {
        console.log(data)
        headword.innerHTML = data[0].meta.id;
        definition.innerHTML = data[0].shortdef[0];
    });


function toggle(){
    if(defDisplay.style.display === "none" || defDisplay.style.display === ""){
        camDisplay.style.display = "none";
        defDisplay.style.display = "block";
    } else {
        camDisplay.style.display = "block";
        defDisplay.style.display = "none"; 
    }
}

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}})
    .then(function(stream) {
        video.srcObject = stream;
        video.play;
    })
    .catch(function(err) {
      /* handle the error */
      console.log('error with media stream')
    });
}
    
function drawCameraIntoCanvas(){
    ctx.drawImage(video, 0, 0, 640, 480);
    window.requestAnimationFrame(drawCameraIntoCanvas);
}

drawCameraIntoCanvas();