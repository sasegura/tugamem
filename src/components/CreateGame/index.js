import React, { useEffect, useState } from "react";
import {
  Typography,
  Space,
  Tag,
  Form,
  Input,
  InputNumber,
  Button,
  Menu,
  Image,
  Upload,
  Select,
  Checkbox,
  DatePicker,
  Spin,
  Row,
  Col,
} from "antd";
import { MailOutlined, UploadOutlined } from "@ant-design/icons";
import { createGameApi, gameImageApi } from "../../network/api/otherDetailsApi";

import { useParams, useNavigate } from "react-router-dom";
import MenuSettings from "../Settings/settingsMenu";
import TextEditor from "../Settings/textEditor";
const { Title, Text } = Typography;

const { TextArea } = Input;

const dateFormat = "YYYY-MM-DD HH:mm:ss";

const CreateGameForm = () => {
  const navigate = useNavigate();
  const [imgfile, setImgFile] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fileType, setFileType] = useState("");
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChange = async (e) => {
    let file = e?.fileList[0]?.originFileObj;
    let type = e?.file?.type;
    setFileType(type);
    setImgFile([file]);
  };
  const onFinish = async (values) => {
    setLoading(true);
    let image;
    let imagePath;
    if (imgfile?.length > 0) {
      let formData = new FormData();
      formData.append("file", imgfile[0]);
      formData.append("content_type", fileType);
      image = await gameImageApi(formData);
    }

    if (image?.status == 200) {
      imagePath = image?.data?.data?.file_url;
    }
    let data = await createGameApi({
      title: values?.title,
      image: imagePath || "",
      description: values?.description,
      cost: values?.cost,
      date: values?.date.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      duration: values?.duration,
      seats: values?.seats,
      type: values?.type,
      required_experience: values?.required_experience,
      character_creation: values?.character_creation,
      age_restricted: values?.mark_check || false,
      player_needed: values?.player_needed,
    });
    if (data?.data?.status_code == 200) {
      setLoading(false);
      navigate("/games");
    }
    setLoading(false);
  };
  return (
    <Spin spinning={loading} size="large">
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Create Game",
          }}
        />
        <div className="container forms-wrap">
          <Form
            // form={form}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            className="startgames-forms"
          >
            <div className="forms-wrapper">
              <Form.Item
                label={"Game Picture"}
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: "Please Upload Game Thumbnail!",
                  },
                ]}
              >
                <Upload
                  listType="picture"
                  multiple={false}
                  accept={".png,.jpeg,.jpg"}
                  onChange={onChange}
                  fileList={imgfile}
                  className="upload-game-profile"
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  <Button block ghost size="large" icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Form.Item>
              <Form.Item
                label={"Game Title"}
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please input Game Title!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid title",
                  },
                ]}
              >
                <Input placeholder="Enter your game title" size="large" />
              </Form.Item>
              <Form.Item
                label="Game Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input your Game Description!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid Description",
                  },
                ]}
              >
                <TextEditor />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Cost per Session"
                    name="cost"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Cost per session!",
                      },
                    ]}
                    initialValue={0}
                  >
                    <InputNumber
                      size="large"
                      placeholder="Enter cost per session per player in eurs"
                      className="counter-field"
                      min={1}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Session Date"
                    name="date"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Date !",
                      },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      format={dateFormat}
                      placeholder="Select session date"
                      showTime
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Total Seats"
                    name="seats"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Cost per session!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      className="counter-field"
                      placeholder="Enter total seats available"
                      min={1}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Duration"
                    name="duration"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Approximated duration!",
                      },
                    ]}
                  >
                    <InputNumber
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Enter duration in hours"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Game Type"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Game Type!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Enter your game type"
                      value={"one_shot"}
                      showSearch
                      optionFilterProp="children"
                      size="large"
                    >
                      <Select.Option value="one_shot">One Shot</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Required experience"
                    name="required_experience"
                    rules={[
                      {
                        required: true,
                        message: "Please Select your option!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      // defaultValue={"not_required"}
                      showSearch
                      optionFilterProp="children"
                    >
                      <Select.Option value="not_required">
                        Not required
                      </Select.Option>
                      <Select.Option value="beginner">Beginner</Select.Option>
                      <Select.Option value="experienced">
                        Experienced
                      </Select.Option>
                      <Select.Option value="expert">Expert</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    label="Character Creation"
                    name="character_creation"
                    rules={[
                      {
                        required: true,
                        message: "Please Select your option!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      showSearch
                      optionFilterProp="children"
                      value={"created_in_game"}
                    >
                      <Select.Option value="created_in_game">
                        Created In Game
                      </Select.Option>
                      <Select.Option value="created_by_players_beforehand">
                        Created By Players Beforehad
                      </Select.Option>
                      <Select.Option value="created_by_game_master_beforehand">
                        Created By Game Master Beforehand
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="What do players need before the game"
                name="player_needed"
                rules={[
                  {
                    required: true,
                    message: "Please input your Game Description!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Enter a valid Description",
                  },
                ]}
              >
                <TextEditor />
              </Form.Item>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="mark_check"
                    className="age-restriction"
                    valuePropName="checked"
                  >
                    <Checkbox value={false}>Age Restricted</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  className="submit-btn"
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Create Game
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default CreateGameForm;