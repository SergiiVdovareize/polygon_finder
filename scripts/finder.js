import inside from 'point-in-polygon-hao';
import mapParser from './mapParser.js';

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

const validateMapId = (mapId) => {
  if (!mapId || typeof (mapId) !== 'string' || mapId.length < 10) {
    console.error('mapId is not valid');
    return false;
  }

  return true;
};

const validatePoint = (point) => {
  if (!point || point.length !== 2 || isNaN(point[0]) || isNaN(point[0])) {
    console.error('point is not valid');
    return false;
  }

  return true;
};

const find = async (mapId, point) => {
  if (!validateMapId(mapId) || !validatePoint(point)) {
    return [];
  }

  const polygons = await mapParser.parse(mapId);
  addRepeatedPoints(polygons);

  const relatedToPolygons = checkPoint(point, polygons);
  return relatedToPolygons;
};

export default { find };
