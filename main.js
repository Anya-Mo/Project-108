//https://teachablemachine.withgoogle.com/models/-P9tqlov0/ - (Teachable Link)
var prediction="";
Webcam.set ({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
var camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}
console.log("ML5 Version - ",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-P9tqlov0/model.json",modelLoaded);
function modelLoaded() {
    console.log("Model Loaded");
}
function speak() {
    var synth=window.speechSynthesis;
    var speak_data="The Prediction is "+prediction;
    var utterthis=new SpeechSynthesisUtterance(prediction);
    synth.speak(utterthis);
}
function check() {
    var img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_object_name").innerHTML=results[0].label;
        prediction=results[0].label;
        speak();
        if (results[0].label=="Ok") {
            document.getElementById("result_object_gesture_icon").innerHTML="&#128076;";
        }
        if (results[0].label=="Thumbs Up") {
            document.getElementById("result_object_gesture_icon").innerHTML="&#128077;";
        }
        if (results[0].label=="Victory") {
            document.getElementById("result_object_gesture_icon").innerHTML="&#9996;";
        }
        if (results[0].label=="Thumbs Down") {
            document.getElementById("result_object_gesture_icon").innerHTML="&#128078;";
        }
        if (results[0].label=="Rock") {
            document.getElementById("result_object_gesture_icon").innerHTML="&#129304;";
        }
    }
}