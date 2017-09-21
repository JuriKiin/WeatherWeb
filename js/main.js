(function(){
    "use strict";

    var key = '3dcb57eabd7534a36a724f0de48569b4';

    /**
     * Call this function when we load the site.
     */
    window.onload = function() {
        getLocation();
      };

    /**
     * Gets the location of the user if they allow it.
     * If they don't allow it, use the default location.
     */
    var getLocation = function getLocation() {

        var location = {};
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                location.lat = position.coords.latitude;
                location.lon = position.coords.longitude;
                getWeather(location);
            });
            console.log(location);
        } else { 
            //Give a default location.
            location.lat = 42.252877;
            location.lon = -71.002271;
            getWeather(location);
        }
    };
    
    /**
     * This function makes the actual request to get the weather data.
     * @param {Object} location     The object with lon an lat coords of our position.
     * @return N/A
     */
    var getWeather = function(location){

        
        var url = 'http://api.openweathermap.org/data/2.5/weather?' + "lat=" + location.lat + "&lon=" + location.lon
            + '&appid=' + key + '&units=imperial';

        $.ajax({
            type:"GET",
            url: url,
            async: true,
            dataType: "json",
            success: loadData,
            error: function(xhr, status, err){
                console.log("Error loading OpenWeatherMap API");
            }
        });
    };

    /**
     * This function loads all of the data, and does setup accordingly.
     * @param {Object} data The data returned from the API call.
     */
    var loadData = function(data){
        console.log(data);
        //Setup some objects for reference.
        var main = data.main;
        var wind = data.wind;
        var visibility = data.visibility;
        var sunInfo = data.sys;

        //Set main data
        var temp = document.querySelector('#temp').innerHTML = parseInt(main.temp);
        //Set secondary info
        var wind = document.querySelector('#windSpeed').innerHTML = wind.speed + 'mph';
        var humidity = document.querySelector('#humidity').innerHTML = main.humidity + '%';
        var uv = document.querySelector('#visibility').innerHTML = visibility + 'm';
        var pressure = document.querySelector('#pressure').innerHTML = main.pressure + ' hPa';
    }
    
}())