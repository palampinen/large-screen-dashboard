
import React, { Component } from 'react';
import { dataFetch } from '../../../services/widget-api';
import Spinner from '../../Spinner';


import * as ENV from '../../../env';


const CLIENT_ID = ENV.GA_CLIENT_ID;
const API_KEY = ENV.GA_API_KEY;


import './ga.css';

class GaWidget extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: null,
			status: null,
			error: false,
		}

	}

	componentDidMount() {
		this.startGaEmbedApi();
	}



	startGaEmbedApi() {
		const { gapi } = window;
		gapi.load('client', this.start);
	}

	start() {
		const { gapi } = window;
		  // 2. Initialize the JavaScript client library.
	  gapi.client.init({
	    'apiKey': API_KEY,
	    // clientId and scope are optional if auth is not required.
	    'clientId': CLIENT_ID,
	    'scope': 'profile',
	  }).then(function() {
	    // 3. Initialize and make the API request.
	    return gapi.client.request({
	      'path': 'https://people.googleapis.com/v1/people/me',
	    })
	  }).then(function(resp) {
	    console.log(resp.result);
	  }, function(reason) {
	    console.log('Error: ' + reason.result.error.message);
	  });
	}


  render() {
  	const { data, status } = this.state;
  	const { config } = this.props;


    return (
      <div>
      </div>

    );
  }
};

export default GaWidget;

