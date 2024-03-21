import { useState } from 'react'
import './App.css'
import APIForm from './Components/APIForm'
import Gallery from './Components/Gallery';
//https://api.apiflash.com/v1/urltoimage?access_key=cb51cd72b03f4ba49ed1c43b8bed77e6&wait_until=page_loaded&url=http://google.com

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const [prevImages, setPrevImages] = useState([]);

const App = () => {

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
  
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
  
    callAPI(query).catch(console.error);
  }
  
  const submitForm = (e) =>{
    e.preventDefault();
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };
  
    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
    }
    else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "") {
          inputs[key] = defaultValues[key]
        }
      }
    }
  
    makeQuery();
  
  }
  
  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
  
    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
    }
    else {
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
    }
  
  }
  
  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  }
  

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const [currentImage, setCurrentImage] = useState(null);

  return (
    <div className='whole-page'>
      <h1>Build Your Own Screenshot! </h1>
      <APIForm 
      inputs={inputs}
      handleChange={(e) => setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value.trim(),
      }))
      }
      onSubmit={submitForm}
      />
      {currentImage ? (
  <img
    className="screenshot"
    src={currentImage}
    alt="Screenshot returned"
  />
) : (
  <div> </div>
)}

<div className="container">
  <h3> Current Query Status: </h3>
  <div className="container">
  <Gallery images={prevImages} />
</div>
  <p>
    https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
    <br></br>
    &url={inputs.url} <br></br>
    &format={inputs.format} <br></br>
    &width={inputs.width}
    <br></br>
    &height={inputs.height}
    <br></br>
    &no_cookie_banners={inputs.no_cookie_banners}
    <br></br>
    &no_ads={inputs.no_ads}
    <br></br>
  </p>
</div>

<br></br>
    </div>
  )
}

export default App