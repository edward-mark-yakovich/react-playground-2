import './main.scss';

import React from 'react';
import Nav from '@components/pageTemplates/nav/Nav.jsx';
import LoaderIcon from '@components/base/loader-icon/LoaderIcon.jsx';

const Page = ({ nameId = '', children }) => {
  return (
    <div className="main">

      <LoaderIcon />

      <Nav nameId={nameId} />

      {children}

    </div>
  );
};

export default Page;
