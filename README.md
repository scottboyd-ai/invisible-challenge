# Invisible Code Challenge

Given an array of inputs (location name, postal code), log the current time and weather for those locations.

Example: "./weather New York, 10005, Tokyo, São Paulo, Pluto"

Follow our Code guidelines: https://github.com/invisible-tech/guidelines

You should use JavaScript, TypeScript is a plus.

The code should be self-documenting, although you can use comments to convey the reason for your design decisions.

#### Instructions:

- `npm install`
- Compile typescript
- `node index.js`

#### Tests:
- Compile typescript
- `npm test`

Limitations:
- The APIs used have rate limits on their free tiers.
- ZipCodeAPI limits to 10 requests/hour
- TimeZoneAPI limits to 1 request/second
- OpenWeatherMap limits to 1000 requests/day and 60 requests/minute
- If tests/application do not work, please try waiting before trying again