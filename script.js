//  programming love s2
const key = '07174b7a9e92cf000589dcfc933b5124'

let pretty = 10

function main(){

    let cont = 0
    let h = [] //humidity
    let w = [] //wind
    let u = [] //uv_index
    let rtemp = []  //last temperature
    let rcity = []  //last city name
    let ricon = []  //last icon

    const form = document.querySelector('form')
    form.addEventListener('submit', (event) => {

        event.preventDefault()

        const keybord = document.querySelector('input')
        const value = keybord.value

        getApi(value, h, w, u, rtemp, rcity, ricon, cont)
        cont++
    })
}

function makeRecent(oldData){

    console.log(oldData)
}

function getApi(cityName, h, w, u, rtemp, rcity, ricon, cont){
    fetch('http://api.weatherstack.com/current?access_key='+key+'&query='+cityName)
        .then(res => res.json())
        .then(data => {

            console.log(data)

            if(data.success == false)
            {
                // console.log('error')

                const legend = document.querySelector('legend')
                legend.innerText = 'Open Weather'
                rcity[cont] = 'Error'

                const icon = document.querySelector('#icon')
                icon.innerHTML = ''

                const time = document.querySelector('#time')
                time.innerText = '--:--'

                const humidity = document.querySelector('#humidity')
                humidity.innerText = ''
                h[cont] = humidity.innerText

                const wind = document.querySelector('#wind')
                wind.innerText = ''
                w[cont] = wind.innerText

                const uvIndex = document.querySelector('#uvIndex')
                uvIndex.innerText = ''
                u[cont] = uvIndex.innerText

                const temp = document.querySelector('#temp')
                temp.innerText = 'Sorry'
                rtemp[cont] = '0ºC'

                const weather = document.querySelector('#weather')
                weather.innerText = 'The city '+cityName+ ' is not in our system.'
            }
            else
            {
                const legend = document.querySelector('legend')
                legend.innerText = cityName

                rcity[cont] = cityName

                const temp = document.querySelector('#temp')
                temp.innerText = data.current.temperature + 'ºC'
                rtemp[cont] = temp.innerText

                const icon = document.querySelector('#icon')
                checkWeather(data, icon)

                const time = document.querySelector('#time')
                let s = JSON.stringify(data.location.localtime)
                s = charCount(s)
                time.innerText = s

                const weather = document.querySelector('#weather')
                const bool = isDay(data.current.is_day)
                if(bool==true)  weather.innerText = 'Day'
                else    weather.innerText = 'Night'

                const humidity = document.querySelector('#humidity')
                humidity.innerText = data.current.humidity+' %'
                h[cont] = humidity.innerText

                const wind = document.querySelector('#wind')
                wind.innerText = data.current.wind_speed+' km/h'
                w[cont] = wind.innerText

                const uvIndex = document.querySelector('#uvIndex')
                uvIndex.innerText = data.current.uv_index+' - 10 (UV Index)'
                u[cont] = uvIndex.innerText

                if(cont > 0)
                {
                    const i1 = document.querySelector('#i1')
                    const i2 = document.querySelector('#i2')
                    const i3 = document.querySelector('#i3')

                    const recentCity = document.querySelector('#rcity')
                    const recentTemperature = document.querySelector('#rtemp')
                    
                    i1.innerText = w[cont-1]
                    i2.innerText = h[cont-1]
                    i3.innerText = u[cont-1]

                    recentCity.innerText = rcity[cont-1]
                    recentTemperature.innerText = rtemp[cont-1]
                }

                if(cont > 1)
                {
                    const cbot = document.querySelector('#cbot')

                    if(cont > 2)
                    {
                        const anteriores = document.querySelector('#anteriores')

                        anteriores.innerHTML = '<span id="rcity" class="medium">'+rcity[cont-2]+'</span><div id="recent"><h6 id="rtemp" class="display-4 mb-0"> '+rtemp[cont-2]+' </h6><div id="tempGrid" class="flex-grow-1" style="font-size: 1rem;"><div><i class="fas fa-wind fa-fw" style="color: whitesmoke;"></i> <span class="ms-1" id="i1">'+w[cont-2]+'</span></div><div><i class="fas fa-tint fa-fw" style="color: whitesmoke;"></i> <span class="ms-1" id="i2">'+h[cont-2]+'</span></div><div><i class="fas fa-sun fa-fw" style="color: whitesmoke;"></i> <span class="ms-1" id="i3">'+u[cont-2]+'</span></div></div><div id="ricon" style="width: 100px; height: 100px;"></div></div>' + anteriores.innerHTML
                    }
                    else
                    {
                        cbot.innerHTML += '<div id="anteriores"><span id="rcity" class="medium">'+rcity[cont-2]+'</span><div id="recent"><h6 id="rtemp" class="display-4 mb-0"> '+rtemp[cont-2]+' </h6><div id="tempGrid" class="flex-grow-1" style="font-size: 1rem;"><div><i class="fas fa-wind fa-fw" style="color: whitesmoke;"></i> <span class="ms-1" id="i1">'+w[cont-2]+'</span></div><div><i class="fas fa-tint fa-fw" style="color: whitesmoke;"></i> <span class="ms-1" id="i2">'+h[cont-2]+'</span></div><div><i class="fas fa-sun fa-fw" style="color: whitesmoke;"></i> <span class="ms-1" id="i3">'+u[cont-2]+'</span></div></div><div id="ricon" style="width: 100px; height: 100px;"></div></div></div>'
                    }
                }
            }
        })
}

function charCount(s, tam = s.length){

    let myString = ''

    for(let i = 12; i < tam-1; i++)
    {
        myString += s.charAt(i)
    }

    return myString
}

function isDay(data){

    if(data == 'yes')   return true
    else    return false
}

function checkWeather(data, icon){

    if(data.current.weather_descriptions[0]=="Mist")
    {
        icon.innerHTML = '<img id="icon" src="./img/weather/foggy.png" width="100px" heigth="100px"></img>'
    }
    if(data.current.weather_descriptions[0]=="Light Rain" || "Rain")
    {
        icon.innerHTML = '<img id="icon" src="./img/weather/rain.png" width="100px" heigth="100px"></img>'
    }
    if(data.current.weather_descriptions[0]=="Overcast")
    {
        icon.innerHTML = '<img id="icon" src="./img/weather/overcast.png" width="100px" heigth="100px"></img>'
    }

    if(data.current.is_day=='yes')
    {
        if(data.current.weather_descriptions[0]=='Partly cloudy')
        {
            icon.innerHTML = '<img id="icon" src="./img/weather/partly-cloudy.png" width="100px" heigth="100px"></img>'
        }
        if(data.current.weather_descriptions[0]=='Sunny')
        {
            icon.innerHTML = '<img id="icon" src="./img/weather/sunny.png" width="100px" heigth="100px"></img>'
        }
        if(data.current.weather_descriptions[0]=="Patchy rain possible")
        {
            icon.innerHTML = '<img id="icon" src="./img/weather/rainy-day.png" width="100px" heigth="100px"></img>'
        }
    }
    else
    {
        if(data.current.weather_descriptions[0]=='Clear')
        {
            icon.innerHTML = '<img id="icon" src="./img/weather/crescent-moon.png" width="100px" heigth="100px"></img>'
        }
        if(data.current.weather_descriptions[0]=='Partly cloudy')
        {
            icon.innerHTML = '<img id="icon" src="./img/weather/moon.png" width="100px" heigth="100px"></img>'
        }
    }
}

main()