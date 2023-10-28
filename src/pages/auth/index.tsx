import { Input, Tooltip, Button } from 'antd'
import { InfoCircleOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import useQuery from '../../utils/useQuery';

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Authoziration</h2>
      <Input
        placeholder="Enter username"
        size="large"
        style={{ marginBottom: 16 }}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Type your username here">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      <Input.Password
        size="large"
        placeholder="Enter password"
        style={{ marginBottom: 25 }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button type="primary" size="large">Submit</Button>
      <div className={styles.bottom}>
        <p>No account?</p>
        <span onClick={() => navigate("/noauth?mode=registration")}>Registration</span>
      </div>
    </>
  )
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Registration</h2>
      <Input
        placeholder="Enter username"
        size="large"
        style={{ marginBottom: 16 }}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Type your username here">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      <Input.Password
        size="large"
        placeholder="Enter password"
        style={{ marginBottom: 25 }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button type="primary" size="large">Submit</Button>
      <div className={styles.bottom}>
        <p>Already has account?</p>
        <span onClick={() => navigate("/noauth?mode=auth")}>Login</span>
      </div>
    </>
  )
}

const Auth: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const mode = query.get("mode") || '';
  const allowedModes = ["auth", "registration"];

  useEffect(() => {
    !allowedModes.includes(mode) && navigate("/noauth?mode=auth");
  }, []);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {mode === "auth" ? <AuthForm /> : <RegistrationForm />}
      </div>
    </section>
  )
}

export default Auth
