
import React, { Component } from 'react';
import { dataFetch } from '../../../services/widget-api';
import { CONFIG } from '../../../constants/config';
import Spinner from '../../Spinner';
import WEATHER_ICONS from './weather-icons'
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

const DEFAULT_UPDATE_INTERVAL = 15 * 60 * 1000;

class Weather extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			error: false,
		}

		this.fetchData = this.fetchData.bind(this);
		this.setDataFetchTimeout = this.setDataFetchTimeout.bind(this);
	}

	autoRefresher: null

	componentDidMount() {
		this.fetchData();
	}

	setDataFetchTimeout() {
		const { config } = this.props;
		const updateInterval = config.updateInterval || DEFAULT_UPDATE_INTERVAL;
		clearTimeout(this.autoRefresher);
		this.autoRefresher = setInterval(this.fetchData, updateInterval);
	}

  componentWillUnmount() {
    clearTimeout(this.autoRefresher);
  }

	fetchData() {
		return dataFetch(WIDGET_CONFIG.url, WIDGET_CONFIG.params)
			.then(data => this.setState({ data }) )
			.catch(error => console.log('error', error) && this.setState({ error }))
			.then(this.setDataFetchTimeout);
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