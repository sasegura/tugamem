import React, { useEffect, useState } from "react";
import { Typography, Image, Button, Row, Col, Spin } from "antd";
import { CalendarOutlined, LikeFilled } from "@ant-design/icons";
import {
  chatExistApi,
  createChatsApi,
  getGmGamesPublicApi,
  getGmPublicApi,
} from "../../network/api/otherDetailsApi";
import GameComp from "../HomePage/gameComp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate, createSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const { Title, Paragraph, Text } = Typography;

const SingleGameMaster = () => {
  const navigate = useNavigate();
  let { clientId } = useSelector((state) => ({
    clientId: state.authUser?.id,
  }));
  const [loading, setLoading] = useState(false);
  const [gmInfo, setGmInfo] = useState(null);
  const [gameList, setGameList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [chatExist, setChatExist] = useState(false);
  const role = useSelector((state) => state.authUser.user.role_type);

  const authenticated = useSelector((state) => state.authUser.authenticate);

  const gmIdLogin = useSelector((state) => state?.authUser?.gmInfo?.id);
  let count;

  const gmId = useParams();

  const LoadmoreApiCall = async () => {
    try {
      // setLoading(true);
      let games = await getGmGamesPublicApi({ offset, gmId: gmId?.id });
      if (games?.status_code == 200) {
        setGameList([...gameList, ...games?.data?.results]);
        if (games?.data?.count > offset + 3) {
          setOffset(offset + 3);
        } else {
          setHasMore(false);
        }

        count = games?.data?.count;
        // setLoading(false);
      }
    } catch (error) {}
  };

  function hasGameMasterRole(arr) {
    let res;
    if (role?.length > 0 && Array.isArray(role)) {
      const resultArray = Array.isArray(arr)
        ? arr.map((item) => {
            if (item?.role == "game_master") {
              return true;
            }
          })
        : null;
      res = resultArray.includes(true);
    } else {
      res = false;
    }
    return res;
  }
  useEffect(() => {
    async function ListApiCalls() {
      setLoading(true);
      let data = await getGmPublicApi(gmId?.id);
      let games = await getGmGamesPublicApi({ offset, gmId: gmId?.id });
      if (authenticated && gmIdLogin != gmId?.id) {
        let chatStaus = await chatExistApi({ gmId: gmId?.id });
        if (chatStaus?.data?.status_code == 200) {
          setChatExist(chatStaus?.data?.data?.gm ? true : false);
        }
      }
      if (games?.status_code == 200) {
        setGameList(games?.data?.results || []);
        if (games?.data?.count > offset + 3) {
          setOffset(offset + 3);
        } else {
          setHasMore(false);
        }

        count = games?.data?.count;
      }
      if (data?.status_code == 200) {
        setGmInfo(data?.data);
      }
      setLoading(false);
    }
    ListApiCalls();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  return (
    <Spin spinning={loading} size="large">
      <div className="single-game-master">
        <div className="container">
          <div className="gm-cover-wrap">
            <img
              className="single-gaming-cover"
              src={gmInfo?.user?.poster || "/gaming-cover.jpg"}
            />
            <Image
              preview={false}
              src={gmInfo?.user?.picture || "/user_profile.png"}
            />
          </div>
          <div className="blog-content gm-content">
            <div className="content-inr">
              <Title level={2}>
                {gmInfo?.name}{" "}
                <span>
                  {" "}
                  {gmInfo?.total_reviews
                    ? `(${gmInfo?.average_reviews}) ${gmInfo?.total_reviews} reviews`
                    : ""}
                </span>
              </Title>

              {/* <Paragraph>{ga}</Paragraph> */}
              <ul className="game-master-list">
                <li className="gm-experience">
                  <Image
                    width={48}
                    height={48}
                    preview={false}
                    src="/gamepad.png"
                  ></Image>
                  <span>
                    <span className="tag">Experience as Player</span>
                    {gmInfo?.experience_player} years
                  </span>
                </li>
                <li className="gm-experience">
                  <Image
                    width={48}
                    height={48}
                    preview={false}
                    src="/gamepad.png"
                  ></Image>
                  <span>
                    <span className="tag">Experience as GM</span>
                    {gmInfo?.experience_game_master} years
                  </span>
                </li>
                <li className="discord-tag">
                  <Image
                    width={48}
                    height={48}
                    preview={false}
                    src="/discord.png"
                  ></Image>
                  <span>
                    <span className="tag">Discord Tag</span>
                    {gmInfo?.discord_tag}
                  </span>
                </li>
                <li>
                  <Image
                    width={48}
                    height={48}
                    preview={false}
                    src="/server.png"
                  ></Image>
                  <span>
                    <span className="tag">Games Host</span>
                    {gmInfo?.games_hosted}
                  </span>
                </li>
              </ul>

              {gmIdLogin != gmId?.id && (
                <Button
                  type="primary"
                  size="large"
                  onClick={async () => {
                    if (authenticated) {
                      if (!chatExist) {
                        let data = await createChatsApi({
                          gm: gmInfo?.id,
                        });
                      }
                      navigate({
                        pathname: "/chats",
                        search: createSearchParams({
                          gm: gmInfo?.id,
                        }).toString(),
                      });
                    } else {
                      navigate("/signup");
                    }
                  }}
                >
                  Contact GM
                </Button>
              )}

              <Title level={4}>About :</Title>
              <Paragraph>
                <div
                  dangerouslySetInnerHTML={{
                    __html: gmInfo?.about_me_game_master,
                  }}
                />
              </Paragraph>

              <Title level={4}>Tools used by GM :</Title>
              <Paragraph>
                <div
                  dangerouslySetInnerHTML={{
                    __html: gmInfo?.game_tools,
                  }}
                />
              </Paragraph>

              <Title level={3}>Games Created by {gmInfo?.name}</Title>
            </div>
          </div>
        </div>
      </div>

      <div className="upcoming-games gm-games">
        <div className="container">
          <Row gutter={[30, 30]}>
            {gameList?.length > 0 &&
              gameList?.map((game) => {
                return (
                  <>
                    <Col span={8}>
                      <GameComp game={game} />
                    </Col>
                  </>
                );
              })}
          </Row>
          <br />

          {hasMore && (
            <Button
              type="primary"
              size="large"
              onClick={() => {
                !loading && LoadmoreApiCall();
              }}
            >
              Load More
            </Button>
          )}
        </div>
      </div>
    </Spin>
  );
};

export default SingleGameMaster;
