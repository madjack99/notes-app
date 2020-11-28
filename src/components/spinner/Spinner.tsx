import React from 'react';
import Loader from 'react-loaders';

import './index.scss';

interface ISpinner {
  loading: boolean;
}

const Spinner = ({ loading }: ISpinner) => {
  return loading ? <Loader type='line-scale' active /> : null;
};

export default Spinner;
