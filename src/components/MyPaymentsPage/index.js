import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Space,
  Table,
  Avatar,
  Spin,
  Modal,
  message,
} from "antd";

import MenuSettings from "../Settings/settingsMenu";
import {
  cancelIntentApi,
  getPaymentsListApi,
} from "../../network/api/otherDetailsApi";
import { useNavigate } from "react-router-dom";

import { CloseCircleOutlined } from "@ant-design/icons";
const { Title, Link } = Typography;

const columns = [
  // {
  //   title: "",
  //   dataIndex: "gm_avatar",
  //   key: "gm_avatar",
  //   width: "10%",
  // },
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

const MyPaymentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [tableInfo, setTableInfo] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadOffset, setLoadOffset] = useState(0);
  const [cancelId, setCancelId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [count, setCount] = useState(0);
  const navigate = useNavigate();

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
      role: "client",
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
                // gm_avatar: (
                //   <Avatar
                //     src={
                //       item?.game?.game_master?.profile_picture ||
                //       "/user_profile.png"
                //     }
                //   />
                // ),
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
                action: item?.status == "pending" && (
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
    LoadMoreTableData(0);
  }, []);

  return (
    <>
      <div className="profile-settings">
        <MenuSettings
          titleTextInfo={{
            title: "Bookings",
            text: "Details about your booked game sessions",
          }}
        />
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
                By clicking 'Cancel Booking', I understand that my booking will
                be cancelled immediately.
              </p>
            </Modal>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default MyPaymentsPage;
