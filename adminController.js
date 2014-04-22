var app = angular.module('wfgcsigAdmin', []);

var insults; 
var scope;

app.controller('wfgcsigCtrlAdmin', function ($scope) {
	// get a random insult
	scope = $scope;
	$.getJSON("http://calm-wave-1864.herokuapp.com/insults", {
		format: "json"
	}).done(function (data) {
		var i = Math.floor((Math.random()*data.insults.length));
		// $("#insult").animate({
  //   		opacity: 1
  // 		}, 500, function() {});
  // 		$("#second-insult").animate({
  //   		opacity: 1
  // 		}, 500, function() {});
		//$scope.insult = data.insults[i].insult;
		//$scope.secondInsult = data.insults[i].secondInsult;
		
		insults = data.insults;
		insults = insults.slice(0, insults.length);
		$scope.insults = insults;
		$scope.$apply();
		putInsults();
	});

	// var parts = $.getJSON("./server/parts/graphics/graphics.json", {
	// 	format: "json"
	// }).done(function (data) {
	// 	var i = Math.floor((Math.random()*data.length));
	// 	$("#part").animate({
 //    		opacity: 1
 //  		}, 500, function() {});
 //  		$("#nope").animate({
 //    		opacity: 1
 //  		}, 500, function() {});
	// 	$scope.part = data.parts[i].name;
	// 	$scope.partLink = data.parts[i].link;
	// 	$scope.partImage = data.parts[i].image;
	// 	$scope.partDesc = data.parts[i].desc;
	// 	$scope.$apply();
	// });

  	// $scope.insult = "";//"IF YOU A SIMPLE BITCH YOU MIGHT LIKE A GOOD ";
  	// $scope.part = "";//ASUS RADEON R9";
  	// $scope.partLink = "";//http://www.newegg.com/Product/Product.aspx?Item=N82E16814121803";
  	// $scope.partImage = "";//http://c1.neweggimages.com/BizIntell/item/14/121/14-121-803/pro.jpg";
  	// $scope.partDesc = "";//THIS SON OF BITCH IS BRIMMING WITH 2048 STREAM PROCESSORS WHATEVER THE FUCK THAT MEANS. IT HAS 3GB OF GDDR5 RAM FOR ALL YOU NETFLIX STREAMING NEEDS. AND A PCI EXRESS 3.0 IF YOUR BRAIN CAN EVEN FATHOM THAT SHIT. PICK THIS FUCKER UP FOR 389.99 OF YOUR USELESS AMERICAN DOLLARS.";
});

function onload() {
    var newInsultButton = document.getElementById("insults-new-button");

    if(newInsultButton.addEventListener){
        newInsultButton.addEventListener("click", newInsult);
    } else if(newInsultButton.attachEvent){
        newInsultButton.attachEvent("click", newInsult);
    } else if(newInsultButton.onclick) {
    	newInsultButton.onclick=newInsult;
    }

    var saveInsultButton = document.getElementById("insults-save-button");

    if(saveInsultButton.addEventListener){
        saveInsultButton.addEventListener("click", saveInsults);
    } else if(saveInsultButton.attachEvent){
        saveInsultButton.attachEvent("click", saveInsults);
    } else if(saveInsultButton.onclick) {
    	saveInsultButton.onclick=saveInsults;
    }
}

function saveInsults() {
	var json = JSON.stringify(insults);
	var encoded = btoa(json);

	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://calm-wave-1864.herokuapp.com/save-insult',true);
	xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send('json=' + json);
}

function newInsult() {
	insults[insults.length]={
			"insult":" ",
			"secondInsult":" "
		};
	putInsults();
}

function putInsults() {
	console.log(insults);
	scope.insults = insults;
	scope.$apply();
}