const uri = 'https://locationiq.org/v1/search.php?key='
const apiKey = '4603c7ae3c46d2ea27f7'
const url = 'http://api.openweathermap.org/data/2.5/forecast/daily?&'
const appId = '57f67725770e40cd2a615d827e5c19df'
const form = document.getElementById('weather')
const txtCity = document.getElementById('txtCity')
const txtCountry = document.getElementById('txtCountry')
const lbldisplay = document.getElementById('display')
const lblHumidity = document.getElementById('lblhumidity')
const lblWeather = document.getElementById('lblweather')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const city = txtCity.value;
  const country = txtCountry.value;
  fetch(`${uri}${apiKey}&format=json&city=${city}&country=${country}`)
  .then((res) => res.json())
  .then((data) => {    
      fetch(`${url}lat=${data[0].lat}&lon=${data[0].lon}&appid=${appId}&units=metric`)
      .then((result) => result.json())
      .then((data1) => {
console.log(data1)
        var humidity = "";
        var weather = "";
        let maxtemp="";
        let mintemp="";
        let pressure="";
        let date="";
       
        let month1=""

        for (let i = 0; i < 5; i++) {
            humidity = data1.list[i].humidity;
            weather = data1.list[i].weather[0].main;
            maxtemp = data1.list[i].temp.max
            mintemp = data1.list[i].temp.min
            pressure =Math.floor(data1.list[i].pressure)
            let originalDate = new Date((data1.list[i].dt)*1000)
            console.log(originalDate)
            month1=originalDate.getMonth()
            console.log(weather)

            let box=document.createElement("div")
            let box1=document.createElement("div")
            let sp=document.createElement("span")
            sp.textContent=originalDate.getDate() +" " +findMonth(month1)
            // let main=document.createElement("img")

            

          let image = "<img src='http://openweathermap.org/img/w/" + data1.list[i].weather[0].icon + ".png'>";
           // main.src=image
           box1.innerHTML=image;


            // document.getElementById("content").innerHTML=image;
            let sp1=document.createElement("span")
            sp1.textContent=weather
            sp1.setAttribute('class','text-span-1');
            let h3=document.createElement("h3")
            h3.setAttribute('id','h3'+i);
            h3.textContent="temp:"+maxtemp +"\xB0"+"C/" +mintemp +"\xB0 "+"C"
            let sp2=document.createElement("span")
            sp2.textContent="humidity:"+humidity
            sp2.setAttribute('class','text-span');
            let sp3=document.createElement("span")
            sp3.setAttribute('class','text-span');
            sp3.textContent="pressure:"+pressure
            box.appendChild(sp)
            box.appendChild(box1)
            box.appendChild(sp1)
            box.appendChild(h3)
            box.appendChild(sp2)
            box.appendChild(sp3)

            var convertToF = document.createElement('button');
            convertToF.appendChild(document.createTextNode("Convert to Fahrenheit"));
            convertToF.setAttribute('id','button'+i);
            convertToF.setAttribute('onClick','convertToF("'+maxtemp+'", "'+mintemp+'", "'+h3.id+'", "'+convertToF.id+'")');
            box.appendChild(convertToF)
            let mainDiv=document.getElementById("display")
            mainDiv.appendChild(box)


      
        }

        
        //lbldisplay.innerHTML=`the longitude and latitude for this location are: lon ${data[0].lon} lat ${data[0].lat}`;    
      })
      .catch((e) => console.log(e, "what's happening dave?"))


  })
  .catch((e) => console.log(e, "what's happening dave?"))
})
function findMonth(mon){
  let month=["Jan","Feb","March","Apr","May","Jun","jul","Aug","Sept","Oct","Nov","Dec"]
  return (month[mon])

}
function convertToC(maxValue, minValue, id, button) {
  var maxcTempVal = (maxValue - 32) * (5 / 9);
  var mincTempVal = (minValue - 32) * (5 / 9);
  document.getElementById(id).innerHTML="temp:"+maxfTempVal.toFixed(2) +"\xB0"+"C/" +minfTempVal.toFixed(2) +"\xB0 "+"C";
  return false;
}

function convertToF(maxValue, minValue, id, button) {
  if (document.getElementById(button).innerHTML == "Convert to Celsius")
  {
      var maxfTempVal = parseFloat(document.getElementById('maxfTempVal').value);
      var minfTempVal = parseFloat(document.getElementById('minfTempVal').value);
      var maxcTempVal = (maxfTempVal - 32) * (5 / 9);
      var mincTempVal = (minfTempVal - 32) * (5 / 9);
      document.getElementById(id).innerHTML="temp:"+maxcTempVal.toFixed(2) +"\xB0"+"C/" +mincTempVal.toFixed(2) +"\xB0 "+"C";
      document.getElementById(button).innerHTML = "Convert to Fahrenheit";
  }
  else {
      var maxfTempVal = (maxValue * (9 / 5)) + 32;
      var minfTempVal = (minValue * (9 / 5)) + 32;
      document.getElementById('maxfTempVal').value=maxfTempVal.toFixed(2)
      document.getElementById('minfTempVal').value=minfTempVal.toFixed(2)
      document.getElementById(id).innerHTML="temp:"+maxfTempVal.toFixed(2) +"\xB0"+"F/" +minfTempVal.toFixed(2) +"\xB0 "+"F";
      document.getElementById(button).innerHTML = "Convert to Celsius";
  }  
  return false;
} 