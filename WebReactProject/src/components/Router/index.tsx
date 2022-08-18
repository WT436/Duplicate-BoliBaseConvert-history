import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import utils from '../../utils/utils';

const Router = () => {
  
  const AdminLayout = utils.getRoute('/admin').component;
  const UserLayout = utils.getRoute('/').component;
  
  return (
    <Switch>
      <Route path="/admin" render={(props: any) => <AdminLayout {...props} />} />
      <Route path="/" render={(props: any) => <UserLayout {...props} />} />
    </Switch>
  );
};

export default Router;
