Tracker.autorun(function() {
    geo = Geolocation.latLng();
    geoData.set(geo);
    geoErr.set(Geolocation.error());

    if (geo) {
        response = Meteor.http.call('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + geo.lat + '&lon=' + geo.lng + '&appid=af7904e5e48039e0f441edb8dcac68e7&units=metric', function(error, response) {
            weatherData.set(JSON.parse(response.content));
        });
    }
});

Template.weather_info.onCreated(function weather_infoOnCreated() {});

Template.weather_info.helpers({
    geo_pos() {
        var geo = geoData.get();
        if (geo) {
            return geo.lat + ', ' + geo.lng;
        } else {
            if (geoErr.get()) {
                return 'Błąd - sprawdź, czy Twoja przeglądarka zezwala na pobieranie lokalizacji';
            }
        }
    },
    weather_available() {
        return weatherData.get()
    },
    weather_temp_min() {
        var wd = weatherData.get();
        if (wd) {
            return wd.main.temp_min;
        }
    },
    weather_temp_max() {
        var wd = weatherData.get();
        if (wd) {
            return wd.main.temp_max;
        }
    },
    weather_temp() {
        var wd = weatherData.get();
        if (wd) {
            return wd.main.temp;
        }
    },
    weather_season() {
        return getSeason();
    },
    weather_city() {
        var wd = weatherData.get();
        if (wd) {
            return wd.name;
        }
    }
});

Template.weather_info.events({});