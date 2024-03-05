import React, { useEffect, useState } from 'react'
import '../App.css'
const SearchWeather = () => {
  const[search,setSearch]=useState("london")
  const[coord,setdata]=useState([])
  const[input,setinput]=useState("")
  let componentMounted=true;
  useEffect(()=>{
      const fetchWeather=async()=>{
        // let search = "London"
      const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=ebdfd60200d3195427a0d3cabdd615ff`);
      // const date=await response.json()
      // console.log(date)
      if(componentMounted){
        setdata(await response.json());
        console.log(coord)
      }
      return()=>{
        componentMounted=false;
      }
    }
      fetchWeather()
  },[search])

  let emoji=null;
  if(typeof coord.main !="undefined"){
    if(coord.weather[0].main == "clouds"){
      emoji = "fa-cloud"
    }
    else if(coord.weather[0].main == "Thunderstorm"){
      emoji = "fa-bolt"
    }
    else if(coord.weather[0].main == "Drizzle"){
      emoji = "fa-cloud-rain"
    }
    else if(coord.weather[0].main == "Rain"){
      emoji = "fa-cloud-shower-heavy"
    }
    else if(coord.weather[0].main == "Snow"){
      emoji = "fa-snow-flake"
    }
else{
  emoji = "fa-smog"
}
}
else{
  return(
    <div>...Loading</div>
  )
  }
  let temp=(coord.main.temp - 273.15).toFixed(2);
  let temp_min=(coord.main.temp_min - 273.15).toFixed(2);
  let temp_max=(coord.main.temp_max - 273.15).toFixed(2);

  let d = new Date()
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", {month:'long'});
  let day = d.toLocaleString("default", {weekly:'long'});

  let time = d.toLocaleString([],{
    hour : '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const handleSubmit=(event)=>{
event.preventDefault();
setSearch(input)
  }
  return (
    <div>
        <div className="container mt-5 ">
            <div className="row justify-content-center ">
                <div className="col-md-4">
                <div class="card text-white text-center border-0">
  <img src={"https://images.unsplash.com/photo-1618886487325-f665032b6352?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlJTIwaW1hZ2VzfGVufDB8fDB8fHww"}  class="card-img" alt="..."/>
  <div class="card-img-overlay">
    <form onSubmit={handleSubmit}>
    <div class="input-group mb-3 w-75 mx-auto"> 
  <input type="search" class="form-control" placeholder="search city" aria-label="search city" aria-describedby="basic-addon2" name="search" value={input} onChange={(e)=>setinput(e.target.value)} required/>
  <button type='submit' class="input-group-text" id="basic-addon2">
<i className="fas fa-search"></i>
  </button>
</div>
    </form>
    <div style={{ backgroundColor: "rgb(255 255 255 / 30%)",
  backdropFilter:" blur(10px)"}} className='bg-success bg-opacity-50 py-3 '>
    <h2 class="card-title">{coord.name}</h2>
    <p class="card-text lead">
      {month} {date}, {year}
      <br/>
      {time}
    </p>
    <hr/>
    <i className={`fas ${emoji} fa-4px`}></i>
    <h1 className='fw-bolder mb-5'>{coord.main.temp}&deg;C</h1>
    <p className='lead fw-bolder mb-0'>{coord.weather[0].main}</p>
    <p className='lead'>{temp_min}&deg;C | {temp_max }&deg;C</p>
    </div>
  </div>
</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchWeather