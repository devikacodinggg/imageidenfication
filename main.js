Webcam.set({
  width:350, 
  height:300,
  image_format:"png",
  png_quality:90
});

Webcam.attach("#camera");


function take_snapshot(){
  Webcam.snap(function(pic_uri){
    document.getElementById("result").innerHTML="<img id = 'captured_selfie' src = '"+pic_uri+"'/>";
  });
  
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Pqd8Nlx2z/model.json",model_loaded);


function model_loaded(){
  console.log("Model is loaded");
}


function check(){
  img = document.getElementById("captured_selfie");

  classifier.classify(img, gotResult);
}

function gotResult(error,results){

  if (error){
    console.error(error);
  }
  else{
    console.log(results);
    document.getElementById("result_object_name").innerHTML = results[0].label;
    accuracy = Math.floor((results[0].confidence)*100);
    document.getElementById("result_object_accuracy").innerHTML = accuracy + "%";
    
  }


}