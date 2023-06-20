import React from 'react';
import { useEffect } from 'react';
import './googleMapDirection.css';

const GoogleMapDirection = ({ setGeoJson }) => {
	useEffect(() => {
        const initMap = () => {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 40.749933, lng: -73.98633 },
                zoom: 13,
                mapTypeControl: false,
            });
    
            const card = document.getElementById('pac-card');
            const input = document.getElementById('pac-input');
            const biasInputElement = document.getElementById('use-location-bias');
            const strictBoundsInputElement = document.getElementById('use-strict-bounds');
            const options = {
                fields: ['formatted_address', 'geometry', 'name'],
                strictBounds: false,
                types: ['establishment'],
            };
        
            map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(card);
        
            const autocomplete = new window.google.maps.places.Autocomplete(input, options);
            autocomplete.bindTo('bounds', map);
        
            const infowindow = new window.google.maps.InfoWindow();
            const infowindowContent = document.getElementById('infowindow-content');
        
            infowindow.setContent(infowindowContent);
        
            const marker = new window.google.maps.Marker({
                map,
                anchorPoint: new window.google.maps.Point(0, -29),
            });
        
            autocomplete.addListener('place_changed', () => {
                infowindow.close();
                marker.setVisible(false);
        
                const place = autocomplete.getPlace();
        
                if (!place.geometry || !place.geometry.location) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
                }
        
                if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
                } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
                }
        
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
                infowindowContent.children['place-name'].textContent = place.name;
                infowindowContent.children['place-address'].textContent = place.formatted_address;
                infowindow.open(map, marker);

                //TESTTTTTTT GEOJSON
                // Capture los datos de la ubicación seleccionada y envíelos como GeoJSON
                // const locationData = {
                //     type: "Feature",
                //     geometry: {
                //         type: "Point",
                //         coordinates: [
                //             place.geometry.location.lat(),
                //             place.geometry.location.lng()
                //         ]
                //     },
                //     properties: {
                //         name: place.name,
                //         address: place.formatted_address
                //     }
                // };

                const locationData = {
                        type: "Point",
                        coordinates: [
                            place.geometry.location.lat(),
                            place.geometry.location.lng()
                        ]
                    };

                //logic to send geoJSON
                console.log(locationData);
                setGeoJson(locationData);
                //END TESTTTTTTT GEOJSON
            });
        
            function setupClickListener(id, types) {
                const radioButton = document.getElementById(id);
                radioButton.addEventListener('click', () => {
                autocomplete.setTypes(types);
                input.value = '';
                });
            }
        
            setupClickListener('changetype-all', []);
            setupClickListener('changetype-address', ['address']);
            setupClickListener('changetype-establishment', ['establishment']);
            setupClickListener('changetype-geocode', ['geocode']);
            setupClickListener('changetype-cities', ['(cities)']);
            setupClickListener('changetype-regions', ['(regions)']);
        
            biasInputElement.addEventListener('change', () => {
                if (biasInputElement.checked) {
                autocomplete.bindTo('bounds', map);
                } else {
                autocomplete.unbind('bounds');
                autocomplete.setBounds({
                    east: 180,
                    west: -180,
                    north: 90,
                    south: -90,
                });
                strictBoundsInputElement.checked = biasInputElement.checked;
                }
                input.value = '';
            });
        
            strictBoundsInputElement.addEventListener('change', () => {
                autocomplete.setOptions({
                strictBounds: strictBoundsInputElement.checked,
                });
                if (strictBoundsInputElement.checked) {
                biasInputElement.checked = strictBoundsInputElement.checked;
                autocomplete.bindTo('bounds', map);
                }
                input.value = '';
            });
        };
    
        // Cargar el script de la API de Google Maps
        const gmpsKey = import.meta.env.VITE_GMPS_KEY;
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${gmpsKey}&callback=initMap&libraries=places&v=weekly`;
        script.defer = true;
        document.head.appendChild(script);

        // Inicializar el mapa cuando se cargue el script de la API de Google Maps
        window.initMap = initMap;
    }, []);
    
    return (
        <>
            <div className="pac-card" id="pac-card">
                <div>
                <div id="title">Autocomplete search</div>
                <div className="pac-controls" id="type-selector">
                    <input type="radio" name="type" id="changetype-all" defaultChecked />
                    <label htmlFor="changetype-all">All</label>

                    <input type="radio" name="type" id="changetype-establishment" />
                    <label htmlFor="changetype-establishment">establishment</label>

                    <input type="radio" name="type" id="changetype-address" />
                    <label htmlFor="changetype-address">address</label>

                    <input type="radio" name="type" id="changetype-geocode" />
                    <label htmlFor="changetype-geocode">geocode</label>

                    <input type="radio" name="type" id="changetype-cities" />
                    <label htmlFor="changetype-cities">(cities)</label>

                    <input type="radio" name="type" id="changetype-regions" />
                    <label htmlFor="changetype-regions">(regions)</label>
                </div>
                <br />
                <div className="pac-controls" id="strict-bounds-selector">
                    <input type="checkbox" id="use-location-bias" value="" defaultChecked />
                    <label htmlFor="use-location-bias">Bias to map viewport</label>

                    <input type="checkbox" id="use-strict-bounds" value="" />
                    <label htmlFor="use-strict-bounds">Strict bounds</label>
                </div>
                </div>
                <div id="pac-container">
                <input id="pac-input" type="text" placeholder="Enter a location" />
                </div>
            </div>
            <div id="map" style={{ height: '400px' }}></div>
            <div id="infowindow-content">
                <span id="place-name" className="title"></span>
                <br />
                <span id="place-address"></span>
            </div>
        </>
    );
};

export default GoogleMapDirection;
