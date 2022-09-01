import mapParser from './mapParser.js'

const addRepeatedPoints = (polygons) => {
  polygons
    .filter(polygon => polygon.points.length > 2)
    .filter(polygon => {
      const startPoint = polygon.points[0]
      const endPoint = polygon.points[polygon.points.length - 1]
      return startPoint[0] !== endPoint[0] || startPoint[1] !== endPoint[1]
    })
    .forEach(polygon => {
      polygon.points.push(polygon.points[0])
    })
}

const parseParams = () => {
    const args = process.argv.slice(2)
    const paramsArray = args.filter(arg => arg.indexOf('=') !== -1);
  
    const parsedParams = {};
    paramsArray.forEach(paramString => {
      const keyValue = paramString.split('=');
      parsedParams[keyValue[0]] = keyValue[1];
    });
  
    return parsedParams;
  }

const parsedParams = parseParams();

const polygons = await mapParser.parse(parsedParams.map)
addRepeatedPoints(polygons)
console.log(polygons[4].points)