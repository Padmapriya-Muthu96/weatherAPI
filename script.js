
/*
var res=fetch("https://restcountries.com/v3.1/all")
.then((data)=>data.json()).then((data1)=>{
    console.log(data1);
    for(var i=0;i<data1.length;i++){
        console.log(`Country name:${data1[i].name.common} Capital:${data1[i].capital}`);
        console.log(`Country name:${data1[i].name.common} Flag:${data1[i].flags.svg}`);
    }
});
*/

var container=document.createElement("div");
container.className="container";

var row=document.createElement("div");
row.classList.add("row","m-3");

container.append(row);

var res=fetch("https://restcountries.com/v3.1/all")
res.then((data)=>data.json()).then((data1)=>foo(data1));

function foo(data1){
    for(var i=0;i<data1.length;i++){
        row.innerHTML+=`
        <div class="col-md-4">
        <div class="card border-primary mb-3 " style="width: 18rem;">
        <h5 class="card-title">${data1[i].name.common}</h5>
        
        <img src="${data1[i].flags.svg}" class="card-img-top" alt="country flags">
       
          <div class="card-body">
        <p class="con-cap">Capital: ${data1[i].capital}</p>
        <p class="con-reg">Region: ${data1[i].region}</p>
        <p class="con-code">Country Code: ${data1[i].cca3}</p>
        <button onclick="getdata()" id="btnres">Click for Weather</button>
        <p id="con-wea"></p>
        </div>
      </div>
      </div>
        `;
        document.body.append(container);
       
    }

}
async function getdata(){
  let res=await fetch("https://restcountries.com/v3.1/all");
  let result=await res.json();
  for(var i=0;i<result.length;i++){
      var name=result[i].name.common;
      var latlon=result[i].latlng;//[13.33,45.3]
      wd(name,...latlon); //wd(13.33,45.3)
  }

}

getdata();


async function wd(name,lat,lon){
  let res1= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=49185ef9ff8a5e4aa64c5261fa9c02e2`)
  let res2=await res1.json();
  console.log(res2);
  //console.log(`${name}${res2.main.temp}`);
  let weather=`${name}${res2.main.temp}`;
  document.getElementById("con-wea").innerHTML=weather;
  }