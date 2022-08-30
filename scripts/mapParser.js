// const https = require('node:https');
import fetch from 'node-fetch';

const getMapContent = (mapId) => {
  const url = `https://www.google.com/maps/d/u/0/viewer?mid=${mapId}`
  console.log('map url', url)

  fetch(url).then((res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    console.log('res:', res);

    // res.on('data', (d) => {
    //   process.stdout.write(d);
    // });

  }).catch((error) => {
    console.error(error);
  });
}

const parse = (mapId) => {
    getMapContent(mapId)
}

export default { parse }