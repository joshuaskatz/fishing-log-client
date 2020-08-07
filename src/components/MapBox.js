import React, { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { GET_RIVER } from '../graphql-gql/query';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const MapBox = () => {
	const mapContainerRef = useRef(null);

	const { data, loading } = useQuery(GET_RIVER, {
		pollInterval: 500
	});

	const geojson = {
		type: 'FeatureCollection',
		features:
			!loading &&
			data.rivers.map((river) => {
				return {
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [ river.longitude, river.latitude ]
					},
					properties: {
						title: river.name,
						description: `
							<div id="popup-body">
								<p class="popup-body-paragraph">
									<span class="popup-body-paragraph-span">
										Regulation:
									</span> 
									${river.regulation}
								</p>
								<p class="popup-body-paragraph">
									<span class="popup-body-paragraph-span">
										Brush:
									</span> 
									${river.overgrown}
								</p>
								<p class="popup-body-paragraph">
									<span class="popup-body-paragraph-span">
										Body of Water:
									</span> 
									${river.size}
								</p>
							</div>`
					}
				};
			})
	};

	useEffect(
		() => {
			const map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [ -98.5795, 39.8283 ],
				zoom: 3.5
			});

			!loading &&
				// add markers to map
				geojson.features.forEach((marker) => {
					// create a HTML element for each feature
					var el = document.createElement('div');
					el.className = 'marker';

					// make a marker for each feature and add to the map
					new mapboxgl.Marker(el)
						.setLngLat(marker.geometry.coordinates)
						.setPopup(
							new mapboxgl.Popup({ offset: 25 }) // add popups
								.setHTML(
									'<h3>' +
										marker.properties.title +
										'</h3>' +
										marker.properties.description
								)
						)
						.addTo(map);
				});
			map.addControl(
				new MapboxGeocoder({
					accessToken: mapboxgl.accessToken,
					mapboxgl: mapboxgl
				})
			);

			map.addControl(
				new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true
					},
					trackUserLocation: true
				})
			);

			map.addControl(new mapboxgl.NavigationControl());
		},
		[ loading, geojson ]
	);

	return (
		<div>
			<div
				id="map"
				ref={mapContainerRef}
				className="m-sm-5 offset-sm-1 mt-sm-5"
			/>
		</div>
	);
};

export default MapBox;
