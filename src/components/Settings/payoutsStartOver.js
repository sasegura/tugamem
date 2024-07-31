import React, { useEffect, useState } from "react";
import {
  Typography,
  Badge,
  Button,
  Space,
  Modal,
  Spin,
  Table,
  message,
} from "antd";
// import { Link } from "react-router-dom";

import { CloseCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import MenuSettings from "./settingsMenu";
import {
  cancelIntentApi,
  getAccountCreateLinkApi,
  getMeApi,
  getPaymentExpressApi,
  getPaymentsListApi,
} from "../../network/api/otherDetailsApi";

import { useNavigate } from "react-router-dom";

const { Title, Link } = Typography;
const columns = [
  {
    title: "Game Master",
    dataIndex: "gm_email",
    key: "gm_email",
  },
  {
    title: "Game",
    dataIndex: "game_title",
    key: "game_title",
  },

  {
    title: "Client",
    dataIndex: "client",
    key: "client",
  },
  {
    title: "Session Date",
    dataIndex: "session_date",
    key: "session_date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

const PayoutStartOver = () => {
  const expressSubmitterDetail = useSelector(
    (state) => state.authUser?.gmInfo?.express_details_submitted
  );

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [accountLinkInfo, setAccountLinkInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [tableInfo, setTableInfo] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadOffset, setLoadOffset] = useState(0);
  const [cancelId, setCancelId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = async () => {
    let data = await getAccountCreateLinkApi();
    if (data?.data?.status_code == 200) {
      data?.data?.data?.url && window.open(data?.data?.data?.url, "_blank");
    }
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  const paymentOnStrip = async () => {
    let data = await getPaymentExpressApi();
    if (data?.data?.status_code == 200) {
      data?.data?.data?.login_url &&
        window.open(data?.data?.data?.login_url, "_blank");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (e) => {
    if (cancelId) {
      setLoading(true);
      let data = await cancelIntentApi(cancelId);
      if (data?.data?.status_code == 200) {
        await LoadMoreTableData(loadOffset);
        message.success(data?.data?.message);
      }
      setLoading(false);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const cancelPaymentIntent = async (id) => {
    showModal();
    setCancelId(id);
  };

  const LoadMoreTableData = async (offsetValue) => {
    setLoading(true);
    setLoadOffset(offsetValue);
    let data = await getPaymentsListApi({
      offset: offsetValue,
      role: "game_master",
    });

    if (data?.data?.status_code == 200) {
      let tableData;
      tableData =
        data?.data?.data?.results?.length > 0
          ? data?.data?.data?.results?.map((item, index) => {
            return {
              key: index,
              game_title: item?.game?.title && (
                <Link
                  onClick={() => {
                    navigate(`/game/${item?.game?.id}`);
                  }}
                >
                  {item?.game?.title}
                </Link>
              ),
              gm_email: item?.game?.game_master?.user && (
                <Link
                  onClick={() => {
                    navigate(`/game-master/${item?.game?.game_master?.id}`);
                  }}
                >
                  {item?.game?.game_master?.user}
                </Link>
              ),
              client: item?.client || "",
              status: item?.status || "",
              session_date: item?.game?.date || "",
              action: !(
                item?.status == "canceled" || item?.status == "refunded"
              ) && (
                  <Link
                    style={{}}
                    onClick={() => {
                      cancelPaymentIntent(item?.id);
                    }}
                  >
                    <CloseCircleOutlined />
                  </Link>
                ),
            };
          })
          : [];
      setCount(data?.data?.data?.count);
      setTableInfo(tableData);
      if (data?.data?.data?.count > offset + 10) {
        setOffset(offset + 10);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    async function getMe() {
      let data = await getMeApi();
      LoadMoreTableData(0);
    }
    getMe();
  }, []);

  return (
    <>
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Payout Profile",
            text: "Details about your stripe payouts with us",
          }}
        />

        <div className="forms-wrapper payouts-wrap">
          {expressSubmitterDetail ? (
            <>
              <div>
                <div>
                  <Button onClick={paymentOnStrip} size="large" type="primary">
                    Ver pagos y cobros en Stripe
                  </Button>
                </div>
                {/* <div>
                  <Title level={4}>Your Balance</Title>
                  <Title level={3}>$0.00</Title>
                  <p className="availble-text">$0.00 Availble</p>
                </div> */}
                <div className="balance-payout">
                  {/* <Button size="large" disabled type="primary">
                    Payout Out Now
                  </Button> */}
                  {/* <Link onClick={paymentOnStrip}>View Payouts on Strip</Link> */}
                </div>
              </div>

              <div className="forms-wrapper payouts-wrap balance-wrap">
                <Spin spinning={loading}>
                  {tableInfo && count > 0 && (
                    <Table
                      className="balance-table"
                      dataSource={tableInfo || []}
                      columns={columns}
                      pagination={{
                        defaultCurrent: 1,
                        pageSize: 10,
                        total: count,
                        onChange: (data) => {
                          LoadMoreTableData((data - 1) * 10);
                        },
                      }}
                    />
                  )}
                  <Modal
                    title={"Are you sure?"}
                    className="payout-modal"
                    okText="Cancel Booking"
                    width={400}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>
                      Al hacer click en 'Cancelar reserva', entiendo que mi reserva se cancelará inmediatamente.
                    </p>
                  </Modal>
                </Spin>
              </div>
            </>
          ) : (
            <>
              <Title level={4}>Completar tu perfil de pagos y cobros</Title>
              <ul className="payout-listing">
                <li>
                  <Badge count={1} size="large" color="#faad14" />
                  Verificar identidad con Stripe
                </li>
                <li>
                  {" "}
                  <Badge count={2} color="#faad14" />
                  Añadir datos bancarios
                </li>
              </ul>
              <Space className="payout-btn-wrap">
                <Button type="primary" onClick={showModal2}>
                  Verificar con Stripe
                </Button>
                {/* <Button type="link">Start Over</Button> */}
              </Space>
            </>
          )}
        </div>
      </div>
      <Modal
        title="Para continuar"
        className="payout-modal"
        okText="Accept"
        width={400}
        open={isModalOpen2}
        onOk={handleOk2}
        onCancel={handleCancel2}
      >
        <p>Al hacer click en 'aceptar', entiendo que necesitaré:</p>
        <ul>
          <li>Crear un perfil de pagos y cobros</li>
          <li>Añadir mis datos bancarios</li>
        </ul>
        <p>
          Nota: If you have pending payouts, they will continue to be sent to
          the previously added bank account.
        </p>
      </Modal>
    </>
  );
};

export default PayoutStartOver;
