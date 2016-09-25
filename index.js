
const weatherHandler = require('./lib/weather-handler');

module.exports = [
	{
		groups: ['direct'],
		match: /!weather (.*)/i,
		handler: weatherHandler.filterWeather
	}
];
