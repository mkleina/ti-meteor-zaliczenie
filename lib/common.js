geoData = new ReactiveVar();
geoErr = new ReactiveVar();
weatherData = new ReactiveVar();
newClothID = null

getSeason = function() {
    month = new Date().getMonth();
    switch (month) {
        case 11:
        case 0:
        case 1:
            return "Zima";
        case 2:
        case 3:
        case 4:
            return "Wiosna";
        case 5:
        case 6:
        case 7:
            return "Lato";
        case 8:
        case 9:
        case 10:
            return "Jesień";
    }
}