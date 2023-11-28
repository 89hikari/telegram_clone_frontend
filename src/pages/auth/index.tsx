import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Tooltip, Button, message } from 'antd'
import { InfoCircleOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import useQuery from '../../utils/useQuery';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';

; import styles from './index.module.scss';
import { authentificate } from '../../store/global/api';
import { RootState } from '../../store';

const AuthForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const { token, error_message, error } = useAppSelector((state: RootState) => state.global);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    callback(event.target.value);
  }

  const isButtonActive = password.length >= 4 && email.length >= 3;

  const handleAuth = () => {
    dispatch(authentificate({ email: email, password: password }));
  }

  const triggerError = () => {
    messageApi.open({
      type: 'error',
      content: error_message,
    });
  };

  useEffect(() => {
    if (error) triggerError();
  }, [error_message])

  useEffect(() => {
    if (token) {
      localStorage.setItem('TELEGRAM_CLONE_TOKEN', token);
      navigate("/");
    }
  }, [token]);

  return (
    <>
      {contextHolder}
      <h2>Authoziration</h2>
      <Input
        value={email}
        placeholder="Enter username"
        size="large"
        onChange={(e) => handleInput(e, setEmail)}
        style={{ marginBottom: 16 }}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Type your username here">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      <Input.Password
        value={password}
        onChange={(e) => handleInput(e, setPassword)}
        size="large"
        placeholder="Enter password"
        style={{ marginBottom: 25 }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Button type="primary" size="large" onClick={() => handleAuth()} disabled={!isButtonActive}>Submit</Button>
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
