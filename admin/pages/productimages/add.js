import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from '../../config';
import router from "next/router"
import { DeleteOutlined, CheckOutlined, CloseOutlined, QuestionCircleOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons"

import { AutoComplete, Upload, Space, Switch, InputNumber, Button, Card, message, Cascader, Divider, Checkbox, Modal, Col, Form, Input, Row, Select, Tooltip, } from 'antd';
import func from "../../util/helpers/func"

import { useIntl } from 'react-intl';
import IntlMessages from "../../util/IntlMessages";

const Default = ({ getProducts = [] }) => {
  const intl = useIntl();

  const { id } = router.query

  const [state, seTstate] = useState({ product_id: null })
  const [displaySave, seTdisplaySave] = useState(true)
  const fields = Object.entries(state).map(([name, value]) => ({ name, value }))

  const [dataProducts, seTdataProducts] = useState([{ label: intl.messages["app.pages.productimages.nonProduct"], value: null, }, ...getProducts])

  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();



  const getDataProducts = () => {

    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        if (res.data.length > 0) {
          const dataManipulate = []
          for (const i in res.data) {
            dataManipulate.push({
              label: res.data[i].title,
              value: res.data[i]._id,
            });
          }
          seTdataProducts(dataManipulate);
        }
      })
      .catch((err) => console.log(err));


  }
  // componentDidMount = useEffect
  useEffect(() => {
    getDataProducts()
    seTstate({ ...state, product_id: id })

    console.log(id)
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

      const dataImage = await axios.post(`${API_URL}/upload/uploadproductimage`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      Data["image"] = dataImage.data.path.replace("../admin/public/", "/")
    } else {
      Data["image"] = ""
    }

    axios
      .post(`${API_URL}/productimages/add`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(intl.messages["app.pages.productimages.notAdded"] + res.data.messagge);
        } else {
          message.success(intl.messages["app.pages.productimages.added"]);

          router.push("/productimages/list?id=" + id);

        }
      })
      .catch((err) => console.log(err));

  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  };



  return (

    <div>
      <Card className="card" title={intl.messages["app.pages.productimages.add"]}>
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
            name="product_id"
            label={intl.messages["app.pages.common.category"]}

          >
            <Select
              style={{ width: '100%' }}
              value={state.product_id}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              options={dataProducts}
              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
              treeDefaultExpandAll
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
              onChange={(newValue) => {
                seTstate({ ...state, product_id: newValue });
              }}
            />


          </Form.Item>
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

          >
            <Input />
          </Form.Item>

          <Form.Item
            name="image"
            label={intl.messages["app.pages.common.image"]}


          >
            <Upload maxCount={1}
              beforeUpload={(file) => {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/gif';
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
          </Form.Item>

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


Default.getInitialProps = async ({ req, query }) => {

  if (!req?.headers?.cookie) {
    return {}

  } else {

    const getDataProducts = await axios.get(`${API_URL}/products`, { headers: req ? { cookie: req.headers.cookie } : undefined, });
    const getDataProductsManipulate = []
    if (getDataProducts.data.length > 0) {

      for (const i in getDataProducts.data) {
        getDataProductsManipulate.push({
          label: getDataProducts.data[i].title,
          value: getDataProducts.data[i]._id,
        });
      }
    }
    return { getProducts: getDataProductsManipulate }
  }


}

export default Default;
