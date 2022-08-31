import fetch from 'node-fetch';

const getLayer = (data) => {
  return data[1][6][0][12][0][13][0]
}

const getPolygonName = data => data[5][0]?.[1][0] || null

const getPolygonDescription = data => data[5][1]?.[1][0] || null

const getPolygonPoints = (data) => {
  return data[3][0][0][0][0].map(point => {
    return { lat: point[0][0], lng: point[0][1] } 
  })
}

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
  const mapDataReg = /var _pageData\s*=\s*['|"](\[.*\])['|"];/igm
  const url = `https://www.google.com/maps/d/u/0/viewer?mid=${mapId}`
  console.log('map url', url)

  try {
    const response = await fetch(url)
    console.log('fetch statusCode:', response.status);
    const body = await response.text()
    const match = mapDataReg.exec(body)
    const pageData = match[1].replaceAll('\\"', '"')
    const mapData = JSON.parse(pageData)
    const layer = getLayer(mapData)
    const polygons = composePolygons(layer)
    console.log(polygons[0])

  } catch (error) {
    // TODO: updat catcher
    console.error(`Couldn't fetch map. Check that map id is correct.`, error)
  }

}


const parse = (mapId) => {
    getMapData(mapId)
}

export default { parse }