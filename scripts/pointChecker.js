import inside from 'point-in-polygon-hao';
import mapParser from './mapParser.js';

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

const addRepeatedPoints = (polygons) => {
  polygons
    .filter(polygon => polygon.points.length > 2)
    .filter(polygon => {
      const startPoint = polygon.points[0];
      const endPoint = polygon.points[polygon.points.length - 1];
      return startPoint[0] !== endPoint[0] || startPoint[1] !== endPoint[1];
    })
    .forEach(polygon => {
      polygon.points.push(polygon.points[0]);
    });
};

const checkPoint = (point, polygons) => {
  return polygons.filter(polygon => inside(point, [polygon.points]));
};

const check = async () => {
  const parsedParams = parseParams();
  if (!validateParams(parsedParams)) {
    process.exit(1);
  }
  const polygons = await mapParser.parse(parsedParams.map);
  addRepeatedPoints(polygons);

  const point = parsePointCoordinates(parsedParams.position);
  const relatedToPolygons = checkPoint(point, polygons);
  return relatedToPolygons;
};

export default { check };
