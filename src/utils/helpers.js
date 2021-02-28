import _ from 'lodash';

export const CEASE_EXECUTION = "system/cease_execution";

export function logErrorRemotely(error, errorInfo = {}) {
  try {
    // an error occured
    console.log('App error - do stuff with error...');
    console.log(error);
    console.log(errorInfo);
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
}

export function isRequestError(result) {
  if (result === CEASE_EXECUTION) {
    return true;
  }

  return _.has(result, 'response.status') && result.response.status !== 200;
}
