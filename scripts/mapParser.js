import fetch from 'node-fetch';

const getMapData = async (mapId) => {
  const mapDataReg = /var _pageData\s*=\s*['|"](\[.*\])['|"];/igm
  const url = `https://www.google.com/maps/d/u/0/viewer?mid=${mapId}`
  console.log('map url', url)

  try {
  const response = await fetch(url)
  console.log('fetch statusCode:', response.status);
  const body = await response.text()
    // console.log('headers:', res.headers);
    // console.log('res:', res);
    // response.text().then
    const match = mapDataReg.exec(body)
    const pageData = match[1].replaceAll('\\"', '"')
    const mapData = JSON.parse(pageData)
    // console.log(mapData)
    // console.log(match[1].length)

    // res.on('data', (d) => {
    //   process.stdout.write(d);
    // });
  } catch (error) {
    console.error(`Couldn't fetch map. Check that map id is correct.`, error)
  }

}


const parse = (mapId) => {
    getMapData(mapId)
}

export default { parse }