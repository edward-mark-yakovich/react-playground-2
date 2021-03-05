export const isEmptyObj = obj => Object.keys(obj).length === 0;



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
  const resultStatus = result?.response?.status || false;

  if (result === CEASE_EXECUTION) {
    return true;
  }

  return resultStatus && resultStatus !== 200;
}




// fake a login request ... for test...
export async function fakeLogin({username, password}) {
  const bodyEl = document.querySelector('body');

  bodyEl.classList.add('_request-active');

  const loginPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'edward' && password === 'pass') {
        resolve();
      } else {
        reject();
      }

      bodyEl.classList.remove('_request-active');
    }, 2000);
  });

  return loginPromise;
}
