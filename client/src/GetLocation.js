"use strict";
/*import { useState, useEffect } from "react";


const GetLocation = () => {
    const [location, setLocation] = useState({lat: 0, lng: 0});

    const getLocation = () => {
        if (!navigator.geolocation) {
            setLocation({ lat: 59.334591, lng: 18.063240 });
            console.log("Geolocation is not supported on your device")
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                console.log("Your geolocation has been set")
                console.log(location)
            },
            () => {
                setLocation({ lat: 59.334591, lng: 18.063240 });
                console.log("Cannot retrieve your location")
            }
        );
    };

    useEffect(() => {
        getLocation();
    },[]);

    return
  }
  
  export default GetLocation  */ 
