import fetch from 'node-fetch';

const getLayer = data => data[1][6]?.[0][12]?.[0][13]?.[0] || null

const getPolygonName = data => data[5][0]?.[1][0] || null

const getPolygonDescription = data => data[5][1]?.[1][0] || null

const getPolygonPoints = data => data[3][0]?.[0]?.[0]?.[0].map(pointsArray => pointsArray[0]) || []

const getPolygon = (data) => {
  const polygon = {
    id: data[0],
    name: getPolygonName(data),
    description: getPolygonDescription(data),
    points: getPolygonPoints(data),
  }

  return polygon
}

const composePolygons = (layer) => {
  return layer.map(getPolygon)
}

const getMapData = async (mapId) => {
  const url = `https://www.google.com/maps/d/u/0/viewer?mid=${mapId}`

  try {
    const response = await fetch(url)
    console.log('fetch statusCode:', response.status);
    const body = await response.text()
    return body
  } catch (error) {
    console.error(`Couldn't fetch map. Check that map id is correct.`, error)
    return null
  }
}

const parseMapData = (data) => {
  const mapDataReg = /var _pageData\s*=\s*['|"](\[.*\])['|"];/igm

  try {
    const match = mapDataReg.exec(data)
    const pageData = match[1].replaceAll('\\"', '"')
    const mapData = JSON.parse(pageData)
    const layer = getLayer(mapData)
    return layer ? composePolygons(layer) : []
  } catch (error) {
    console.error(`Couldn't parse map data.`, error)
    return []
  }
}

const parse = async (mapId) => {
    const mapData = await getMapData(mapId)
    return mapData ? parseMapData(mapData) : []
}

export default { parse }