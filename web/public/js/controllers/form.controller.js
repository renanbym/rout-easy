(function () {

    angular.module('RoutEasy')
    .controller('FormCtrl', FormCtrl);
    function FormCtrl($scope, $rootScope,  API) {

        this.master = {
            name: '',
            weight: '',
            address: '',
        }


        this.reset = function(){
            this.value = angular.copy(this.master);
        }

        this.submit = () => {

            let address = $scope.googlePlace.getPlace();
            if (!address.address_components) {
                alert("falha ao pegar informações do endereço '" + address.name + "'");
                return;
            }

            if (address.address_components.length < 6) {
                alert("Endereço incompleto ou pequeno");
                return;
            }

            let { name, weight } = $scope.form.value;
            let add_details = address.address_components;

            let delivery = {
                name: $scope.form.value.name
                , weight: $scope.form.value.weight
                , address: {
                    street: add_details[1].long_name+', '+add_details[0].long_name+', '+add_details[2].long_name
                    , city: add_details[3].long_name
                    , state: add_details[4].long_name
                    , country: add_details[5].long_name
                    , latitude: $scope.form.value.longitude
                    , longitude: $scope.form.value.latitude
                }
            }


            API.save(delivery)
            .then( (result) => {
                this.reset();
                $rootScope.refresh();
            })
            .catch( (err) => {
                console.log(err);
                $scope.refresh();
                window.alert(err.data.message);
            });
        }

        this.reset();
    }


})()
