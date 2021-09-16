import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import HeaderNav from '../components/HeaderNav';
import SideNav from '../components/SideNav';
import PageFooter from '../components/PageFooter';

function PrivateRoute({ children, ...rest }) {
  const { isLoggedIn, isPrepared } = useSelector(state => state.auth);

  const username = localStorage.getItem('username');

  if (isPrepared && !isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        username ? (
          <>
            <HeaderNav />

            <Layout>
              <SideNav />

              <Layout>
                <Content className="page-content">
                  <div className="site-layout-background">{React.cloneElement(children, props)}</div>
                </Content>
                <PageFooter />
              </Layout>
            </Layout>
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
