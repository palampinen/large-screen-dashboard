
import React, { Component } from 'react';
import { dataFetch } from '../../../services/widget-api';
import Spinner from '../../Spinner';

import './html.css';

const DEFAULT_UPDATE_INTERVAL = 5 * 60 * 1000;
class HtmlWidget extends Component {

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
		return dataFetch(url)
			.then(data =>
				this.setState({
					data: data[targetField],
					status: data.status
				})
			)
			.catch(error => console.log('error', error) && this.setState({ error }));
	}


  render() {
  	const { data, status } = this.state;
  	const { config } = this.props;

  	if (!data) {
  		return <Spinner />
  	}

    return (
      <div className={`html size--${config.size} status--${status}`}>
        <div dangerouslySetInnerHTML={{ __html: (data) }} />
      </div>
    );
  }
};

export default HtmlWidget;

