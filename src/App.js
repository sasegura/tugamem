import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import MainLayout from "./layout/mainLayout";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Settings from "./pages/settings";
import PersonalProfile from "./pages/personalProfile";
import ChangePassword from "./pages/changePassword";
import DeleteAccount from "./pages/deleteAccount";
import GamerMasterProfile from "./pages/gameMasterProfile";
import SingleGame from "./pages/singleGame";
import CreateGameForm from "./pages/createGame";
import MYGamePage from "./pages/myGames";
import SingleGmPage from "./pages/singleGameMaster";
import SingleBlogPost from "./pages/SinglePostPage";
import PayoutPage from "./pages/payouts";
import PayoutOverPage from "./pages/payoutOverPage";
import MyPayments from "./pages/MyPayments";

import FindGames from "./pages/findGames";
import AppChat from "./components/AppChat";
import "./assets/scss/styles.scss";
import React, { useEffect, useState } from "react";
import Protected from "./protectedRoutes";
import UpdateGame from "./pages/updateGame";
import FindGM from "./pages/FindGM";
import BlogPostPpage from "./pages/BlogPost";
// import Payments from "./pages/payment";
// import PaymentStatus from "./pages/paymentStatus";
import StripePage from "./pages/StripeIntegraionPage";
import GamePayment from "./pages/GamePayment";
import GameSessions from "./pages/GameSessions";
import DashBoard from "./pages/DashBoard";
import { useSelector, useDispatch } from "react-redux";
import { getRefresfTokenApi } from "./network/api/authApi";
import { getCookie } from "./utils/utils";
import { setSignOut } from "./store/slices/authUser";

function App() {
  let { refreshToken, isAuth } = useSelector((state) => ({
    refreshToken: state?.authUser?.refreshToken,
    isAuth: state?.authUser?.authenticate,
  }));
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getTokenInitial() {
      if (refreshToken || getCookie("refreshToken")) {
        let res = await getRefresfTokenApi();
        if (res?.status != 200) {
          dispatch(setSignOut());
          document.cookie =
            "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie =
            "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        res && setLoading(false);
      } else {
        setLoading(false);
      }
    }
    getTokenInitial();
  }, []);

  return (
    <>
      <div className="App">
        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main-layout" element={<MainLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<Protected />}>
              <Route path="/settings" element={<Settings />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/personal-profile" element={<PersonalProfile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/delete-account" element={<DeleteAccount />} />
              <Route path="/game-master" element={<GamerMasterProfile />} />

              <Route path="/games">
                <Route index element={<MYGamePage />} />
                <Route path="update/:id" element={<UpdateGame />} />
                <Route path="create-game" element={<CreateGameForm />} />
              </Route>

              <Route path="/game-payment/:id" element={<GamePayment />} />

              {/* <Route path="/game-payment2/:id" element={<GamePaymentOld />} /> */}

              <Route path="my-game-sessions" element={<GameSessions />} />
              {/* <Route path="/payouts/" element={<PayoutPage />} /> */}
              <Route path="/payouts-over/" element={<PayoutOverPage />} />
              <Route path="/my-payments" element={<MyPayments />} />
            </Route>

            <Route path="/find-games" element={<FindGames />} />

            <Route path="/game/:id" element={<SingleGame />} />

            <Route path="/find-game-master" element={<FindGM />} />
            <Route path="/chats" element={<AppChat />} />
            <Route path="/game-master/:id" element={<SingleGmPage />} />
            <Route path="/payouts/" element={<PayoutPage />} />
            <Route path="/payouts-over/" element={<PayoutOverPage />} />
            <Route path="/stripe-page/" element={<StripePage />} />

            <Route path="/blog-post">
              <Route index element={<BlogPostPpage />} />
              <Route path=":id" element={<SingleBlogPost />} />
            </Route>

            {/* </Route> */}
          </Routes>
        )}
      </div>
    </>
  );
}

export default App;
