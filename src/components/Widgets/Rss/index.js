
import React, { Component } from 'react';
import moment from 'moment';
import { dataFetch } from '../../../services/widget-api';
import { CONFIG } from '../../../services/config';
import './rss.css';


const url = 'http://futurice.com/blog/rss';
const WIDGET_CONFIG = {
	url: 'https://ajax.googleapis.com/ajax/services/feed/load',
	params:{
		v: '1.0',
		num: '3',
		// callback: '',
		q: url
	}
}



class Rss extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			error: false,
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData() {
		return dataFetch(WIDGET_CONFIG.url, WIDGET_CONFIG.params)
			.then(data => this.setState({ data: data.responseData.feed.entries }) )
			.catch(error => console.log('error', error) && this.setState({ error }));
	}

	renderItem(feed) {
		return (
			<span className="rss__item" >
				<span className="rss__title">{feed.title}</span>
      	<span className="rss__content">{feed.contentSnippet}</span>
      	<span className="rss__created"><i className="icon ion-android-time"></i> {moment(feed.publishedDate).format('DD.MM.YYYY')}</span>
      </span>
    );
	}

  render() {
  	const { data } = this.state;

  	console.log(data);

    return (
      <div className="rss">
				<h1>Feed</h1>
				{data.map(feed => this.renderItem(feed))}
      </div>
    );
  }
};

export default Rss;

