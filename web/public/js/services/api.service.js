(function () {
    'use strict';

    angular.module('RoutEasy')
    .service('API', api);

    function api($resource,$http) {

        return{

            all: () => {
                return $http.get('/api/deliveries');
            }

            ,save: value => {
                return $http.post('/api/deliveries', value);
            }

            ,delete: value => {
                return $http({
                    method: 'DELETE',
                    url: '/api/deliveries',
                    data: {_id: value},
                    headers: {'Content-Type': 'application/json;charset=utf-8'}
                })
            }

        }
    }

})();
