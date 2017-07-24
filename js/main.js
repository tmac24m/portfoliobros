var app = angular.module('app', []);
var dados = [ 
       {
			"id"   : 0,
            "name" : "PromoFinder",
            "text" : "Web Design",
            "date" : "12/06/2017",
            "image": "60.jpg",
            "images" : {}
        },{
			"id"   : 1,
            "name" : "One Step to Fall Store",
            "text" : "Web Design, Web Development",
            "date" : "12/06/2017",
            "image": "4.jpg",
            "images" : {}
        },{
			"id"   : 2,
            "name" : "Alfreds Futterkiste",
            "text" : "Germany",
            "date" : "12/06/2017",
            "image": "61.jpg",
            "images" : {}
        },{
			"id"   : 3,
            "name" : "PromoFinder",
            "text" : "Web Design, Web Development",
            "date" : "12/06/2017",
            "image": "61.jpg",
            "images" : {}
        },{
			"id"   : 4,
            "name" : "VoluntAge",
            "text" : "Web Design, Web Development",
            "date" : "12/06/2017",
            "image": "60.jpg",
            "images" : {}
        }
    ];

app.filter('firstLabel', function ($filter) {
    return function (input)
    {
        //content = content.substring(0, maxCharacters);
        var dd = input.split(',');
        if (dd.length>1) return dd[0]+" ...";
        else return input;
    };
});

app.controller('port', function($scope) {
    $scope.works = dados;
});

app.controller('work', function($scope) {
    $scope.works = dados;
    $scope.show = 0;
	$scope.prev = {};
	$scope.next = {};

	var query = window.location.search.substring(4);
	var num = parseInt(query);

    if (query && !isNaN(query) && query < $scope.works.length) {
        arrows();

        //console.log($scope.works[query])
        $scope.work = $scope.works[query];
        if ($scope.work.images.length > 1) {
            $scope.show = 1;
        }
    }else
        window.location.href = 'index.html';

    function arrows(){
        if (num-1 < 0) $scope.prev = {n: $scope.works.length-1, nome: $scope.works[$scope.works.length-1].name};
        else $scope.prev = {n: num-1, nome: $scope.works[num-1].name};

        if (num+1 > $scope.works.length-1) $scope.next = {n: 0, nome: $scope.works[0].name};
        else $scope.next = {n: num+1, nome: $scope.works[num+1].name};
    }
});