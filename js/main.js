var app = angular.module('app', []);
var dados = [
    {
        "id": 0,
        "name": "Bio Artesanal",
        "autor": "Tiago Carvalho",
        "title": "Design Gráfico",
        "date": "12/06/2017",
        "texts": [{"text": "Desenvolvimento de flyer em Photoshop para a divulgação de produtos."}],
        "mobile": "bioartesanal-bg-mobile-min.jpg",
        "image": "bioartesanal-portfolio-min.jpg",
        "images": [{"image": "bioartesanal-portfolio2-min.jpg"}],
        "social": [{"link": "https://www.facebook.com/bioartesanal", "name": "Facebook", "icon": "facebook"}]
    }, {
        "id": 1,
        "name": "One Step to Fall",
        "autor": "Tiago e Diogo Carvalho",
        "title": "Web Design, Web Development, Design Gráfico",
        "texts": [{"text": "Criação de logótipo, capa de álbum e CD em Photoshop e Illustrator (Tiago Carvalho)."},
            {"text": "Criação de website responsivo que visa facilitar o acesso ao album da banda nas várias plataformas de música disponíveis (Diogo Carvalho)."}],
        "date": "12/06/2017",
        "mobile": "osf-bg-mobile-min.jpg",
        "image": "osf-all-v2-min.jpg",
        "images": [{"image": "osf-capa-cd-mobile-min.jpg"}, {"image": "osf-laptopmobile-min.jpg"}, {"image": "osf-logo-min.jpg"}],
        "social": [{"link": "http://osf.comuf.com", "name": "Site Oficial", "icon": "globe"}, {"link": "https://www.facebook.com/OneSteptoFall", "name": "Facebook", "icon": "facebook"}, {"link": "https://www.instagram.com/osf_band", "name": "Instagram", "icon": "instagram"}, {"link": "https://www.youtube.com/channel/UCCZuLscFeWjawv6mFrq1g5g", "name": "Youtube", "icon": "youtube-play"}]
    }, {
        "id": 2,
        "name": "Caves Cruzeiro Real",
        "autor": "Diogo Carvalho",
        "title": "Web Design, Web Development",
        "date": "12/06/2017",
        "texts": [{"text": "Criação de website responsivo com backoffice que divulga a história da empresa e os seus variados produtos."}],
        "mobile": "caves-bg-mobile-min.jpg",
        "image": "caves-all-v2-min.jpg",
        "images": [{"image": "caves-laptopmobile-min.jpg"}],
        "social": [{"link": "https://www.cavescruzeiroreal.pt", "name": "Site Oficial", "icon": "globe"}, {"link": "https://www.facebook.com/CavesCruzeiroReal/", "name": "Facebook", "icon": "facebook"}]
    }
];

app.filter('firstLabel', function ($filter) {
    return function (input) {
        //content = content.substring(0, maxCharacters);
        var dd = input.split(',');
        if (dd.length > 1) return dd[0] + "...";
        else return input;
    };
});

app.controller('port', function ($scope) {
    $scope.works = dados;

    var query = window.location.search.substring(3);
    
    if (query && query == 'success')
        $("#alert-msg").show();

    $(window).click(function() {
        $("#alert-msg").hide();
    });

});

app.controller('work', function ($scope) {
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
        if ($scope.work.images.length > 1)
            $scope.show = 1;
    } else
        window.location.href = 'index.html';

    function arrows() {
        $scope.prev = (num - 1 < 0) ? {n: dados.length - 1, nome: dados[dados.length - 1].name} : {n: num - 1, nome: dados[num - 1].name};
        $scope.next = (num + 1 > dados.length - 1) ? {n: 0, nome: dados[0].name} : {n: num + 1, nome: dados[num + 1].name};
    }
});