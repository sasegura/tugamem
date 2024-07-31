import React, { useEffect, useState } from "react";
import { Typography, Tabs, Table, Button, message } from "antd";
import { CalendarOutlined, LikeFilled } from "@ant-design/icons";
import GamePaymentMain from "../Settings/Payments/GamePaymentMain";
import {
  confirmPaymentApi,
  getGameDataApi,
  getPaymentMethods,
} from "../../network/api/otherDetailsApi";
import { useParams } from "react-router-dom";
import GameComp from "../HomePage/gameComp";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph } = Typography;

const StripeIntegration = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [payMethods, setPayMethods] = useState([]);
  const [selectedPayMethod, setSelectedPayMethods] = useState(null);
  const [gameInfo, setGameInfo] = useState(null);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedPayMethods(selectedRows[0] || null);
    },
  };

  console.log(selectedPayMethod);
  // const dataSource = [
  //   {
  //     key: "1",
  //     days: "Ending in 4410",
  //     brand: "Visa",
  //     expire: "Expires in 04/2028",
  //   },
  //   {
  //     key: "2",
  //     days: "Ending in 2110",
  //     brand: "Master",
  //     expire: "Expires in 02/2029",
  //   },
  // ];

  const columns = [
    {
      title: "Days",
      dataIndex: "last4",
      key: "last4",
    },
    {
      title: "brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Expires",
      dataIndex: "exp_year",
      key: "exp_year",
    },
  ];

  const items = [
    {
      key: "1",
      label: "Choose Payment Method",
      children: (
        <>
          <Title level={3}>
            {payMethods?.length > 0
              ? "Paying with Card"
              : "There are no cards saved, please create a new one."}
          </Title>
          {payMethods?.length > 0 && (
            <>
              <Table
                className="paying-with-card"
                rowSelection={{
                  type: "radio",
                  ...rowSelection,
                }}
                dataSource={payMethods || []}
                pagination={false}
                columns={columns}
                // onRow={(record, rowIndex) => {
                //   return {
                //     onClick: () => {
                //       setSelectedPayMethods(record);
                //     },
                //   };
                // }}
              />
              <div className="paying-btn-wrap">
                <Button
                  onClick={async () => {
                    if (selectedPayMethod) {
                      let confirmPayment = await confirmPaymentApi({
                        payment_method_id: selectedPayMethod?.payment_method_id,
                        game_id: id,
                      });
                      if (confirmPayment?.data?.status_code == 201) {
                        message.success(confirmPayment?.data?.message);
                        navigate("/my-payments");
                      }
                    }
                  }}
                  type="primary"
                  className="see-all-btn"
                  size="large"
                  // disabled={!selectedPayMethod}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Create New Payment Method",
      children: <GamePaymentMain />,
    },
  ];

  const getPaymentDate = (paymentDate) => {
    const parsedDate = dayjs(paymentDate);
    const formattedDate = parsedDate.format("ddd, MMM D, YYYY, h:mm A");
    return formattedDate;
  };

  useEffect(() => {
    async function getGameData() {
      let data = await getPaymentMethods();
      if (data?.data?.status_code == 200) {
        let paymethods =
          data?.data?.data?.length > 0
            ? data?.data?.data?.map((data, index) => {
                return { key: index, ...data };
              })
            : [];
        setPayMethods(paymethods || []);
      }
      let gamedata = await getGameDataApi({ id });
      if (gamedata?.status_code == 200) {
        setGameInfo(gamedata?.data);
      }
    }
    getGameData();
  }, []);

  return (
    <>
      <div className="stripe-wrap">
        <div className="container">
          <div className="price-detail-card">
            {gameInfo && <GameComp game={gameInfo} />}
            <div className="price-detail">
              <Title level={3}>Price Details</Title>
              <ul>
                <li>
                  Session <span>{gameInfo?.cost || ""} eur</span>
                </li>
                <li>
                  Service Fee<span>1 eur</span>
                </li>
                <li>
                  Total
                  <span>
                    {gameInfo?.cost ? +(+gameInfo?.cost + 1) : ""} eur
                  </span>
                </li>
              </ul>
              <Paragraph className="session-text">
                You will not be charged yet. You will be charged at the start of
                the session on{" "}
                {gameInfo?.date && getPaymentDate(gameInfo?.date)}.
              </Paragraph>
            </div>
          </div>
          <div className="refund-policy-box">
            <Title level={3}>Cancellation/Refund Policy</Title>
            <ul>
              <li>
                You can skip a session and/or leave a campaign/one-shot, without
                penalty, up to 24 hours before the start of the session. After
                that time, you will no longer be able to leave the
                campaign/one-shot or skip the session.
              </li>
              <li>
                If you need to skip a session or want to leave the
                campaign/one-shot less than 24 hours before the start of the
                session, you will need to reach out to your GM to request a
                session skip or to be removed from the{" "}
                <span className="campaign-text">Campaign.</span>
              </li>
              <li>All refunds are given as player credit.</li>
            </ul>
          </div>
          <Tabs className="payment-tabs" defaultActiveKey="1" items={items} />
        </div>
      </div>
    </>
  );
};
export default StripeIntegration;
