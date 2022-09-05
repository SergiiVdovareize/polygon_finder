import Sentry from '@sentry/node';
import finder from './scripts/finder.js';
import config from './config.js';

Sentry.init({ dsn: config.dsn });
const find = (mapId, point) => finder.find(mapId, point);
export { find };
