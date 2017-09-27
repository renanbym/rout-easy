(function () {

    angular.module('RoutEasy')
    .directive('googleplace', function () {
        return {
            require: 'ngModel',
            link:  (scope, element, attrs, model) => {
                scope.googlePlace = new google.maps.places.Autocomplete(element[0]);
                google.maps.event.addListener(scope.googlePlace, 'place_changed', function () {

                    let place = scope.googlePlace.getPlace();
                    let { location } = place.geometry;

                    scope.form.value.longitude = location.lng()
                    scope.form.value.latitude = location.lat()

                    scope.$apply( () => {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    });

})();
