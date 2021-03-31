import React from 'react';

import { PrivateRouter } from '~/services';

const Dashboard: React.FC = () => {
  return <h1>Dashboard</h1>;
};

export default PrivateRouter(Dashboard);
