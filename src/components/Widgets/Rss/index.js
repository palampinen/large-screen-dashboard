
import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { dataFetch } from '../../../services/widget-api';
import Spinner from '../../Spinner';

import './rss.css';


const url = 'http://futurice.com/blog/rss';
const WIDGET_CONFIG = {
	url: 'https://ajax.googleapis.com/ajax/services/feed/load',
	params:{
		v: '1.0',
		num: '3',
		q: url
	}
}



class Rss extends Component {

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
		const { config } = this.props;
		const params = _.defaultsDeep({ q: config.url }, WIDGET_CONFIG.params);
		return dataFetch(WIDGET_CONFIG.url, params)
			.then(data => this.setState({ data: data.responseData.feed.entries }) )
			.catch(error => console.log('error', error) && this.setState({ error }));
	}

	renderItem(feed, index) {
		return (
			<span key={index} className="rss__item" >
				<span className="rss__title">{feed.title}</span>
      	<span className="rss__content">{feed.contentSnippet}</span>
      	<span className="rss__created"><i className="icon ion-android-time"></i> {moment(feed.publishedDate).format('DD.MM.YYYY')}</span>
      </span>
    );
	}

  render() {
  	const { data } = this.state;

  	if (!data) {
  		return <Spinner />
  	}

    return (
      <div className="rss">
				{data.map((feed, index) => this.renderItem(feed, index))}
      </div>
    );
  }
};

export default Rss;

