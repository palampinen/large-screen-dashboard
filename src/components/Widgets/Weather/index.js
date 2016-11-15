
import React, { Component } from 'react';
import { dataFetch } from '../../../services/widget-api';
import { CONFIG } from '../../../services/config';
import Spinner from '../../Spinner';
import './weather.css';

const WIDGET_CONFIG = {
	url: 'http://api.openweathermap.org/data/2.5/weather',
	params:{
		APPID: '488e49ee1ce983be59e69292af6c9dd4',
		units: 'metric',
		lat: CONFIG.lat,
		lon: CONFIG.lon
	}
}

class Weather extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			error: false,
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		return dataFetch(WIDGET_CONFIG.url, WIDGET_CONFIG.params)
			.then(data => this.setState({ data }) )
			.catch(error => console.log('error', error) && this.setState({ error }));
	}


  render() {
  	const { data } = this.state;

    return (
      <div className="weather">
        { data
        	? <div>
	          <i className={'weather__icon icon ' + WEATHER_ICONS[data.weather[0].icon] }></i> 
						<span className="weather__temperature">{Math.round(data.main.temp * 10) / 10}°C</span>
						<span className="weather__description">{data.weather[0].description}</span>
					</div>
					: <Spinner />
				}
      </div>
    );
  }
};

export default Weather;

// Maps icons to Ionicons
const WEATHER_ICONS = {
	'01d': 'ion-ios-sunny-outline',
	'02d': 'ion-ios-partlysunny-outline',
	'03d': 'ion-ios-cloudy-outline',
	'04d': 'ion-ios-cloud-outline',
	'09d': 'ion-ios-rainy-outline',
	'10d': 'ion-ios-rainy-outline',
	'11d': 'ion-ios-thunderstorm-outline',
	'13d': 'ion-ios-snowy',
	'50d': 'ion-ios-cloudy-outline',
	'01n': 'ion-ios-moon-outline',
	'02n': 'ion-ios-cloudy-night-outline',
	'03n': 'ion-ios-cloudy-outline',
	'04n': 'ion-ios-cloudy-outline',
	'09n': 'ion-ios-rainy-outline',
	'10n': 'ion-ios-rainy-outline',
	'13n': 'ion-ios-thunderstorm-outline',
	'11n': 'ion-ios-snowy',
	'50n': 'ion-ios-cloudy-outline',
};