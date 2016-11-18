# Large Screen Dashboard

![lg-dashboard](https://raw.githubusercontent.com/palampinen/large-screen-dashboard/master/large-screen-dashboard.png)

WIP!

Dashboard with React


## Current Widgets
* Clock
* Date
* Weather
* HTML from custom API
* RSS
* Chart (Victory)


## Planned Widgets
* Google Analytics


## How to Install
```
git clone https://github.com/palampinen/large-screen-dashboard
cd large-screen-dashboard

npm install
npm start
```

`cp src/widget.config.example.js src/widget.config.js` and add widget objects in *widget.config.js* file.

Open browser `localhost:3000`


## Widgets
Available Widget configs

### Clock

```
{
	type: 'clock'
}
```

### Date
Three-lines date widget
```
{
	type: 'date'
}
```

### Weather
```
{
	type: 'weather'
}
```
TODO: Add lat & lon as config parameters


### HTML
```
{
	type: 'html',
	config: {
		size: 'lg', // to show single value centered, if not given, text is aligned to left OPTIONAL
		targetField: 'value', // take this key in response, if not given, takes response directly OPTIONAL
		url: 'https://private-d9236-largescreendashboard.apiary-mock.com/number/alert' // REQUIRED
	}
}
```

### RSS
```
{
	type: 'html',
	config: {
		size: 'lg', // to show single value centered, if not given, text is aligned to left OPTIONAL
		targetField: 'value', // take this key in response, if not given, takes response directly OPTIONAL
		url: 'https://private-d9236-largescreendashboard.apiary-mock.com/number/alert' // REQUIRED
	}
}
```


Simple Analog clock

TODO: Timezone as parameter

### RSS
```
{
	type: 'rss',
	config: {
		url: 'https://github.com/facebook/react-native/commits/master.atom' // REQUIRED
	}
}
```

### Chart

Victory chart

```
{
	type: 'chart',
	config: {
		url: 'https://private-d9236-largescreendashboard.apiary-mock.com/chart/line', // REQUIRED
		type: 'line', // area | line // REQUIRED
		title: 'Signal', // Title for widget, defaults to 'Chart' OPTIONAL
		targetField: 'data', // OPTIONAL, see 'html'
		updateInterval: 60 * 1000, // poll update interval in milliseconds OPTIONAL
	}
}
```


Created with [create-react-app](https://github.com/facebookincubator/create-react-app/).

Licensed under the [MIT license](http://opensource.org/licenses/MIT).