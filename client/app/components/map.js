import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const MapComponent = () => {
    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyBCicmL-dLEkYepBcurwdB1AWuiJs0RegM",
            version: "weekly",
        });

        loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");

            const map = new Map(document.getElementById("map"), {
                center: {lat: 37.7749, lng: -122.4194},
                zoom: 15,
            });
        });
    }, []);

    return <div id="map" style={{height:"400px"}}></div>;
};

export default MapComponent;