
import React, { Component } from 'react';
import { dataFetch } from '../../../services/widget-api';
import Spinner from '../../Spinner';

import './html.css';


class HtmlWidget extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			status: null,
			error: false,
		}
	}

	componentDidMount() {
		this.fetchData();
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
      <div className={`html size--${config.size} status--${status}`}
        dangerouslySetInnerHTML={{ __html: (data) }} />
    );
  }
};

export default HtmlWidget;

