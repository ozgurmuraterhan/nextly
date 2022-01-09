import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from '../../../config';
import router from "next/router"
import { DeleteOutlined, CheckOutlined, CloseOutlined, QuestionCircleOutlined, PlusOutlined, UploadOutlined, MinusCircleOutlined } from "@ant-design/icons"

import { AutoComplete, Upload, Space, Switch, Image, TreeSelect, InputNumber, Button, Card, message, Cascader, Divider, Checkbox, Modal, Col, Form, Input, Row, Select, Tooltip, } from 'antd';
import func from "../../util/helpers/func"

import { useIntl } from 'react-intl';
import IntlMessages from "../../util/IntlMessages";


const Default = ({ getData = [], getCategories = [] }) => {
  const intl = useIntl();

  const [state, seTstate] = useState(getData)
  const [dataCategories, seTdataCategories] = useState([{ label: intl.messages["app.pages.category.rootCategory"], value: null, }, ...getCategories])

  const [displaySave, seTdisplaySave] = useState(true)

  const fields = Object.entries(state).map(([name, value]) => ({ name, value }))


  const { user } = useSelector(({ login }) => login);
  const [form] = Form.useForm();

  const { id } = router.query

  function getDataFc() {
    axios.get(`${API_URL}/homeslider/${id}`).then((response) => {
      seTstate(response.data);
    });
  }
  // componentDidMount = useEffect

  const getDataCategory = () => {

    axios
      .get(`${API_URL}/homeslider`)
      .then((res) => {
        if (res.data.length > 0) {
          const data = func.getCategoriesTreeOptions(res.data)
          console.log("res.data", data)
          data.unshift({ label: intl.messages["app.pages.category.rootCategory"], value: null, })
          seTdataCategories(data);
        }
      })
      .catch((err) => console.log(err));


  }

  // componentDidMount = useEffect
  useEffect(() => {
    getDataCategory()
    getDataFc()
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

    if (Data.image != undefined && state.image != Data.image) {
      axios.post(`${API_URL}/upload/deletehomesliderimage`, { path: state.image })

      const formData = new FormData()
      formData.append("image", Data.image.file.originFileObj)

      const dataImage = await axios.post(`${API_URL}/upload/uploadhomesliderimage`, formData, { headers: { "Content-Type": "multipart/form-data" } })
      Data["image"] = dataImage.data.path.replace("../admin/public/", "/")
    }

    axios
      .post(`${API_URL}/homeslider/${id}`, Data)
      .then((res) => {
        if (res.data.variant == "error") {
          message.error(intl.messages["app.pages.homeSlider.notUpdated"] + res.data.messagge);
        } else {
          message.success(intl.messages["app.pages.homeSlider.updated"]);

          router.push("/homeslider/list");

        }
      })
      .catch((err) => console.log(err));

  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo)
  };



  return (

    <div>
      <Card className="card" title={intl.messages["app.pages.homeSlider.update"]}>
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
            name="description"
            label={intl.messages["app.pages.common.description"]}

          >
            <AlloyEditor
              content={this.state.content}
              events={{
                "change": this.onChange
              }}
              className="my-editor"
            />
            <Input />
          </Form.Item>
          <Form.Item
            name="link"
            label={intl.messages["app.pages.homeSlider.otherLink"]}

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
              <Button icon={<UploadOutlined />}><IntlMessages id="app.pages.common.selectFile" /></Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="image"
            label={intl.messages["app.pages.common.uploatedImage"]}
          >
            <Image src={API_URL + state.image} width={200} />
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


    const getDataCategories = await axios.get(`${API_URL}/homeslider`, { headers: req ? { cookie: req.headers.cookie } : undefined, });
    const geTdataCategoriesManipulate = [{ label: "▣ Root Category ", value: null, }]
    if (getDataCategories.data.length > 0) {
      geTdataCategoriesManipulate.push(func.getCategoriesTreeOptions(getDataCategories.data))
    }


    const getData = await axios.get(API_URL + "/homeslider/" + query.id, { headers: req ? { cookie: req.headers.cookie } : undefined, });
    const geTdataManipulate = getData.data


    return { getData: geTdataManipulate, getCategories: geTdataCategoriesManipulate }
  }


}

export default Default;

