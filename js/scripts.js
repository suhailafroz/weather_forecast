import { myChart } from './charts.js'

let weatherCard = document.getElementById("weatherCard");
let forecastCard = document.getElementById("forecastCard");
let btnsDiv = document.getElementById("btnsDiv");
weatherCard.style.display = "none";
forecastCard.style.display = "none";
btnsDiv.style.display = "none";

let lineBtn = document.getElementById("updateLine");
let barBtn = document.getElementById("updateBar");
let pieBtn = document.getElementById("updatePie");

lineBtn.addEventListener("click", () => {
    myChart.config.type = "line";
    myChart.update();
})
barBtn.addEventListener("click", () => {
    myChart.config.type = "bar";
    myChart.update();
})
pieBtn.addEventListener("click", () => {
    myChart.config.type = "pie";
    myChart.update();
})

// ID's available in the HTML:  weatherIcon, cityName, countryName, main, description, humidity, temp, mnTemp, mxTemp, feels
// Buttons:  getWeather, updateLine, updateBar, updatePie
// Text Field: cname

async function main() {
    let city = document.getElementById("cname").value;
    let weatherKey = "0da6a82fa60dee88e41a736655a427b5"
    let iconURL = `https://openweathermap.org/img/wn/10d@2x.png`;
    let weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`
    let forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherKey}&units=metric`
    let img = document.getElementById("weatherIcon");
    let cityName = document.getElementById("cityName");
    let countryName = document.getElementById("countryName");
    let main = document.getElementById("main");
    let description = document.getElementById("description");
    let humidity = document.getElementById("humidity");
    let temperature = document.getElementById("temp");
    let minTemp = document.getElementById("mnTemp");
    let maxTemp = document.getElementById("mxTemp");
    let feels = document.getElementById("feels");

    let response = await fetch(weatherURL);
    let data = await response.json();
    let icon = data.weather[0].icon;
    img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
    main.innerHTML = data.weather[0].main + " (" + data.weather[0].description + ")";
    // description.innerHTML = data.weather[0].description;
    cityName.innerHTML = data.name + " (" + data.sys.country + ")";;
    // countryName.innerHTML = data.sys.country;
    humidity.innerHTML = "Humidity : " + data.main.humidity + "%";
    temperature.innerHTML = data.main.temp + " <sup>o</sup>C";
    feels.innerHTML = "Feels Like : " + data.main.feels_like + " <sup>o</sup>C";
    // minTemp.innerHTML = data.main.temp_min;
    // maxTemp.innerHTML = data.main.temp_max;
    weatherCard.style.display = "block";
    forecastCard.style.display = "block";
    btnsDiv.style.display = "block";

    let forecastResponse = await fetch(forecastURL)
    let forecastData = await forecastResponse.json();
    let forecastResult = forecastData.list;
    let daysArray = [];
    let tempArray = [];
    for (let i = 0; i < forecastResult.length; i = i + 8) {
        daysArray.push(forecastResult[i].dt_txt.split(" ")[0])
        tempArray.push(forecastResult[i].main.temp)
    }

    myChart.config.data.labels = daysArray;
    myChart.config.data.datasets[0].data = tempArray;
    myChart.update();
}

let weatherBtn = document.getElementById("getWeather");
weatherBtn.addEventListener("click", () => {
    main()
})

