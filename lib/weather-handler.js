'use strict';

const ForecastIO = require('dark-sky');
const moment = require('moment');
const nodeGeocoder = require('node-geocoder');

const geoOptions = {provider: 'google'};
const geocoder = nodeGeocoder(geoOptions);

let forecast = null;

const ICONS = {
	'clear-day': ':sunny:',
	'clear-night': ':moon:',
	'rain': ':mostly_sunny:',
	'snow': ':snow_cloud:',
	'sleet': ':snow_cloud:',
	'wind': ':dash:',
	'fog': ':foggy:',
	'cloudy': ':cloud:',
	'partly-cloudy-day': ':sun_small_cloud:',
	'partly-cloudy-night': ':cloud:',
	'hail': ':droplet:',
	'thunderstorm': ':lightning_cloud:',
	'tornado': ':tornado_cloud:'
};

function filterWeather(message, callback) {
	let responseMessage = ``;
	let locationFilter = message.matchResult[1];
	geocoder.geocode(locationFilter, (err, result) => {
		if (result && result.length) {
			const location = result[0];
			let options = {
				location: {
					lat: location.latitude,
					long: location.longitude
				},
				lang: 'en'
			};
			responseMessage = _getWeather.call(this, options, callback);
		} else {
			responseMessage = `Location not found. :/`;
		}
		callback(responseMessage);
	});
}

function _getWeather(options, callback) {
	if (!forecast) {
		let config = this.getSettings();
		forecast = new ForecastIO(config.weather.apikey);
	}

	_getForecast(options).then(result => {
		callback(_parseWeatherResponse(result));
	});
}

function _parseWeatherResponse(data) {
	let responseMessage = ``;
	const days = data.daily.data;
	if (days.length) {
		for (const day of days) {
			const dateTimeString = moment.unix(day.time).format('DD-MMM');
			const temperatureMax = Math.round(day.temperatureMax);
			const temperatureMin = Math.round(day.temperatureMin);

			let icon = ICONS[day.icon] ? ICONS[day.icon] : '-';
			responseMessage += `*${dateTimeString}*  ${icon}  _${day.summary}_ Max: ${temperatureMax}℃  Min: ${temperatureMin}℃ \n`;
		}
	} else {
		responseMessage = `Sorry, there is currently no weather information available.`;
	}
	return responseMessage;
}

function _getForecast(options) {
	return forecast.latitude(options.location.lat)
		.longitude(options.location.long)
		.units('si')
		.language(options.lang)
		.exclude('hourly')
		.get()
		.then(result => {
			return result;
		})
		.catch(err => {
			console.log('Something went wrong :/ ', err);
		});
}

module.exports = {filterWeather};
