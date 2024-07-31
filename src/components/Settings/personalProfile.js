import React, { useEffect, useState } from "react";
import {
  Typography,
  Menu,
  Image,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Spin,
  Upload,
  Row,
  Col,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextEditor from "./textEditor";

import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import moment from "moment";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import {
  gameListApi,
  countriesApi,
  lauguagesApi,
  timeZonesApi,
  getMeApi,
  profileImageApi,
} from "../../network/api/otherDetailsApi";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProApi } from "../../network/api/authApi";

import { useNavigate } from "react-router-dom";
import MenuSettings from "./settingsMenu";

// import { RootState } from "src/store";

const dateFormat = "YYYY-MM-DD";

const { TextArea } = Input;
const { Title, Text } = Typography;

const PersonalProfile = () => {
  const [fileList, setFileList] = useState("");
  const [fileListCov, setFileListCov] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // const [loading1, setLoading1] = useState(false);
  let { gameList, countries, timezones, languages, username } = useSelector(
    (state) => ({
      gameList: state.otherDetails.gamesList,
      countries: state.otherDetails.countries,
      timezones: state.otherDetails.timezons,
      languages: state.otherDetails.languages,
      username: state.authUser.user.user_name,
    })
  );
  // const onChange = async (e) => {
  //   setLoading1(true);
  //   let file = e?.fileList[0]?.originFileObj;
  //   let type = e?.file?.type;
  //   if (file) {
  //     let formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("content_type", type);
  //     formData.append("type", "profile_picture");

  //     let data = await profileImageApi(formData);
  //   }
  //   setFileList(e.fileList);
  //   setLoading1(false);
  // };

  const onFinish = async (values) => {
    let reqbody = {
      first_name: values?.first_name,
      last_name: values?.last_name,
      about_me: values?.about_me,
      country: values?.country,
      language: values?.language,
      birthday: values.birthday.format("YYYY-MM-DD"),
      fav_game: values?.fav_game,
    };
    let data = await updateUserProApi(reqbody);
    if (data) {
      navigate("/settings");
    }
  };

  useEffect(() => {
    async function ListApiCalls() {
      setLoading(true);
      let [listGame, countryList, languageList, timezoneList, preUserData] =
        await Promise.all([
          gameListApi(),
          countriesApi(),
          lauguagesApi(),
          timeZonesApi(),
          getMeApi(),
        ]);
      preUserData &&
        form.setFieldsValue({
          first_name: preUserData?.data?.data?.first_name,
          last_name: preUserData?.data?.data?.last_name,
          about_me: preUserData?.data?.data?.about_me,
          country: preUserData?.data?.data?.country,
          fav_game: preUserData?.data?.data?.fav_game,
          birthday: preUserData?.data?.data?.birthday
            ? dayjs(preUserData?.data?.data?.birthday, dateFormat)
            : null,
        });

      if (preUserData?.data?.data?.picture) {
        preUserData && setFileList(preUserData?.data?.data?.picture);
      }
      if (preUserData?.data?.data?.poster) {
        preUserData && setFileListCov(preUserData?.data?.data?.poster);
      }
      setLoading(false);
    }
    ListApiCalls();
  }, []);
  return (
    <Spin spinning={loading} size="large">
      <div className="profile-head"></div>
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Perfil Personal",
            text: "Actualiza tu información de usuario",
          }}
          profile={true}
          fileList={fileList}
          setFileList={setFileList}
          fileListCov={fileListCov}
          setFileListCov={setFileListCov}
        />
        {/* <div className="container mx-900">
          <div className="page-header">
            <div>
              <Title level={2}>Personal Profile</Title>
              <Text className="profile-text">Update information with ease</Text>
            </div>
            <div className="profile-avatar">
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  multiple={false}
                  accept={".png,.jpeg,.jpg"}
                  // onPreview={onPreview}
                  beforeUpload={() => {
                    return false;
                  }}
                >
                  {fileList.length < 1 && uploadButton}
                </Upload>
              </ImgCrop>
            </div>
          </div>
        </div> */}
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
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Nombre"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                        message: "Introduce tu nombre por favor",
                      },
                      {
                        pattern: /[^ \s]/,
                        message: "Introduce un nombre válido",
                      },
                    ]}
                  >
                    <Input placeholder="Introduce tu nombre" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Apellido"
                    name="last_name"
                    rules={[
                      {
                        required: true,
                        message: "Introduce tu apellido por favor",
                      },
                      {
                        pattern: /[^ \s]/,
                        message: "Introduce un apellido válido",
                      },
                    ]}
                  >
                    <Input placeholder="Introduce tu apellido" size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Descripción"
                name="about_me"
                rules={[
                  {
                    required: true,
                    message: "Hablanos sobre ti!",
                  },
                  {
                    pattern: /[^ \s]/,
                    message: "Introduce texto válido",
                  },
                ]}
              >
                <TextEditor />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="País"
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Selecciona tu país",
                      },
                    ]}
                  >
                    <Select
                      value={countries[0]?.id}
                      size="large"
                      showSearch
                      optionFilterProp="children"
                    >
                      {!!countries.length > 0 &&
                        countries.map((countrydata) => (
                          <Select.Option
                            value={countrydata.id}
                            key={countrydata?.id}
                          >
                            {countrydata?.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Language"
                    name="language"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Language",
                      },
                    ]}
                  >
                    <Select
                      value={languages[0]?.id}
                      size="large"
                      showSearch
                      optionFilterProp="children"
                    >
                      {!!languages.length > 0 &&
                        languages.map((langdata) => (
                          <Select.Option value={langdata.id} key={langdata?.id}>
                            {langdata?.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="Date of Birth"
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please input your First Name!",
                  },
                ]}
              >
                <DatePicker size="large" format={dateFormat} />
              </Form.Item>

              <Form.Item
                label="favourite Games"
                name="fav_game"
                rules={[
                  {
                    required: true,
                    message: "Please select Game",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  size="large"
                  placeholder="Please select"
                  options={gameList.map((game) => {
                    return { label: game.name, value: game.id };
                  })}
                />
              </Form.Item>
              <Form.Item label="Username" name="username">
                <Input
                  disabled
                  placeholder={username}
                  value={username}
                  size="large"
                />
              </Form.Item>
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
      </div>
    </Spin>
  );
};

export default PersonalProfile;
