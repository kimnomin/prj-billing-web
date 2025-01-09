import { Button, Form, FormProps, Input } from "antd";
import { useState } from "react";
import User from "../constants/interfaces/User";
import { login } from "../apis/UserApi";
import useLocalStorage from "../hooks/useLocalStorage";
import { decodeToken } from "../utils/JwtUtils";

const LoginForm = () => {
  const [jwt, setJwt] = useLocalStorage("jwtToken");
  const [isShow, setIsShow] = useState<boolean>(false);
  const [form] = Form.useForm();

  const loginedUser = decodeToken();

  const toggleForm = () => setIsShow(!isShow);

  const handleLogout = () => {
    setJwt("");
  };

  const handleSubmit: FormProps<User>["onFinish"] = (values) => {
    login(values).then((result) => {
      if (result) {
        const token = result.jToken;
        if (token) {
          setJwt(token);
          toggleForm();
        }
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      sm: { span: 4 },
    },
    wrapperCol: {
      sm: { span: 20 },
    },
  };

  return (
    <>
      {!jwt ? (
        <Button title="Sign in" onClick={toggleForm}>
          Sign in
        </Button>
      ) : (
        <>
          <span style={{ color: "white" }}>
            {loginedUser ? loginedUser.name : ""} 님 환영합니다.&nbsp;&nbsp;
          </span>
          <Button title="Sign out" onClick={handleLogout}>
            Sign Out
          </Button>
        </>
      )}
      {isShow ? (
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          style={{
            position: "fixed",
            backgroundColor: "white",
            right: 10,
            padding: 20,
            border: "1px solid #ccc",
            zIndex: 1000,
            // top: 50
          }}
        >
          <Form.Item<User> label="ID" name={"id"} rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item<User>
            label="PW"
            name={"password"}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="link" htmlType="submit">
            Login
          </Button>
          <Button type="link" onClick={toggleForm}>
            Cancel
          </Button>
        </Form>
      ) : (
        ""
      )}
    </>
  );
};

export default LoginForm;
