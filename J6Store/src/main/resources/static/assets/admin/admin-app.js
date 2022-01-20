app=angular.module('admin-app',['ngRoute']);

app.config(function ($routeProvider) {
   // alert("admin-appp")
    $routeProvider
    .when("/product",{
        templateUrl:"/assets/admin/product/index.html",
        controller:"product-ctrl"
    })
    .when("/authorize",{
        templateUrl:"/assets/admin/authority/index.html",
        controller:"authority-ctrl"
    })
    .when("/unauthorized",{
        templateUrl:"/assets/admin/authority/unauthority.html",
        controller:"authority-ctrl"
    })
    .otherwise({
        template:"<h1 class='text-center'>FPT Polytechnic Administration</h1>"
    })
})