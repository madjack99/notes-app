import React from 'react';
import Loader from 'react-loaders';

import './index.scss';

const Spinner = () => {
  return <Loader type='line-scale' active />;
};

export default Spinner;
