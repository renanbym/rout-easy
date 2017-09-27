(function () {

    const accessToken = "pk.eyJ1IjoicmVuYW5ieW0iLCJhIjoiY2o4MTJnNXRmNm4zNDJxcW4xeHowaWNwZCJ9.-OT7CNYkkvgyi9Civ3wW-Q";

    angular.module('RoutEasy')
    .controller('AppCtrl', AppCtrl);

    function AppCtrl($rootScope,API) {
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

        this.initMap = () => {
            this.map = L.map('mapid').setView([-23.550136, -46.633331], 7);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://github.com/renanbym">renanbym</a> contributors'
}).addTo(this.map);
            this.markers = L.layerGroup();
        }
        this.initMap();

        this.addMarker = ( lat, lon , text  ) => {
            let marker = L.marker([lat, lon]).bindPopup( text ).addTo(this.map);
            this.markers.addLayer(marker)
            this.map.addLayer(this.markers);
        }

        $rootScope.refresh = () => {
            API.all()
            .then(result => {
                    this.deliveries = result.data.data;

                    this.markers.clearLayers();
                    this.deliveries.map( (delivery) => {
                        this.addMarker(delivery.address.longitude, delivery.address.latitude, '<b>'+delivery.name+'</b><br> '+delivery.weight+' Kg');
                    })

                    this.total_clientes = this.deliveries.length;
                    this.total_peso = this.deliveries.reduce((prev, curr)=> {
                        return prev + curr.weight;
                    }, 0);
                });
        }

        $rootScope.refresh();

    }

})()
