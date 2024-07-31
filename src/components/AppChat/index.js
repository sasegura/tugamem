import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Form,
  Input,
  Avatar,
  Badge,
  Upload,
  Button,
  Image,
} from "antd";
import "./appChat.scss";
import { FileImageOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import InfiniteScrollComp from "react-infinite-scroll-component";
import {
  useParams,
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";

import {
  gameImageApi,
  getFindGMPublicApi,
  getRoomChateApi,
  getUserChatsApi,
  sendMsgApi,
} from "../../network/api/otherDetailsApi";
import useWebSocket from "react-use-websocket";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const { Search } = Input;
const { Title } = Typography;

const AppChat = () => {
  let count;
  const [loading, setLoading] = useState(false);
  const didmount = useRef(false);
  const navigate = useNavigate();

  const yesRef = useRef(false);
  const [timer, setTimer] = useState(null);
  const [paramsUrl] = useSearchParams();
  const [loadingAtt, setLoadingAtt] = useState(false);
  const { currentUserID, accessToken, userPic } = useSelector((state) => ({
    currentUserID: state.authUser?.id,
    accessToken: state?.authUser?.accessToken,
    userPic: state?.authUser?.user?.picture,
  }));
  const [socketUser, setSocketUser] = useState("ws://localhost:8000/");

  const lastElementRef = useRef();
  const [userChats, setUserChats] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [chatId, setChatId] = useState(null);
  const [roomChat, setroomChats] = useState([]);
  const [roomoffset, setRoomOffset] = useState(0);
  const [roomHasMore, setRoomHasMore] = useState(true);
  const [sendMsg, setSendMsg] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [toggle, setToggle] = useState(true);

  const timeConvert = (date) => {
    let parsedDate = dayjs(date);
    let formattedTime = parsedDate.format("h:mm A");
    return formattedTime;
  };

  const socketee = new useWebSocket(socketUser, {
    onOpen: () => console.log("opened"),
    onMessage: (e) => {
      const messageData = JSON.parse(e.data);
      console.log("send on ", messageData);
      setroomChats([messageData, ...roomChat]);
    },
    onError: (e) => console.log("on Error", e),
    onClose: () => console.log("closed"),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: 5000,
    reconnectAttempts: 10,
  });
  const timeConvert22 = (date) => {
    let parsedDate = dayjs(date);
    let formattedTime = parsedDate.format("YYYY-MM-DD h:mm A");
    return formattedTime;
  };

  const LoadRoomChat = async (firstIn = false) => {
    try {
      setLoadingRoom(true);
      let games = await getRoomChateApi({
        id: chatId?.id,
        offset: roomoffset,
        limit: 10,
      });
      if (games?.data?.status_code == "200") {
        if (firstIn == true) {
          setroomChats([...games?.data?.data?.messages?.results]);
        } else if (firstIn == false) {
          setroomChats([...roomChat, ...games?.data?.data?.messages?.results]);
        }
        if (games?.data?.data?.messages?.count > roomoffset + 10) {
          setRoomOffset(roomoffset + 10);
        } else {
          setRoomHasMore(false);
        }
        setLoadingRoom(false);
        count = games?.data?.data?.count;
      }
    } catch (error) {
      setLoadingRoom(false);
    }
  };
  const LoadMoreUsers = async (bySearch = false) => {
    try {
      setLoading(true);
      let games = await getUserChatsApi({ offset, limit: 10, searchValue });

      if (games?.data?.status_code == "200") {
        if (bySearch == true) {
          setUserChats([...games?.data?.data?.results]);
        } else if (bySearch == false) {
          setUserChats([...userChats, ...games?.data?.data?.results]);
        }
        if (
          !didmount.current &&
          paramsUrl.get("gm") &&
          games?.data?.data?.results?.length > 0
        ) {
          let b = games?.data?.data?.results?.map((data) => {
            if (data?.gm == paramsUrl.get("gm")) {
              setChatId({
                id: data?.id,
                name: data?.personal_details?.name,
                picture: data?.personal_details?.picture,
              });
            }
          });
          didmount.current = true;
        }
        if (games?.data?.data?.count > offset + 10) {
          setOffset(offset + 10);
        } else {
          setHasMore(false);
        }
        setLoading(false);
        count = games?.data?.data?.count;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = async ({ fileList: newFileList }) => {
    setLoadingAtt(true);
    let file = newFileList[0]?.originFileObj;
    let type = newFileList[0]?.type;
    let imagePath;
    if (newFileList?.length > 0) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("content_type", type);
      let image = await gameImageApi(formData);

      if (image?.status == 200) {
        imagePath = image?.data?.data?.file_url;
        setAttachments([imagePath]);
      }
      setLoadingAtt(false);
      // setAttachments
    }

    setFileList(newFileList);
  };
  const uploadButton = (
    <Button>{loadingAtt ? <LoadingOutlined /> : <PlusOutlined />}</Button>
  );
  const fileButton = (
    <div>{loadingAtt ? <LoadingOutlined /> : <FileImageOutlined />}</div>
  );

  function formatChatDate(inputDate) {
    const messageDate = new Date(inputDate);
    const currentDate = new Date();

    // Function to check if two dates have the same year, month, and day
    function datesAreEqual(date1, date2) {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    }

    const dayDifference = Math.floor(
      (currentDate - messageDate) / (1000 * 60 * 60 * 24)
    );

    if (dayDifference === 0 && datesAreEqual(messageDate, currentDate)) {
      return "today";
    } else if (dayDifference === 1) {
      return "yesterday";
    } else {
      // Format the date as "YYYY-MM-DD"
      const formattedDate = messageDate.toISOString().split("T")[0];
      return formattedDate;
    }
  }

  function areDatesDifferent(date1, date2) {
    const timestamp1 = dayjs(date1);
    const timestamp2 = dayjs(date2);

    return !timestamp1.isSame(timestamp2, "day");
  }

  useEffect(() => {
    setSocketUser(
      `ws://localhost:8000/ws/chat/${chatId?.id}/?access_token=${accessToken}`
    );
    if (chatId) {
      setRoomOffset(0);
      setRoomHasMore(true);
      setSendMsg("");
      setroomChats([]);
      setLoadingRoom(false);
      LoadRoomChat(true);
    }
  }, [chatId]);
  // useEffect(() => {
  //   if (didmount.current) {
  //     setUserChats([]);
  //     setOffset(0);
  //     setHasMore(true);
  //     setLoading(false);
  //   } else {
  //     didmount.current = true;
  //   }
  // }, [searchValue]);
  useEffect(() => {
    setUserChats([]);
    setOffset(0);
    setHasMore(true);
    setLoading(false);
    LoadMoreUsers(true);
  }, [searchValue]);

  // useEffect(() => {
  //   if (roomChat?.length) {
  //     const lastElement = document.getElementById("lastElementId");
  //     lastElement &&
  //       lastElement?.scrollIntoView({
  //         block: "start",
  //         inline: "nearest",
  //       });
  //   }
  // }, [roomChat]);

  return (
    <>
      <div className="chat-application-wrapper">
        <div className={`sidebar-content ${toggle ? "show" : ""}`}>
          <div className="sidebar-header">
            <Link to="/settings">
              <Image
                preview={false}
                width={20}
                height={20}
                src={"/arrow.png"}
              />
            </Link>
            <Title
              style={{ cursor: "pointer" }}
              level={4}
              onClick={() => {
                navigate("/");
              }}
            >
              TuGameMaster
            </Title>
          </div>
          <div class="chat-fixed-search">
            <Badge dot status="success">
              <Avatar size={40} src={userPic ? userPic : "/user_profile.png"} />
            </Badge>
            {/* <Search
              placeholder="input search text"
              onSearch={(aa) => {
                setSearchValue(aa);
              }}
              style={{
                width: 200,
              }}
            /> */}
            <Input
              placeholder="Search"
              onChange={(e) => {
                clearTimeout(timer);
                const newTimer = setTimeout(() => {
                  setSearchValue(e.target.value);
                }, 1000);
                setTimer(newTimer);
              }}
            />
          </div>
          <div className="chat-user-list-wrapper">
            <Title className="chat-list-title" level={4}>
              Chats
            </Title>

            <div>
              <InfiniteScrollComp
                // loadMore={!loading && LoadMoreUsers}

                dataLength={userChats?.length}
                next={LoadMoreUsers}
                height={300}
                hasMore={hasMore}
                style={{ height: "calc(100vh - 210px)", paddingBottom: 30 }}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
              >
                {userChats?.length > 0 &&
                  userChats?.map((chat, index) => {
                    return (
                      <div
                        className="list-tem"
                        onClick={async () => {
                          setChatId({
                            id: chat?.id,
                            name: chat?.personal_details?.name,
                            picture: chat?.personal_details?.picture,
                          });
                          setToggle(false);
                        }}
                      >
                        <span class="avatar">
                          <Badge dot status="success">
                            <Avatar
                              size={40}
                              src={
                                chat?.personal_details?.picture ||
                                "/user_profile.png"
                              }
                            />
                          </Badge>
                          <span class="avatar-status-offline"></span>
                        </span>
                        <div class="chat-info">
                          <h5 class="mb-0">{chat?.personal_details?.name}</h5>
                          {chat?.latest_message?.text && (
                            <p class="card-text text-truncate">
                              {chat?.latest_message?.text}
                            </p>
                          )}
                        </div>
                        <div class="chat-meta text-nowrap">
                          <small class="chat-time">
                            {timeConvert(chat?.updated_at)}
                          </small>
                        </div>
                      </div>
                    );
                  })}
              </InfiniteScrollComp>
            </div>
          </div>
        </div>

        {chatId ? (
          <div className="chat-app-window">
            <div className="chat-navbar">
              <Button
                className="chat-toggle-button"
                type="text"
                onClick={() => {
                  setToggle(true);
                }}
              >
                <MenuUnfoldOutlined />
              </Button>
              <Badge dot status="success">
                <Avatar size={36} src={chatId?.image || "/user_profile.png"} />
              </Badge>
              <Title level={5}>{chatId?.name}</Title>
            </div>
            <div
              className="user-chats"
              id="scrollableDiv"
              style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {/* <ul style={{ height: "800px", overflow: "auto" }}> */}
              <InfiniteScrollComp
                // loadMore={!loadingRoom && LoadRoomChat}
                dataLength={roomChat?.length}
                next={LoadRoomChat}
                hasMore={roomHasMore}
                // isReverse={true}
                inverse={true}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
                height={800}
                style={{ display: "flex", flexDirection: "column-reverse" }}
                scrollableTarget="scrollableDiv"
              >
                {roomChat?.length > 0 &&
                  roomChat?.map((chat, index) => {
                    return (
                      <div>
                        {areDatesDifferent(
                          roomChat[index + 1]?.updated_at,
                          chat?.updated_at
                        ) ? (
                          <Title className="divider-text" level={5}>
                            {formatChatDate(chat?.updated_at)}
                          </Title>
                        ) : (
                          ""
                        )}
                        <div
                          className={`chats ${
                            !(chat?.sender == currentUserID)
                              ? "message-in"
                              : "message-out"
                          }`}
                        >
                          <Avatar
                            size={40}
                            src={chat?.user_picture || "/user_profile.png"}
                          />

                          <div className="chat-content-wrap">
                            {chat?.attachments?.length > 0 &&
                              chat?.attachments?.map((att) => {
                                return (
                                  <div
                                    className={`chats ${
                                      !(chat?.sender == currentUserID)
                                        ? "message-in"
                                        : "message-out"
                                    }`}
                                  >
                                    <div className="chat-content">
                                      <Image
                                        width={120}
                                        height={100}
                                        preview={false}
                                        src={att}
                                      />
                                    </div>
                                  </div>
                                );
                              })}

                            {chat?.text && (
                              <div className="chat-content">{chat?.text}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </InfiniteScrollComp>
              {/* </ul> */}
            </div>
            {fileList?.length > 0 && (
              <div>
                <Upload
                  // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => {
                    return false;
                  }}
                  multiple={false}
                >
                  {fileList?.length < 1
                    ? fileButton
                    : fileList.length >= 1
                    ? null
                    : uploadButton}
                </Upload>
                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </div>
            )}
            <Form className="chat-app-form">
              <Form.Item className="form-item mb-0">
                <Input
                  placeholder="Type your message here."
                  enterButton="Search"
                  size="large"
                  value={sendMsg}
                  onChange={(value) => {
                    setSendMsg(value.target.value);
                  }}
                  addonAfter={
                    fileList?.length >= 0 && (
                      <Upload
                        className="attachment-btn"
                        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        // listType="picture-card"
                        // fileList={fileList}
                        // onPreview={handlePreview}
                        listType=""
                        onChange={handleChange}
                        beforeUpload={() => {
                          return false;
                        }}
                        multiple={false}
                      >
                        {loadingAtt ? (
                          <LoadingOutlined />
                        ) : (
                          <FileImageOutlined />
                        )}
                      </Upload>
                    )
                  }
                />
              </Form.Item>

              <Button
                type="primary"
                size="large"
                onClick={async () => {
                  let res = await socketee.sendJsonMessage({
                    message: sendMsg,
                    attachments: attachments || [],
                  });
                  setSendMsg("");
                  setAttachments([]);
                  setFileList([]);
                }}
              >
                Send
              </Button>
            </Form>
          </div>
        ) : (
          <div className="chat-app-window">
            <div className="chat-navbar">
              <Button
                className="chat-toggle-button"
                type="text"
                onClick={() => {
                  setToggle(!toggle);
                }}
              >
                <MenuUnfoldOutlined />
              </Button>
              <Title level={5}>{}</Title>
            </div>
            <div
              className="user-chats"
              id="scrollableDiv"
              style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default AppChat;
