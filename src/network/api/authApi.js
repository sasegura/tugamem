import { store } from "../../store";
import {
  setAuthTokens,
  setGmInfo,
  setLoginUser,
  setUserInfo,
} from "../../store/slices/authUser";
import { getCookie } from "../../utils/utils";
import NetworkCall from "../networkCall";
import AuthReqest from "../request/authRequest";
import { message } from "antd";
import axios from "axios";
export const loginApi = async (reqBody) => {
  try {
    let data = await NetworkCall.fetch(
      AuthReqest.getLoginRequest(reqBody),
      false
    );
    document.cookie = `accessToken=${data.access_token}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
    document.cookie = `refreshToken=${data.refresh_token}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;

    let token = data?.access_token;
    let data2 = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/users/me/`,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    let gm = data2?.data?.data;
    const { user_game_master, ...modifiedGMObject } = gm;
    let authInfo = {
      id: data2?.data?.data?.id,
      refreshToken: data.refresh_token,
      accessToken: data.access_token,
      user: modifiedGMObject || {},
      gmInfo: data2?.data?.data?.user_game_master,
    };
    store.dispatch(setLoginUser(authInfo));
    return data;
  } catch (error) {
    message.error(error?.error?.data?.error_description);
    return error;
  }
};

export const googleAuthApi = async (reqBody) => {
  try {
    let data = await NetworkCall.fetch(
      AuthReqest.googleAuthRequest(reqBody),
      false
    );
    document.cookie = `accessToken=${data.access_token}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
    document.cookie = `refreshToken=${data.refresh_token}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
    let token = data?.access_token;
    let data2 = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/users/me/`,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    let gm = data2?.data?.data;

    const { user_game_master, ...modifiedGMObject } = gm;
    let authInfo = {
      id: data2?.data?.data?.id,
      refreshToken: data.refresh_token,
      accessToken: data.access_token,
      user: modifiedGMObject || {},
      gmInfo: data2?.data?.data?.user_game_master,
    };
    store.dispatch(setLoginUser(authInfo));
    return data;
  } catch (error) {
    message.error(error?.error?.data?.detail);
    return error;
  }
};

export const signupApi = async (reqBody) => {
  try {
    let data = await NetworkCall.fetch(
      AuthReqest.getSignupRequest(reqBody),
      false
    );
    return data;
  } catch (error) {
    return error;
  }
};
export const changePasswordApi = async (reqBody) => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser?.accessToken || getCookie("accessToken");

    data = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}api/users/update-password/`,
      reqBody,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    message.success(data?.data?.message);
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return null;
  }
};

export const deleteAccountApi = async (reqBody) => {
  try {
    let token;
    let data;
    let state = await store.getState();

    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");

    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/users/delete/`,
      reqBody,
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
    // message.error(error?.response?.data?.message)
    return null;
  }
};

export const getRefresfTokenApi = async () => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.refreshToken || getCookie("refreshToken");

    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/auth/token`,
      {
        grant_type: "refresh_token",
        refresh_token: token,
        client_secret: "secret",
        client_id: "client",
      },
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
    document.cookie = `accessToken=${data?.data?.access_token}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;
    document.cookie = `refreshToken=${data?.data.refresh_token}; expires=Thu, 18 Dec 2030 12:00:00 UTC; path=/`;

    store.dispatch(
      setAuthTokens({
        refreshToken: data?.data.refresh_token,
        accessToken: data?.data.access_token,
      })
    );

    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.error);
    return error?.response;
    // message.error(error?.response?.data?.message);
    // return null;
  }
};

export const updateUserProApi = async (reqBody) => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.user.id;
    data = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}api/users/${id}/`,
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
      store.dispatch(setUserInfo(data?.data?.data || {}));
      message.success("update profile");
    }
    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return null;
  }
};
export const getGmMeApi = async () => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/game-masters/${id}/`,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (data?.data?.status_code == 200) {
      store.dispatch(setGmInfo(data?.data?.data || {}));
      // message.success("update profile");
    }
    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.detail);
    return null;
  }
};

export const becomeaGmApi = async () => {
  try {
    let token;
    let data;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/game-masters/become-game-master/`,
      {},
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (data?.data?.status_code == 400) {
      message.error(data?.data?.message);
      return { status_code: data?.data?.status_code };
    }
    let data2 = await axios.get(
      `${process.env.REACT_APP_BASE_URL}api/users/me/`,
      {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    let gm = data2?.data?.data;
    const { user_game_master, ...modifiedGMObject } = gm;
    let authInfo = {
      id: data2?.data?.data?.id,
      accessToken: data.access_token,
      user: modifiedGMObject || {},
      gmInfo: data2?.data?.data?.user_game_master,
    };
    store.dispatch(setLoginUser(authInfo));
    message.success(data?.data?.message);
    return { status_code: data?.data?.status_code };
  } catch (error) {
    message.error(error?.response?.data?.message);
    return null;
  }
};

export const updateGmProApi = async (reqBody) => {
  try {
    let token;
    let data;
    let id;
    let state = await store.getState();
    const { authUser } = state;
    token = authUser.accessToken || getCookie("accessToken");
    id = authUser.gmInfo.id;
    data = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}api/game-masters/${id}/`,
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
      store.dispatch(setGmInfo(data?.data?.data || {}));
      message.success("update Game Master profile suceessfully");
    }
    // message.success(data?.data?.message)
    return data;
  } catch (error) {
    message.error(error?.response?.data?.message);
    return error?.response;
  }
};
