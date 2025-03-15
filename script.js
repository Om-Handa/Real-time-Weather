//NAVBAR
let input = document.querySelector(".input");
let btn = document.querySelector(".searchbar");

//WEATHER CARD
let cityname= document.querySelector(".city")
let temp = document.querySelector(".temp1");
let feelslike=document.querySelector(".feelslike");
let condition=document.querySelector(".description");
let max = document.querySelector(".max");
let min = document.querySelector(".min");
let rain = document.querySelector(".rain");
let image= document.getElementById("image1");
let background=document.querySelector(".weather-card");
let common3= document.querySelectorAll(".common3")

//CARD2 (EXTRA DETAILS)
let wind = document.querySelector(".windspeed");
let humidity = document.querySelector(".humidity");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let uv = document.querySelector(".UV");
let pressure = document.querySelector(".pressure");
let moon = document.querySelector(".moonphase");
let winddir = document.querySelector(".winddir");
let common=document.querySelectorAll(".bg");

//TOMORROW WEATHER
let tomtemp=document.querySelector(".tomtemp");
let tomsunrise=document.querySelector(".tomsunrise");
let tomsunset=document.querySelector(".tomsunset");
let tomrain=document.querySelector(".tomprec");
let tomhumidity=document.querySelector(".tomhumidity");
let tomimg=document.querySelector(".tomimg");

//BUTTON WORKING
btn.addEventListener("click",  () => {
    let city = input.value;
    get(city);
})
input.addEventListener("keypress", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        let city = input.value;
        get(city);
    }
})

//API CALL
async function get(city){
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=2`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {        
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        dataentry(result)
        getimage(result)
        gettomimage(result)

    } catch (error) {
        console.log(error)
        cityname.innerHTML=`Location Not Found`;
    }
}

//FILLING OF ALL DATA
function dataentry(result){
    //WEATHER CARD
    cityname.innerHTML=`${result.location.name}, ${result.location.country}`;
    temp.innerHTML=`${Math.floor(result.current.temp_c)}&#176;C`;
    feelslike.innerHTML=`(Feels Like ${Math.floor(result.current.feelslike_c)}&#176;C)`;
    condition.innerHTML=result.current.condition.text;
    max.innerHTML = `Day: ${Math.floor(result.forecast.forecastday[0].day.maxtemp_c)}&#176;C`;
    min.innerHTML=`Night: ${Math.floor(result.forecast.forecastday[0].day.mintemp_c)}&#176;C`;
    rain.innerHTML=`Precipitaion:  ${result.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    
    //CARD2 (EXTRA DETAILS)
    wind.innerHTML=`Wind Speed:<br> ${result.current.wind_kph} Kph`;
    pressure.innerHTML=`Pressure:<br> ${result.current.pressure_in} inches`;
    moon.innerHTML=`Moon Phase:<br> ${result.forecast.forecastday[0].astro.moon_phase}`;
    winddir.innerHTML=`Wind direction:<br> ${result.current.wind_degree}&#176; ${result.current.wind_dir}`;
    humidity.innerHTML=`Humidity%:<br> ${result.current.humidity}%`
    sunrise.innerHTML=`Sunrise:<br> ${result.forecast.forecastday[0].astro.sunrise}`;
    sunset.innerHTML=`Sunset:<br> ${result.forecast.forecastday[0].astro.sunset}`;
    
    let uvindex=result.current.uv;           
    if(uvindex>0 && uvindex<=2){
        uv.innerHTML=`UV Index: <br>LOW`;
    }
    else if(uvindex>2 && uvindex<=5){
        uv.innerHTML=`UV Index: <br>MEDIUM`;
    }
    else if(uvindex>5 && uvindex<=7){
        uv.innerHTML=`UV Index: <br>HIGH`;
    }
    else if(uvindex>7 && uvindex<=10){
        uv.innerHTML=`UV Index: <br>VERY HIGH`;
    }
    else{
        uv.innerHTML=`UV Index: <br>DANGEROUS`;
    }

    //TOMORROW'S WEATHER
    tomtemp.innerHTML=`${Math.floor(result.forecast.forecastday[1].day.maxtemp_c)}&#176;C/${Math.floor(result.forecast.forecastday[1].day.mintemp_c)}&#176;C &emsp;${result.forecast.forecastday[1].day.condition.text}`
    tomsunrise.innerHTML=`Sunrise: <br>${result.forecast.forecastday[1].astro.sunrise}`
    tomsunset.innerHTML=`Sunset: <br>${result.forecast.forecastday[1].astro.sunset}`
    tomrain.innerHTML=`Precipitaion: ${result.forecast.forecastday[1].day.daily_chance_of_rain}`; 
    tomhumidity.innerHTML=`Humidity: ${result.forecast.forecastday[1].day.avghumidity}%`; 
}

//IMAGE SELECTION
function getimage(result){
    let day=result.current.is_day;
    let des=result.current.condition.text;
    switch(des){
        case"Sunny":
        set_image('images/sun.png')
        set_background('images/sun2.avif', 'black', 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(201,245,255,1) 100%)')
        break;

        case"Clear":
        set_image('images/crescent-moon.png')
        set_background('images/clear.jpg', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')
        break;

        case"Partly Cloudy":
            if(day==1){
                set_image('images/partly-cloudy.png')
                set_background('images/clear.avif', 'black', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')}
            else{
                set_image('images/mooncloud.png')
                set_background('images/partlynightbg.jpg', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')}
        break;

        case"Cloudy":
        case"Overcast":
            if(day==1){
                set_image('images/cloudy-day.png')
                set_background('images/cloudy day.avif', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')}
            else{
                set_image('images/cloudy-night.png')
                set_background('images/cloudynight.jpg', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')}
        break;

        case"Mist":
        set_image('images/mist.png')
        set_background('images/fogbg.jpg', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')
        break;

        case"Patchy snow possible":
        case"Blowing snow":
        case"Patchy light snow":
        case"Light snow":
        case"Moderate snow":
        case"Light freezing rain":
        case"Light snow showers":
        set_image('images/snow.png')
        set_background('images/snow.avif', 'black', 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(193,193,193,1) 100%)')
        break;

        case"Moderate or heavy snow showers":
        case"Patchy light snow with thunder":
        case"Moderate or heavy snow in area with thunder":
        case"Ice pellets":
        case"Patchy heavy snow":
        case"Heavy snow":
        case"Bllizard":
        set_image('images/snow-storm.png')
        set_background('images/blizzardbg.jpg', 'black', 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(193,193,193,1) 100%)')
        break;

        case"Fog":
        case"Freezing fog":
        set_image('images/fog.png')
        set_background('images/fogbg.jpg', 'white', ' linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')
        break;
        
        case"Patchy freezing drizzle possible":
        case"Patchy rain possible":
        case"Patchy light rain":
        case"Patchy rain nearby":
        case"Light rain":
        case"Light rain shower":
        case"Moderate rain at times":
        case"Moderate rain":
        case"Light sleet":
            if(day==1){
                set_image('images/rainy.png')
                set_background('images/rain.png', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')} 
            else{
                set_image('images/night-raining.png')
                set_background('images/rain.png', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')}
        break;

        case"Torrential rain shower":
        case"Moderate or heavy rain shower":
        case"Moderate or heavy sleet":
        case"Moderate or heavy freezing rain":
        set_image('images/rain.png')
        set_background('images/rain.jpg', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')
        break;

        case"Patchy light rain with thunder":
        case"Moderate or heavy rain with thunder":
        case"Heavy rain":
        case"Heavy rain at times":
        case"Thundery outbreaks in nearby":
        set_image('images/storm.png')
        set_background('images/partlynightbg.jpg', 'white', 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(119,119,119,1) 100%)')
        break;
    }

}

//IMAGE SETTING
function set_image(url1){
    image.style.background=`url(${url1})`;
    image.style.backgroundSize= 'contain';
    image.style.backgroundPosition= 'center';
    image.style.backgroundRepeat= 'no-repeat';
}

//BACKGROUND SETTING
function set_background(url2, color, grad){
    background.style.background=`url(${url2})`
    background.style.backgroundSize= 'cover';
    background.style.backgroundPosition= 'center';
    background.style.backgroundRepeat= 'no-repeat';
    common3.forEach(e=>{
        e.style.color=`${color}`
    })
    common.forEach(e=>{
        e.style.background=grad
        e.style.color=`${color}`
    })
    common.forEach(e=>{
        e.style.background=grad
        e.style.color=`${color}`
    })
}

//TOMORROW WEATHER IMAGE SELECTION
function gettomimage(result){
let des=result.current.condition.text;
    switch(des){
        case"Sunny":
        set_tomimage('images/sun.png')
        break;

        case"Clear":
        set_tomimage('images/crescent-moon.png')
        break;

        case"Partly Cloudy":
        set_tomimage('images/partly-cloudy.png')
        break;

        case"Cloudy":
        case"Overcast":
        set_tomimage('images/cloudy-day.png')
        break;

        case"Mist":
        set_tomimage('images/mist.png')
        break;

        case"Patchy snow possible":
        case"Blowing snow":
        case"Patchy light snow":
        case"Light snow":
        case"Moderate snow":
        case"Light freezing rain":
        case"Light snow showers":
        set_tomimage('images/snow.png')
        break;

        case"Moderate or heavy snow showers":
        case"Patchy light snow with thunder":
        case"Moderate or heavy snow with thunder":
        case"Ice pellets":
        case"Patchy heavy snow":
        case"Heavy snow":
        case"Bllizard":
        set_tomimage('images/snow-storm.png')
        break;

        case"Fog":
        case"Freezing fog":
        set_tomimage('images/fog.png')
        break;

        case"Patchy freezing drizzle possible":
        case"Patchy rain possible":
        case"Patchy light rain":
        case"Patchy rain nearby":
        case"Light rain":
        case"Light rain shower":
        case"Moderate rain at times":
        case"Moderate rain":
        case"Light sleet":
        set_tomimage('images/rainy.png')
        break;

        case"Torrential rain shower":
        case"Moderate or heavy rain shower":
        case"Moderate or heavy sleet":
        case"Moderate or heavy freezing rain":
        set_tomimage('images/rain.png')
        break;

        case"Patchy light rain with thunder":
        case"Moderate or heavy rain with thunder":
        case"Heavy rain":
        case"Heavy rain at times":
        case"Thundery outbreaks in nearby":
        set_tomimage('images/storm.png')
        break;
    }
}

//TOMORROW WEATHER IMAGE SETTING
function set_tomimage(url3){
    tomimg.style.background=`url(${url3})`;
    tomimg.style.backgroundSize= 'contain';
    tomimg.style.backgroundPosition= 'center';
    tomimg.style.backgroundRepeat= 'no-repeat';
}