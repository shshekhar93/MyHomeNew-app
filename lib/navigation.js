import * as React from 'react';

const navigatorRef = React.createRef(null);

function navigate(pageName, params) {
  if (!navigatorRef.current) {
    return;
  }

  navigatorRef.current.navigate(pageName, params);
}

export { navigatorRef, navigate };
