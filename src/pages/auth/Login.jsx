import { Form, Input, Button, Col, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUser } from './authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn, isPrepared } = useSelector(state => state.auth);

  useEffect(() => {
    if (isLoggedIn && isPrepared) {
      history.push('/');
    }
  });

  const onFinish = async values => {
    await dispatch(fetchUser(values));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Content className="page-content">
      <Col className="site-layout-background">
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '60vh' }}>
          <Form
            name="basic"
            labelCol={{
              span: 4
            }}
            wrapperCol={{
              span: 20
            }}
            initialValues={{
              remember: true
            }}
            style={{ width: '35%', minWidth: '300px' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <br />

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!'
                }
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 20
              }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Col>
    </Content>
  );
};

export default Login;
