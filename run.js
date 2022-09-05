import { find } from './index.js';

const parseParams = () => {
  const args = process.argv.slice(2);
  const paramsArray = args.filter(arg => arg.indexOf('=') !== -1);

  const parsedParams = {};
  paramsArray.forEach(paramString => {
    const keyValue = paramString.split('=');
    parsedParams[keyValue[0]] = keyValue[1];
  });

  return parsedParams;
};

const validateParams = (params) => {
  if (!params.map) {
    console.log('Missed "map" parameter. It should be a map id value');
    return false;
  }

  if (!params.position) {
    console.log('Missed "position" parameter. It should contain lat and lng coordinates');
    return false;
  }

  if (params.position.split(',').length !== 2) {
    console.log('Wrong "position" value. It should look something like this: 45.306286,36.508117');
    return false;
  }

  return true;
};

const parsePointCoordinates = point => point.split(',').map(coord => parseFloat(coord));

const printResult = (foundPolygons) => {
  console.log(`found ${foundPolygons.length} polygons`);
  if (foundPolygons.length > 0) {
    console.log(foundPolygons.map(polygon => polygon.name));
  }
};

const run = async () => {
  const parsedParams = parseParams();
  if (!validateParams(parsedParams)) {
    process.exit(1);
  }
  const point = parsePointCoordinates(parsedParams.position);

  const foundPolygons = await find(parsedParams.map, point);
  printResult(foundPolygons);
};

run();
