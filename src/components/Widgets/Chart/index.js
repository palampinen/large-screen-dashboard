
import React, { Component } from 'react';
import { dataFetch } from '../../../services/widget-api';
import Spinner from '../../Spinner';

import * as graphs from './graphs';


import './chart.css';

const CHART_TYPES = {
	area: 'Area',
	line: 'Line'
}

const DEFAULT_UPDATE_INTERVAL = 5 * 60 * 1000;
class Chart extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			status: null,
			error: false,
		}

		this.fetchData = this.fetchData.bind(this);
	}


  autoRefresher: null

	componentDidMount() {
		const { config } = this.props;
		const updateInterval = config.updateInterval || DEFAULT_UPDATE_INTERVAL;
		this.autoRefresher = setInterval(this.fetchData, updateInterval);
		this.fetchData();
	}

  componentWillUnmount() {
    clearInterval(this.autoRefresher);
  }

	fetchData() {
		const { config } = this.props;
		const { targetField, url} = config;
		return dataFetch(url, { d: new Date().getTime() /* Cache busting */ })
			.then(data =>
				this.setState({
					data: targetField ? data[targetField] : data,
					status: data.status
				})
			)
			.catch(error => console.log('error', error) && this.setState({ error }));
	}

	renderGraph(type, data) {
		if (CHART_TYPES[type]) {
			const ChartComponent = graphs[type.toLowerCase()];
			return <ChartComponent data={data} />
		}

		console.log('No graph component found ', type);
	}


  render() {
  	const { data, status } = this.state;
  	const { config } = this.props;

  	if (!data) {
  		return <Spinner />
  	}

    return (
      <div className={`chart size--${config.size} chart--status--${status || 'normal'} chart--type--${config.type}`}>
      	<div className="chart__title">{config.title || 'Chart'}</div>
      	<div className="chart__graph">
					{this.renderGraph(config.type, data)}
				</div>
      </div>
    );
  }
};

export default Chart;

