var app = angular.module('wfgcsig', []);
 
app.controller('wfgcsigCtrl', function ($scope) {
	// get a random insult
	//var insults = $.getJSON("./server/insults/insults.json", {
	var insults = $.getJSON("http://localhost:3000/insults", {
		format: "json"
	}).done(function (data) {
		var i = Math.floor((Math.random()*data.insults.length));
		$("#insult").animate({
    		opacity: 1
  		}, 500, function() {});
  		$("#second-insult").animate({
    		opacity: 1
  		}, 500, function() {});
		$scope.insult = data.insults[i].insult;
		$scope.secondInsult = data.insults[i].secondInsult;
		$scope.$apply();
	});

	var parts = $.getJSON("./server/parts/graphics/graphics.json", {
		format: "json"
	}).done(function (data) {
		var i = Math.floor((Math.random()*data.length));
		$("#part").animate({
    		opacity: 1
  		}, 500, function() {});
  		$("#nope").animate({
    		opacity: 1
  		}, 500, function() {});
		$scope.part = data.parts[i].name;
		$scope.partLink = data.parts[i].link;
		$scope.partImage = data.parts[i].image;
		$scope.partDesc = data.parts[i].desc;
		$scope.$apply();
	});

  	$scope.insult = "";//"IF YOU A SIMPLE BITCH YOU MIGHT LIKE A GOOD ";
  	$scope.part = "";//ASUS RADEON R9";
  	$scope.partLink = "";//http://www.newegg.com/Product/Product.aspx?Item=N82E16814121803";
  	$scope.partImage = "";//http://c1.neweggimages.com/BizIntell/item/14/121/14-121-803/pro.jpg";
  	$scope.partDesc = "";//THIS SON OF BITCH IS BRIMMING WITH 2048 STREAM PROCESSORS WHATEVER THE FUCK THAT MEANS. IT HAS 3GB OF GDDR5 RAM FOR ALL YOU NETFLIX STREAMING NEEDS. AND A PCI EXRESS 3.0 IF YOUR BRAIN CAN EVEN FATHOM THAT SHIT. PICK THIS FUCKER UP FOR 389.99 OF YOUR USELESS AMERICAN DOLLARS.";
});