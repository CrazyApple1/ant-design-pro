import React from 'react';
import ExtPage from 'components/ExtPage'
import PageHeaderLayout from 'core/layouts/PageHeaderLayout';

const Druid = () => {
  return (
    <PageHeaderLayout title="Druid执行监控">
      <ExtPage url="http://cn.bing.com" height="640"/>
    </PageHeaderLayout>
  );
};
export default Druid;
