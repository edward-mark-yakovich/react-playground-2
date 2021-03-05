import React, { useState, useEffect } from 'react';

export function useFetch(url, method = 'GET') {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const apiHost = `${window.config.apiHost}`;
  const formattedEnpoint = `${apiHost}${url}`;

  useEffect(() => {
    const bodyEl = document.querySelector('body');

    setLoading(true);
    bodyEl.classList.add('_request-active');

    fetch(`${formattedEnpoint}`, {
             method: method,
           })
           .then(response => {
              if (response.status == 200) {
                return response.json();
              } else {
                setHasError(true);
                setLoading(false);
              }
           })
           .then(data => {
             setResponse(data);
             setLoading(false);
             bodyEl.classList.remove('_request-active');
            }
          );
    }, [url]);

    return [ response, loading, hasError ];
}
