import { store } from "../../store";
import { setUserInfo } from "../../store/slices/authUser";
import { setHomeInfo } from "../../store/slices/homedetails";
import NetworkCall from "../networkCall";
import { message } from "antd";
import OtherDetailsRequest from "../request/otherDetailsRequest";
import axios from "axios";
import {
  setCountries,
  setGameList,
  setLanguages,
  setTimezones,
} from "../../store/slices/otherDetails";
import { getCookie } from "../../utils/utils";
export const lauguagesApi = async () => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getLanguageRequest(),
      false
    );
    store.dispatch(setLanguages(data?.data || []));
    return data;
  } catch (error) {
    // message.error(error.error.data.detail)
    return error;
  }
};
export const maxCostDurApi = async () => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.maxCostDurRequest(),
      false
    );
    return data;
  } catch (error) {
    message.error(error?.error?.data?.detail);
    return error;
  }
};
export const countriesApi = async () => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getCountriesRequest(),
      false
    );
    store.dispatch(setCountries(data?.data || []));
    return data;
  } catch (error) {
    message.error(error?.error?.data?.detail);
    return error;
  }
};
export const timeZonesApi = async () => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getTimeZonesRequest(),
      false
    );
    store.dispatch(setTimezones(data?.data || []));

    return data;
  } catch (error) {
    message.error(error?.error?.data?.detail);
    return error;
  }
};
export const gameListApi = async () => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getGameListRequest(),
      false
    );
    store.dispatch(setGameList(data?.data || []));
    return data;
  } catch (error) {
    message.error(error?.error?.data?.detail);
    return null;
  }
};
export const getGmPublicApi = async (gmId) => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getGmPulicRequest(gmId),
      false
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};
export const getGmGamesPublicApi = async (req) => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getGmGamesPulicRequest(req),
      false
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};
export const getFindGamesPublicApi = async (req) => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getFindGamesPulicRequest(req),
      false
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};
export const getBlogsListApi = async (req) => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getBlogListRequest(req),
      false
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};
export const getFindGMPublicApi = async (req) => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getFindGMPulicRequest(req),
      false
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};

export const getUserChatsApi = async (req) => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/chats/?limit=${req?.limit}&offset=${
        req?.offset
      }${req?.searchValue ? "&user_name=" + req?.searchValue : ""}`,

      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return error;
  }
};

export const chatExistApi = async ({ gmId }) => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/chats/chat-exist/`,
      {
        gm_id: gmId,
      },
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};

export const createChatsApi = async (req) => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/chats/`,
      {
        gm: req.gm,
      },
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};

export const getRoomChateApi = async (req) => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/chats/${req?.id}/chat-messages/?limit=${req?.limit}&offset=${req?.offset}`,

      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};
export const sendMsgApi = async (req) => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/chats/${req?.id}/message-create/`,
      {
        text: req?.sendMsg || "",
        attachments: [],
      },

      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    // message.error(error?.error?.data?.detail);
    return error;
  }
};

export const getMeApi = async () => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.get(`${process.env.REACT_APP_BASE_URL}api/users/me/`, {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    store.dispatch(setUserInfo(data?.data?.data || {}));
    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return null;
  }
};

export const getAccountCreateLinkApi = async () => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/payments/create-account-link/`,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return null;
  }
};
export const getPaymentExpressApi = async () => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/payments/express-login/`,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return null;
  }
};
export const getPaymentsListApi = async ({ offset, role }) => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/payments/?limit=10&offset=${offset}&page=0&role_type=${role}`,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return null;
  }
};

export const cancelIntentApi = async (id) => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}api/payments/${id}/cancel-payment-intent/`,
      {},

      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return null;
  }
};

export const confirmIntentApi = async (req) => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/games/${req?.game_id}/create-confirm-intent/`,
      {
        payment_method_id: req?.payment_method_id,
      },
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("error from api ", error);
    message.error(error?.response?.data?.message);
    return null;
  }
};

export const getPaymentMethods = async () => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/users/user-payment-methods/`,

      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return error?.response;
  }
};

export const confirmPaymentApi = async (req) => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/payments/create-payment-intent/`,
      {
        payment_method_id: req?.payment_method_id,
        game: req?.game_id,
      },
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error?.response;
  }
};

export const paymentSheetApi = async ({ id }) => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/games/${id}/payment-sheet/`,
      {},
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("data =>> ", data);
    // store.dispatch(setUserInfo(data?.data?.data || {}));
    return data;
  } catch (error) {
    message.error(error?.error?.data?.detail);
    return null;
  }
};

export const homeApi = async () => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getHomeRequest(),
      false
    );
    let homeInfo = {
      blogs: data?.data?.blogs || [],
      games: data?.data?.games || [],
      game_masters: data?.data?.game_masters || [],
    };
    store.dispatch(setHomeInfo(homeInfo));

    return data?.data;
  } catch (error) {
    // message.error(error.error.data.detail)
    return null;
  }
};
export const singleBlogApi = async (id) => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getSingleBlogRequest(id),
      false
    );
    return data;
  } catch (error) {
    // message.error(error.error.data.detail)
    return null;
  }
};
export const getGmGamesApi = async () => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/games/`,

      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return error?.response;
  }
};
export const getGameDataApi = async (id) => {
  try {
    let data = await NetworkCall.fetch(
      OtherDetailsRequest.getGameRequest(id),
      false
    );

    return data;
  } catch (error) {
    // message.error(error.error.data.detail)
    return null;
  }
};

export const createGameApi = async (reqBody) => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/games/`,
      reqBody,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data?.data?.status_code == 200) {
      message.success("Game Created suceessfully");
    }
    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error?.response;
  }
};

export const updateGameApi = async (reqBody, gameid) => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    data = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}api/games/${gameid}/`,
      reqBody,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data?.data?.status_code == 200) {
      message.success("Game Updated suceessfully");
    }
    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error;
  }
};

export const deleteGameApi = async (gameid) => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");

    data = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}api/games/${gameid}/`,

      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data?.data?.status_code == 200) {
      message.success("Game deleted suceessfully");
    }
    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error;
  }
};

export const profileImageApi = async (formData) => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/users/user-profile-picture/`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data?.data?.status_code == 200) {
      message.success(data?.data?.message);
    }
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error?.response;
  }
};
export const coverImageApi = async (formData) => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/users/user-poster-picture/`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data?.data?.status_code == 200) {
      message.success(data?.data?.message);
    }
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error?.response;
  }
};
export const gameImageApi = async (formData) => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/games/upload-image/`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data?.data?.status_code == 200) {
      // message.success(data?.data?.message);
    }
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error?.response;
  }
};
