import React, { useEffect, useState } from "react";
import { EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Typography, Space, Button, Tag, Image, Row, Col, Modal } from "antd";
import {
  CalendarOutlined,
  LikeFilled,
  DeleteOutlined,
} from "@ant-design/icons";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import {
  getGmGamesApi,
  deleteGameApi,
  getMeApi,
} from "../../network/api/otherDetailsApi";
import MenuSettings from "../Settings/settingsMenu";
import GameComp from "../HomePage/gameComp";

const { Title, Paragraph, Text } = Typography;

const MyGame = () => {
  const navigate = useNavigate();
  const [selectedGameId, setSelectedGameId] = useState("");
  const [isModalOpenPayouts, setIsModalOpenPayouts] = useState(false);
  const [isModalOpenDeleteGame, setIsModalDeleteGame] = useState(false);

  const [gmGames, setGmGames] = useState([]);
  const expressSubmitterDetail = useSelector(
    (state) => state.authUser?.gmInfo?.express_details_submitted
  );
  let setGameValue = (data) => {
    setGmGames(data || []);
  };
  const payoutsShowModal = () => {
    setIsModalOpenPayouts(true);
  };
  const handleOkPayouts = async () => {
    navigate("/payouts-over");
    setIsModalOpenPayouts(false);
  };
  const handleCancelPayouts = () => {
    setIsModalOpenPayouts(false);
  };

  const deleteGameShowModal = (id) => {
    setSelectedGameId(id);
    setIsModalDeleteGame(true);
  };
  const handleOkDeleteGame = async () => {
    let data = await deleteGameApi(selectedGameId);
    if (data?.data?.status_code == 200) {
      let data = await getGmGamesApi();

      if (data && data?.status == 200) {
        setGmGames(data?.data?.data || []);
      }
    }
    setIsModalDeleteGame(false);
  };
  const handleCancelDeleteGame = () => {
    setIsModalDeleteGame(false);
  };
  useEffect(() => {
    async function getGmGames() {
      let [data, me] = await Promise.all([getGmGamesApi(), getMeApi()]);
      if (data && data?.status == 200) {
        setGmGames(data?.data?.data || []);
      }
    }
    getGmGames();
  }, []);
  return (
    <>
      <div className="container my-game-card">
        <MenuSettings titleTextInfo={{ title: "My Games", text: "" }} />
        <div className="container mx-900">
          <Space align="end" className="my-game-head">
            <Title level={4} className="secondary-heading text-left">
              My All Games
            </Title>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                if (expressSubmitterDetail) {
                  navigate("/games/create-game");
                } else {
                  payoutsShowModal();
                }
              }}
            >
              Create New Games
            </Button>
          </Space>
          <Row gutter={[16, 16]}>
            {gmGames.length > 0 &&
              gmGames.map((game) => {
                return (
                  <Col xs={24} sm={12} md={8}>
                    <GameComp
                      game={game}
                      edit={true}
                      setGmGames={setGameValue}
                      payoutsShowModal={payoutsShowModal}
                      deleteGameShowModal={deleteGameShowModal}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      <Modal
        title={"Are you sure?"}
        className="payout-modal"
        okText="Go to payouts"
        width={400}
        open={isModalOpenPayouts}
        onOk={handleOkPayouts}
        onCancel={handleCancelPayouts}
      >
        <p>By clicking 'accept', I understand that I will be required to:</p>
      </Modal>
      <Modal
        title={"Deleting game session?"}
        className="payout-modal"
        okText="Delete"
        width={400}
        open={isModalOpenDeleteGame}
        onOk={handleOkDeleteGame}
        onCancel={handleCancelDeleteGame}
      >
        <p>
          By clicking “Delete”, I understand that the game session and all the
          booking will be cancelled.
        </p>
      </Modal>
    </>
  );
};

export default MyGame;
