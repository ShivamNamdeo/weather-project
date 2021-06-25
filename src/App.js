import React,{useState,useEffect} from 'react';
import "./App.css";
import moment from "moment";


const App = () => {


  const [data, set_data] = useState({});
  const [data_location, set_data_location] = useState({});
  const [loading, set_loading] = useState(true);
  const api = "98243a52aafb5d914040c7a959be0e40";
  const [location, set_location] = useState("indore");
  const [location_temp, set_location_temp] = useState("indore");


  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`)
    .then(data=>data.json())
    .then(doc=>{
    	doc.cod !== "404" ? set_data_location(doc):  alert("City Not Found");
    })

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api}`)
    .then(data=>data.json())
    .then(doc=>{
    	if(doc.cod !== "404"){
    		set_data(doc);
    		set_loading(false)
    	}else{
    		alert("City Not Found")
    	}
    })

  }, [location,location_temp]);


if(loading){
  return(
    <p>Loading</p>

  )
}

const TempList = ()=>{
	return(
		 <div className="row_list">
			{data.list.map((item,index) => (
					<div key={index}>
							<div className="list_data">
								<img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="icon" />
							</div>
		    				<div className="list_data">
		    					<p>{item.dt_txt}</p>
		    				</div>
		    				<div className="list_data">
		    					<p>{item.weather[0].main} </p>
		    					<p>{parseInt(item.main.temp - 273.15)} &deg; C</p>
		    					<p>{(parseInt(item.main.temp - 273.15) * 9/5) +32} &#8457;</p>
		    				</div>
					</div>
			))}

			</div>
	)
}

  return (


    <div className="app" style={{backgroundSize: "cover", backgroundImage:`url(${`https://source.unsplash.com/featured/?${data_location.weather[0].main}`})`}}>

    <div>


    	<div className="header">
        		
    		<div className="header_comp">
    			<div className="header_search">
    				<input type="text" placeholder="Search weather using city name" onChange={(e)=>set_location_temp(e.target.value)} value={location_temp}/>
    				<img src="https://icon-library.com/images/search-icon-small/search-icon-small-17.jpg" alt="" onClick={()=>set_location(location_temp)}/>
    			</div>
    			<div className="header">

    				<div className="location_data">
 
    					<h1>{data_location.sys.country} {data_location.name}</h1>
    					<p>{moment(data_location.main.dt).format("LLL")}</p>
    				  	<h1>{data_location.weather[0].main} </h1>
    				  	<h1>{data_location.weather[0].description} </h1>
    				</div>
    				<div className="location_data">
    					
    					<h2>{parseInt(data_location.main.temp - 273.15)} &deg; C</h2>
    					<h1>{(parseInt(data_location.main.temp - 273.15) * 9/5) +32} &#8457;</h1>
    				 	<img src={`http://openweathermap.org/img/w/${data_location.weather[0].icon}.png`} alt="icon" />
    				</div>

    			</div>

    		</div>

    	</div>

    	<TempList />
  
    </div>

    </div>
  )
}

export default App