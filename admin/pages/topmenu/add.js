import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from '../../config';
import router from "next/router"
import { DeleteOutlined, CheckOutlined, CloseOutlined, QuestionCircleOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons"

import { AutoComplete, Upload, Space, Switch, TreeSelect, InputNumber, Button, Card, message, Cascader, Divider, Checkbox, Modal, Col, Form, Input, Row, Select, Tooltip, } from 'antd';
import func from "../../util/helpers/func"

import { useIntl } from 'react-intl';
import IntlMessages from "../../util/IntlMessages";

const { TreeNode } = TreeSelect;



const Default = ({ getCategories = [] }) => {
  const intl = useIntl();

  const [state, seTstate] = useState({ categories_id: null })
  const fields = Object.entries(state).map(([name, value]) => ({ name, value }))

  const [dataCategories, seTdataCategories] = useState([{ label: intl.messages["app.pages.topmenu.rootCategory"], value: null, }, ...getCategories])

  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const { id } = router.query


  const getDataCategory = () => {

    axios
      .get(`${API_URL}/topmenu`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = func.getCategoriesTreeOptions(res.data)
          data.unshift({ label: intl.messages["app.pages.topmenu.rootCategory"], value: null, })

          seTdataCategories(data);
        }
      })
      .catch((err) => console.log(err));


  }
  // componentDidMount = useEffect
  useEffect(() => {
    getDataCategory()
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



  const onSubmit = (Data) => {

    Data["created_user"] = { name: user.name, id: user.id }


    axios
      .post(`${API_URL}/topmenu/add`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(intl.messages["app.pages.topmenu.notAdded"] + res.data.messagge);
        } else {
          message.success(intl.messages["app.pages.topmenu.added"]);

          router.push("/topmenu/list");

        }
      })
      .catch((err) => console.log(err));
  };



  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  };



  return (

    <div>
      <Card className="card" title={intl.messages["app.pages.topmenu.add"]}>
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
            name="categories_id"
            label={intl.messages["app.pages.common.category"]}

          >
            <TreeSelect
              style={{ width: '100%' }}
              value={state.categories_id}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={dataCategories}
              placeholder={intl.messages["app.pages.common.pleaseSelect"]}
              treeDefaultExpandAll
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
              onChange={(newValue) => {
                seTstate({ ...state, categories_id: newValue });
              }}
            />

          </Form.Item>
          <Form.Item
            name="order"
            label={intl.messages["app.pages.common.order"]}
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
            <Input onChange={(e) => {
              seTstate({
                ...state,
                title: e.target.value,
                seo: func.replaceSeoUrl(e.target.value)
              })
            }} />
          </Form.Item>

          <Form.Item
            name="description"
            label={intl.messages["app.pages.common.description"]}
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
            name="seo"
            label="Seo Url"
            value={state.seo}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label={intl.messages["app.pages.topmenu.otherLink"]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="visible"
            label={intl.messages["app.pages.common.visible"]}
          >
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          </Form.Item>

          <Divider />
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
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

    const getDataCategories = await axios.get(`${API_URL}/topmenu`, { headers: req ? { cookie: req.headers.cookie } : undefined, });
    const geTdataCategoriesManipulate = [{ label: "▣ Root Category ", value: null, }]
    if (getDataCategories.data.length > 0) {
      geTdataCategoriesManipulate.push(func.getCategoriesTreeOptions(getDataCategories.data))
    }
    return { getCategories: geTdataCategoriesManipulate }
  }


}

export default Default;
