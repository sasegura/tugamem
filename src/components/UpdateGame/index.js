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
import {
  createGameApi,
  gameImageApi,
  getGameDataApi,
  updateGameApi,
} from "../../network/api/otherDetailsApi";
import { useParams, useNavigate } from "react-router-dom";
import MenuSettings from "../Settings/settingsMenu";
import TextEditor from "../Settings/textEditor";

const { Title, Text } = Typography;

const { TextArea } = Input;

const UpdateGameForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [imgfile, setImgFile] = useState([]);
  const [fileType, setFileType] = useState("");
  const [gameData, setGameData] = useState({});
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
    } else {
      imagePath = gameData?.image;
    }
    let data = await updateGameApi(
      {
        title: values?.title,
        image: imagePath || "",
        description: values?.description,
        cost: values?.cost,
        duration: values?.duration,
        //   seats: 2,1
        type: values?.type,
        required_experience: values?.required_experience,
        character_creation: values?.character_creation,
        age_restricted: values?.mark_check,
        player_needed: values?.player_needed,
      },
      id
    );
    if (data?.data?.status_code == 200) {
      setLoading(false);
      navigate("/games");
    }
    setLoading(false);
  };

  const onChange = async (e) => {
    let file = e?.fileList[0]?.originFileObj;
    let type = e?.file?.type;
    setFileType(type);
    setImgFile([file]);
  };

  useEffect(() => {
    async function getGameData() {
      setLoading(true);
      if (/^\d+$/.test(id)) {
        let data = await getGameDataApi({ id });
        if (data?.status_code == 200) {
          setGameData(data?.data);
          form.setFieldsValue({
            title: data?.data?.title,
            type: data?.data?.type,
            mark_check: data?.data?.age_restricted,
            character_creation: data?.data?.character_creation,
            cost: data?.data?.cost,
            description: data?.data?.description,
            duration: data?.data?.duration,
            player_needed: data?.data?.player_needed,
            required_experience: data?.data?.required_experience,
          });
        }
      }

      setLoading(false);
    }
    getGameData();
  }, []);

  return (
    <>
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Update Game ",
            text: "Update game with ease",
          }}
        />
        <Spin spinning={loading} size="large">
          <div className="container forms-wrap">
            <Form
              form={form}
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
                  <Input placeholder="Enter Your Game Titlte" size="large" />
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
                  <Col span={12}>
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
                        className="counter-field"
                        min={1}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
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
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
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
                        value={"one_shot"}
                        showSearch
                        optionFilterProp="children"
                      >
                        <Select.Option value="one_shot">One Shot</Select.Option>
                      </Select>
                    </Form.Item>{" "}
                  </Col>
                  <Col span={12}>
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
                        value={"not_required"}
                        showSearch
                        optionFilterProp="children"
                      >
                        <Select.Option value="not_required">
                          Not required
                        </Select.Option>
                        <Select.Option>Beginner</Select.Option>
                        <Select.Option>Experienced</Select.Option>
                        <Select.Option>Expert</Select.Option>
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
                  <Col span={12}>
                    <Form.Item
                      name="mark_check"
                      className="age-restriction"
                      valuePropName="checked"
                    >
                      <Checkbox value={false}>Age restricted</Checkbox>
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
                    Save Changes
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default UpdateGameForm;
