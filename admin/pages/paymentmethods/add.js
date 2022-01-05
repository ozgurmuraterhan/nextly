import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from '../../../config';
import router from "next/router"
import { DeleteOutlined, CheckOutlined, CloseOutlined, QuestionCircleOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons"

import { AutoComplete, Upload, Space, Switch, InputNumber, Button, Card, message, Cascader, Divider, Checkbox, Modal, Col, Form, Input, Row, Select, Tooltip, } from 'antd';
import func from "../../util/helpers/func"

import { useIntl } from 'react-intl';
import IntlMessages from "../../util/IntlMessages";

const Default = () => {
  const intl = useIntl();

  const { id } = router.query

  const [state, seTstate] = useState({})
  const [displaySave, seTdisplaySave] = useState(true)
  const fields = Object.entries(state).map(([name, value]) => ({ name, value }))


  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();



  // componentDidMount = useEffect
  useEffect(() => {
  }, []);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onSubmit = async (Data) => {

    Data["created_user"] = { name: user.name, id: user.id }


    if (Data.image != undefined) {
      const formData = new FormData()
      formData.append("image", Data.image.file.originFileObj)

      const dataImage = await axios.post(`${API_URL}/upload/uploadpaymentmethodsimage`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      Data["image"] = dataImage.data.path.replace("../admin/public/", "/")
    } else {
      Data["image"] = ""
    }

    axios
      .post(`${API_URL}/paymentmethods/add`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(intl.messages["app.pages.paymentMethods.notAdded"] + res.data.messagge);
        } else {
          message.success(intl.messages["app.pages.paymentMethods.added"]);

          router.push("/paymentmethods/list");

        }
      })
      .catch((err) => console.log(err));

  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  };



  return (

    <div>
      <Card className="card" title={intl.messages["app.pages.paymentMethods.add"]}>
        <Form
          {...formItemLayout}
          form={form}
          name="add"
          onFinishFailed={onFinishFailed}
          onFinish={onSubmit}
          fields={fields}
          scrollToFirstError
        >

          <Form.Item
            name="order"
            label={intl.messages["app.pages.common.order"]}
            initialValue={0}
            rules={[
              {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
              },
            ]}
          >
            <InputNumber style={{ width: 200 }} />
          </Form.Item>

          <Form.Item
            name="title"
            label={intl.messages["app.pages.common.title"]}
            rules={[
              {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="contract"
            label={intl.messages["app.pages.common.contract"]}
            rules={[
              {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="public_key"
            label={intl.messages["app.pages.common.publicKey"]}
            rules={[
              {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="secret_key"
            label={intl.messages["app.pages.common.secretKey"]}
            rules={[
              {
                required: true,
                message: intl.messages["app.pages.common.pleaseFill"],
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Divider />
          <Row>
            <Col md={12} sm={0} />
            <Col md={12} sm={24}>


              <Form.List
                name="api"
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, i) => (
                      <Space key={field.key} style={{ display: 'flex-start', alignItems: "flex-start", marginBottom: 8 }} block align="baseline">
                        <Form.Item
                          {...field}
                          label={intl.messages["app.pages.paymentMethods.name"]}
                          className="float-left"
                          name={[field.name, 'name']}
                          fieldKey={[field.fieldKey, 'name']}
                          rules={[{ required: true, message: intl.messages["app.pages.common.pleaseFill"] }]}

                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          {...field}
                          className="float-left"
                          label={intl.messages["app.pages.paymentMethods.Value"]}
                          name={[field.name, 'value']}
                          fieldKey={[field.fieldKey, 'value']}
                          rules={[{ required: true, message: intl.messages["app.pages.common.pleaseFill"] }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          className="float-left"
                        >
                          <Button type="primary" shape="circle" onClick={() => remove(field.name)} icon={<DeleteOutlined />} />
                        </Form.Item>
                      </Space>

                    ))}

                    <Form.Item className="float-right" >
                      <Button className="float-right" type="dashed" onClick={() => { add() }} icon={<PlusOutlined />}>
                        <IntlMessages id="app.pages.paymentMethods.apiValue" />
                      </Button>
                    </Form.Item>
                  </>

                )}
              </Form.List>


            </Col>
          </Row>

          {/* <Form.Item
            name="image"
            label={intl.messages["app.pages.common.image"]}


          >
            <Upload maxCount={1}
              beforeUpload={(file) => {

                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/svg+xml';
                if (!isJPG) {
                  message.error(intl.messages["app.pages.common.onlyImage"]);
                  seTdisplaySave(false)
                  return false;
                } else {
                  seTdisplaySave(true)

                  return true;
                }
              }}

              showUploadList={{

                removeIcon: <DeleteOutlined onClick={e => seTdisplaySave(true)} />,
              }}
            >
              <Button icon={<UploadOutlined />}><IntlMessages id="app.pages.common.selectFile" /> </Button>
            </Upload>
          </Form.Item> */}

          <Divider />
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={!displaySave}>
              <IntlMessages id="app.pages.common.save" />
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div >
  );
}



export default Default;
