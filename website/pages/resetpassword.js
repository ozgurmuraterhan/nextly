import React, { useEffect, useState, useContext } from "react";
import { Button, Checkbox, Form, Input, message, Row, Col, Typography } from "antd";
import { API_URL } from '../config';
import IntlMessages from "../util/IntlMessages";

import { useRouter } from "next/router"
import axios from "axios"

const SignInPage = () => {

  const router = useRouter()
  const { token } = router.query

  const [username, seTusername] = useState("")

  const getUserWithToken = async (token) => {

    await axios.get(API_URL + "/users/reset?resetPasswordToken=" + token)
      .then(res => {

        if (res.data.message == "password reset link a-ok") {
          seTusername(res.data.username)
        }
      })
      .catch(err => {
        message.error("password reset link is invalid or has expired")
        router.push("/forgotpassword")
      })

  }

  useEffect(() => {

    getUserWithToken(token)

  }, []);


  const onSubmit = (Data) => {


    axios.put(`${API_URL}/users/updatePasswordViaEmail`,
      {
        username: username,
        password: Data["password"],
        resetPasswordToken: token,
      }
    ).then(res => {
      if (res.data.message == "password reset link is invalid or has expired") {
        message.error("password reset link is invalid or has expired")
      } else if (res.data.message == "no user exists in db to update") {
        message.error("no user exists in db to update")
      } else {
        message.success("Password Updated")
        router.push("/signin")
      }



    })
      .catch(err => console.log(err))

  };

  return (
    <>
      <Row gutter={[16, 16]}>

        <Col sm={6} offset={3} xs={18}>
          <Typography.Title className="text-center mt-5">NextLy</Typography.Title>
          <div level={5} className="text-center fs-10 mb-5">Fortune favors the bold.</div>
          {username ?
            <Form
              initialValues={{ remember: true }}
              onFinish={onSubmit}
              layout="vertical"
            >
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords that you entered do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="mb-0 w-full" size="large" htmlType="submit">
                  Update Password
                </Button>
              </Form.Item>
            </Form>

            : ""}

          <Button type="link" onClick={() => router.push("/signin")}>
            <IntlMessages id="app.userAuth.signIn" />
          </Button>
        </Col>
        <Col sm={3} xs={0} />

        <Col sm={12} xs={24}>
          <div className="loginBanner"></div>
        </Col>
      </Row>



    </>
  );
}

export default SignInPage;
