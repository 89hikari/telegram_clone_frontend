import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Tooltip, Button, message, Select } from 'antd'
import { InfoCircleOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import useQuery from '@/utils/useQuery';
import { useAppDispatch, useAppSelector } from '@/hooks/stateHooks';

import { authentificate, signup } from '@/store/global/api';
import { RootState } from '@/store';

import styles from './index.module.scss';

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

  const onPressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && dispatch(authentificate({ email: email, password: password }));
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
        onKeyDown={(e) => onPressEnter(e)}
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
        onKeyDown={(e) => onPressEnter(e)}
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
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [gender, setGender] = useState<"male" | "female">("male");

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    callback(event.target.value);
  }

  const handleChangeGender = (value: { value: "male" | "female"; label: React.ReactNode }) => {
    setGender(value.value)
  };

  const handleSubmit = () => {
    dispatch(signup({
      email: email,
      gender: gender,
      name: username,
      password: password
    }))
  }

  return (
    <>
      <h2>Registration</h2>
      <Input
        value={username}
        placeholder="Enter username"
        size="large"
        onChange={(e) => handleInput(e, setUsername)}
        style={{ marginBottom: 16 }}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Type your username here">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      <Input
        value={email}
        placeholder="Enter email"
        size="large"
        onChange={(e) => handleInput(e, setEmail)}
        style={{ marginBottom: 16 }}
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
          <Tooltip title="Type your email here">
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />
      <Input.Password
        value={password}
        size="large"
        placeholder="Enter password"
        onChange={(e) => handleInput(e, setPassword)}
        style={{ marginBottom: 16 }}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      />
      <Select
        labelInValue
        size="large"
        defaultValue={{ value: 'male', label: 'Male' }}
        style={{ width: '100%', marginBottom: 25 }}
        onChange={handleChangeGender}
        options={[
          {
            value: 'male',
            label: 'Male',
          },
          {
            value: 'female',
            label: 'Female',
          },
        ]}
      />
      <Button type="primary" size="large" onClick={() => handleSubmit()}>Submit</Button>
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
