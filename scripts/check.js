import mapParser from './mapParser.js'

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

console.log('params:', parsedParams)
// console.log(parser)
mapParser.parse(parsedParams.map)