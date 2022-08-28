
const parseParams = () => {
    const args = process.argv.slice(2)
    console.log(args)
    const paramsArray = args.filter(arg => arg.indexOf('=') !== -1);
  
    const parsedParams = {};
    paramsArray.forEach(paramString => {
      const keyValue = paramString.split('=');
      parsedParams[keyValue[0]] = keyValue[1];
    });
  
    return parsedParams;
  }

const parsedParams = parseParams();

console.log('** check', parsedParams)