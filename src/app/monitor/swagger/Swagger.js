import React from 'react';
import ExtPage from 'components/ExtPage';
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';

const Swagger = () => {
  return (
    <PageHeaderLayout title="Swagger">
      <ExtPage url="http://cn.bing.com" height="640" />
    </PageHeaderLayout>
  );
};
export default Swagger;
