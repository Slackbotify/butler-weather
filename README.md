
# butler-weather
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![npm](https://img.shields.io/npm/v/butler-weather.svg?maxAge=3600)](https://www.npmjs.com/package/butler-weather)

> Weather plugin for Butler.

## Butler
_More about the butler project here._

## Configuration
This plugin requires configuration to work correctly. In your butler project add the following properties to the `config.json` file.

```
"weahter": {
	"apikey": "aun45oed1exrx82nf7n67m"
}
```

## Enable / Install
Enabling this plugin for your Butler bot is as easy as requiring the package.
```javascript
bot.requireRegister(require('butler-weather'));
```

## Handlers
### Weather forecast for location
**Available in:** Direct message. <br>
Trigger: `!weather <location>` _(e.g. !weather Amsterdam)_

### License
MIT
