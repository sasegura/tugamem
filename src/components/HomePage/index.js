import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Button, Image, Row, Col, Tag, Space } from "antd";

import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  CheckOutlined,
  ReadOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { homeApi } from "../../network/api/otherDetailsApi";
import GameComp from "./gameComp";
import GmComp from "./gmComp";
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  let { authenticate, stripeData } = useSelector((state) => ({
    authenticate: state.authUser?.authenticate,
    stripeData: state.stripeData.key,
  }));

  const [games, setGames] = useState([]);
  const [gameMasters, setGameMasters] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getHomeData() {
      let data = await homeApi();
      if (data) {
        setGames(data?.games);
        setGameMasters(data?.game_masters);
        setBlogs(data?.blogs);
      }
    }
    getHomeData();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="banner">
        <div className="container">
          <Title className="text-left" level={1}>
            TuGameMaster
          </Title>
          <Paragraph className="banner-text">
            {/* Tabletop RPGs Run by Professional Game Masters */}
            Tus partidas de rol guiadas por Game Masters profesionales
          </Paragraph>
          <Space wrap className="banner-btn-wrap">
            <Button
              className="primary-btn"
              size="large"
              type="primary"
              onClick={() => navigate("/find-games")}
            >
              Partidas
            </Button>
            <Button
              className="primary-btn"
              size="large"
              type="primary"
              onClick={() => navigate("/find-game-master")}
            >
              Game Masters
            </Button>
            <Button
              className="primary-btn"
              size="large"
              type="primary"
              onClick={() => navigate("/blog-post")}
            >
              Blogs
            </Button>
            <Button
              className="primary-btn"
              size="large"
              type="primary"
              onClick={() => {
                if (authenticate) {
                  navigate("/game-master");
                } else {
                  navigate("/signup");
                }
              }}
            >
              Hazte GM
            </Button>
          </Space>
        </div>
      </div>

      <div className="steps-wrap">
        <div className="container">
          <Title className="secondary-heading text-center" level={4}>
            Pasos para jugar tu partida con un GM
          </Title>
          <Row gutter={[20, 20]} className="step-box">
            <Col xs={24} sm={12}>
              <div className="benefit-box">
                <SearchOutlined />
                <Title level={4}>Encuentra tu partida</Title>
                <Paragraph className="text">
                  Primero, busca una partida que te guste y encaje con tu horario.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="benefit-box">
                <CheckOutlined />
                <Title level={4}>Reserva</Title>
                <Paragraph className="text">
                  Reserva tu sitio y espera a que el GM te escriba por el chat.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="benefit-box">
                <ReadOutlined />
                <Title level={4}>Prepárate</Title>
                <Paragraph className="text">
                  Lee las instrucciones del GM y pregúntale lo que necesites.
                </Paragraph>
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div className="benefit-box">
                <PlayCircleOutlined />
                <Title level={4}>¡Juega!</Title>
                <Paragraph className="text">
                  Juega la partida y explícanos como te ha ido.
                </Paragraph>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="upcoming-games">
        <div className="container position-relative mx-1300">
          <Title className="secondary-heading text-center" level={2}>
            Siguientes partidas
          </Title>

          <Slider className="upcoming-carousel" {...settings}>
            {games.length > 0 &&
              games?.map((game) => game && <GameComp game={game} />)}
          </Slider>
        </div>
        <Button
          className="see-all-btn"
          type="primary"
          size="large"
          onClick={() => {
            navigate("/find-games");
          }}
        >
          Más partidas
        </Button>
      </div>

      <div className="team-wrap">
        <div className="container">
          <Title className="secondary-heading text-center" level={4}>
            Hecha un vistazo a nuestros Game Masters
          </Title>
          <Row gutter={[30, 30]}>
            {gameMasters.length > 0 &&
              gameMasters?.map(
                (gm) =>
                  gm && (
                    <Col xs={24} sm={12} md={12} lg={8}>
                      <GmComp gm={gm} />
                    </Col>
                  )
              )}
          </Row>
          <Button
            className="see-all-btn"
            type="primary"
            size="large"
            onClick={() => {
              navigate("/find-game-master");
            }}
          >
            Más Game Masters
          </Button>
        </div>
      </div>

      <div className="blog-post-wrap">
        <div className="container">
          <Title className="secondary-heading text-left" level={4}>
            Aprende con nuestros Blogs
          </Title>
          <div className="blog-post-card-wrap">
            {blogs?.length > 0 &&
              blogs?.map((blog) => {
                return (
                  <div
                    className="blog-post-card"
                    onClick={() => {
                      navigate(`/blog-post/${blog?.id}`);
                    }}
                  >
                    <Image preview={false} src={blog.image || "/dragon.webp"} />
                    <div className="content">
                      <Title level={5}>{blog?.title || "Blog Post"}</Title>
                    </div>
                  </div>
                );
              })}
          </div>
          <Button
            className="see-all-btn"
            type="primary"
            size="large"
            onClick={() => {
              navigate("/blog-post");
            }}
          >
            Más Blogs
          </Button>
        </div>
      </div>

      <div className="container">
        <div className="become-wrap">
          <div className="become-inr">
            <Title className="secondary-heading" level={2}>
              Conviértete en Game Master
            </Title>
            <Paragraph className="text">
              Te ayudamos a crear tus partidas y conectar con jugadores
            </Paragraph>
            <Button
              className="see-all-btn"
              type="primary"
              size="large"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Aprende más
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
