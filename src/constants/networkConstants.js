const BaseGameUrl = process.env.REACT_APP_BASE_URL;

const NetworkConstants = {
  URL: {
    Base: process.env.REACT_APP_BASE_URL,
    BaseAPI: process.env.REACT_APP_BASE_API_URL,
    // BaseAPI: "https://reqres.in",
    Timeout: process.env.REACT_APP_TIMEOUT,
    GETMOCK: "https://jsonplaceholder.typicode.com/todos",
    LoginCall: `${BaseGameUrl}api/auth/token`,
    GoogleAuthCall: `${BaseGameUrl}api/auth/convert-token/`,
    SignupCall: `${BaseGameUrl}api/users/`,
    LanguageCall: `${BaseGameUrl}api/utils/language/`,
    CountryCall: `${BaseGameUrl}api/utils/country/`,
    MaxCostDurCall: `${BaseGameUrl}api/games/max-cost-duration/`,
    GameListCall: `${BaseGameUrl}api/utils/site-game/`,
    TimeZoneCall: `${BaseGameUrl}api/utils/time-zone/`,
    GetMeCall: `${BaseGameUrl}api/users/me/`,
    HomeCall: `${BaseGameUrl}api/home/home/`,
    GetGameCall: `${BaseGameUrl}api/games`,
    ProfileImageCall: `${BaseGameUrl}api/users/profile-picture/`,
    GetGmPublicApi: `${BaseGameUrl}api/game-masters/`,
    GetGmGamesApi: `${BaseGameUrl}api/games/public-list/`,
    GetGMPublicCall: `${BaseGameUrl}api/game-masters/public-list/`,
    GetBlogListCall: `${BaseGameUrl}api/blogs/`,

    // GETMOCK: `${BaseGameUrl}/typicode.com/todos`,

    // User
    //   LoginUser: "/login",
  },
  Method: {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
  },
  Header: {
    ContentType: "Content-Type",
    ApplicationJson: "application/json",
    Default: (token = "") => ({
      "Content-Type": "application/json",
      Accept: "application/json",
      //  Authorization: "Bearer " + token,
    }),
    Authorization: (token = "") => ({
      Authorization: "Bearer " + token,
    }),
    Type: {
      Json: "json",
      File: "file",
    },
  },
  Default: {
    Error: "Opps, an error occurred!",
  },
  StatusCode: {
    Unauthorized: 401,
    Invalid: 401,
    NotFound: 404,
  },
};
export default NetworkConstants;
