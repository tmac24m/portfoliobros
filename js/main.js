var app = angular.module('app', []);
var dados = [ 
       {
			"id"   : 0,
            "Name" : "PromoFinder",
            "Text" : "Web Design",
            "Date" : "12/06/2017",
            "Image": "60.jpg",
            "Images" : {}
        },{
			"id"   : 1,
            "Name" : "One Step to Fall Store",
            "Text" : "Web Design, Web Development",
            "Date" : "12/06/2017",
            "Image": "4.jpg",
            "Images" : {}
        },{
			"id"   : 2,
            "Name" : "Alfreds Futterkiste",
            "Text" : "Germany",
            "Date" : "12/06/2017",
            "Image": "61.jpg",
            "Images" : {}
        },{
			"id"   : 3,
            "Name" : "PromoFinder",
            "Text" : "Web Design, Web Development",
            "Date" : "12/06/2017",
            "Image": "61.jpg",
            "Images" : {}
        },{
			"id"   : 4,
            "Name" : "VoluntAge",
            "Text" : "Web Design, Web Development",
            "Date" : "12/06/2017",
            "Image": "60.jpg",
            "Images" : {}
        }
    ];

app.controller('port', function($scope) {
    $scope.works = dados;
	$scope.num = 2;

    console.log($scope.works.length)
    $scope.len = $scope.works.length;

	$scope.show = function () {
		if ($scope.num==2) $scope.num = $scope.len;
		else $scope.num =2;
	}    

});

app.controller('work', function($scope) {
    $scope.works = dados;
    $scope.show = 0;
	$scope.prev = {};
	$scope.next = {};

	var query = window.location.search.substring(4);
	var num = parseInt(query);
	//console.log(query)

	if (num-1 < 0) $scope.prev = {n: $scope.works.length-1, nome: $scope.works[$scope.works.length-1].Name};
	else $scope.prev = {n: num-1, nome: $scope.works[num-1].Name};

	if (num+1 > $scope.works.length-1) $scope.next = {n: 0, nome: $scope.works[0].Name};
	else $scope.next = {n: num+1, nome: $scope.works[num+1].Name};

    if (query) {
    	$scope.work = $scope.works[query];
    	console.log($scope.works[query])
    	if ($scope.work.Images.length > 1) {
    		$scope.show = 1;
    	}
    }else
    	window.location.href = 'index.html';
});