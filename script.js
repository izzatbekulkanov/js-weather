window.addEventListener('DOMContentLoaded', function(){
    const api = {
        key: "601bb4f9c6e0589e08cf092342d63ee3",
        baseUrl: "https://api.openweathermap.org/data/2.5/",
    };
    const searchBox = document.querySelector('.search-box');

    searchBox.addEventListener('keypress', setQuery);

    function setQuery(e) {
        if (e.key === "Enter") {
            getResult(searchBox.value )
           console.log(`${searchBox.value}`)
            searchBox.value = ""
        }
    }
    function getResult(querry){
        fetch(`${api.baseUrl}weather?q=${querry}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();            
        })
        .then(displayResult);
    }
    function displayResult (weather){
        console.log(weather);
        let city = document.querySelector('.location .city')
        city.innerHTML = `${weather.name}, ${weather.sys.country}`;

        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerHTML = dateBuilder(now);

        let temp = document.querySelector('.temp')
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
        let weathers = document.querySelector('.weather');
        weathers.innerHTML = weather.weather[0].main;
        let hilow = document.querySelector('.hi-low');
        hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C/${Math.round(weather.main.temp_max)}°C`;

        let iconCode = weather.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
        let icon = document.querySelector('.current .icon');
        icon.src = iconUrl;
        

        let description = document.querySelector('.description');
        description.innerHTML = `${weather.weather[0].description}`
    }

    function dateBuilder (s){
        let months = 
        [
            'January', 
            'February',
            'March',
            'April',
            'May',
            'Jyun',
            'July',
            'Áugust',
            'Septemper',
            'Octouber',
            'November',
            'December'
        ];
        let days = 
        [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        let day = days[s.getDay()];
        let date = s.getDate();
        let month = s.getMonth();
        let year = s.getFullYear();
        return `${day}/${date}/${month}/${year}`;
    }



});
