(function () {

    angular.module('RoutEasy')
    .controller('AppCtrl', AppCtrl);

    function AppCtrl($rootScope,API) {
        this.title = "Deliveries App";
        this.deliveries = [];
        this.total_peso = 100;
        this.total_clientes = 0;

        this.delete = (delivery) => {
            API.delete(delivery._id)
                .then((result) => {
                    $rootScope.refresh();
                })
                .catch( (err) => {
                    console.log(err);
                })
        }

        $rootScope.refresh = () => {
            API.all()
            .then(result => {

                    this.deliveries = result.data.data;
                    this.total_clientes = this.deliveries.length;
                    this.total_peso = this.deliveries.reduce((prev, curr)=> {
                        return prev + curr.weight;
                    }, 0);

                });
        }

        $rootScope.refresh();

    }

})()
