var app = angular.module('app', []);
var dados = [ 
       {
			"id"   : 0,
            "name" : "Bio Artesanal",
            "text" : "Design Gráfico",
            "date" : "12/06/2017",
            "image": "bioartesanal-portfolio.jpg",
            "images" : [{"image":"bioartesanal-portfolio2.jpg"}]
        },{
			"id"   : 1,
            "name" : "One Step to Fall",
            "text" : "Web Design, Web Development, Design Gráfico",
            "date" : "12/06/2017",
            "image": "osf-all-v2.jpg",
            "images" : [{"image": "osf-capa-cd-mobile.jpg"}, {"image": "osf-laptop-mobile.jpg"}, {"image": "osf-logo.jpg"}]
        },{
			"id"   : 2,
            "name" : "Alfreds Futterkiste",
            "text" : "Germany",
            "date" : "12/06/2017",
            "image": "61.jpg",
            "images" : [{"image":"project/31.jpg"}]
        },{
			"id"   : 3,
            "name" : "PromoFinder",
            "text" : "Web Design, Web Development",
            "date" : "12/06/2017",
            "image": "61.jpg",
            "images" : [{"image":"project/31.jpg"}]
        },{
			"id"   : 4,
            "name" : "VoluntAge",
            "text" : "Web Design, Web Development",
            "date" : "12/06/2017",
            "image": "60.jpg",
            "images" : [{"image":"project/31.jpg"}]
        }
    ];

app.filter('firstLabel', function ($filter) {
    return function (input)
    {
        //content = content.substring(0, maxCharacters);
        var dd = input.split(',');
        if (dd.length>1) return dd[0]+"...";
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

    if (query && !isNaN(query) && query < dados.length) {
        arrows();

        //console.log(dados[query])
        $scope.work = dados[query];
        if ($scope.work.images.length > 1) {
            $scope.show = 1;
        }
    }else
        window.location.href = 'index.html';

    function arrows(){
        if (num-1 < 0) $scope.prev = {n: dados.length-1, nome: dados[dados.length-1].name};
        else $scope.prev = {n: num-1, nome: dados[num-1].name};

        if (num+1 > dados.length-1) $scope.next = {n: 0, nome: dados[0].name};
        else $scope.next = {n: num+1, nome: dados[num+1].name};
    }
});