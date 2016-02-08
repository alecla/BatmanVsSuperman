'use strict'

module.exports = function($scope, $http, gridService, $timeout) {
    $scope.loader = true;
    $scope.title = "Batman vs Superman";
    $scope.desc = "Batman vs Superman, who would win really?";

    //Get photos from flickr
    $scope.photos = function (searchstring) {
        $scope.loader = true;
        gridService.getPhotos(searchstring)
        .success(function(data) {
            $scope.loader = false;
            //if response OK
            if (data.stat == "ok") {
                if (data.photos.photo.length) {
                    $scope.flickrResult = data.photos.photo; 
                    console.log($scope.flickrResult);
                //response can be empty, will let user know                   
                } else {
                    $scope.errormsg = "No photos found. Please try refresh the page.";
                    console.log(data); 
                }
            //if response not OK, show error message
            } else {
                $scope.errormsg = data.message || "Something went wrong. Please try refresh the page.";
            }

            //Builds URLS for photos
            for (var i = 0; i < $scope.flickrResult.length; i++) {
                $scope.flickrResult[i]["url"] = "https://farm" + $scope.flickrResult[i].farm + ".staticflickr.com/" + $scope.flickrResult[i].server + "/" + $scope.flickrResult[i].id + "_" + $scope.flickrResult[i].secret + "";              
            }

            sessionStorage.setItem('photos', JSON.stringify($scope.flickrResult)); 
        })
        .error(function(data) {
            $scope.loader = false;
            $scope.errormsg = data || "Something went wrong. Please try refresh the page."; 
            console.log(data);
        });
    }

        //Remove cache from webstorage and calls photos with new query
        $scope.filter = function(searchstring) {
            sessionStorage.removeItem("photos"); 
            $scope.photos(searchstring);
        }

        //If photos does not exist in webstorage, we request them. Otherwise grab them from webstorage
        if (!sessionStorage.getItem("photos")) {
            $scope.photos("Batman");
        } else {
            $scope.flickrResult = JSON.parse(sessionStorage.getItem('photos'));
            $scope.loader = false;
            console.log($scope.flickrResult);
        }

    };