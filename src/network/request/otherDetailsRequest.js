import K from "../../constants";
import Request from ".";

export default class OtherDetailsRequest extends Request {
  constructor(params) {
    super(params);
  }

  static getLanguageRequest() {
    return new Request(
      K.Network.URL.LanguageCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }

  static profileImageRequest() {
    return new Request(
      K.Network.URL.ProfileImageCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getCountriesRequest() {
    return new Request(
      K.Network.URL.CountryCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static maxCostDurRequest() {
    return new Request(
      K.Network.URL.MaxCostDurCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getTimeZonesRequest() {
    return new Request(
      K.Network.URL.TimeZoneCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getGameListRequest() {
    return new Request(
      K.Network.URL.GameListCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getGmPulicRequest(gmId) {
    // 24/public-get/
    return new Request(
      K.Network.URL.GetGmPublicApi + `${gmId}/public-get/`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getGmGamesPulicRequest(req) {
    // 24/public-get/
    return new Request(
      K.Network.URL.GetGmGamesApi +
        `?limit=3&offset=${req?.offset}&page=0&game_master__id=${req?.gmId}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }

  static getFindGamesPulicRequest(req) {
    // 24/public-get/
    return new Request(
      K.Network.URL.GetGmGamesApi +
        `?limit=4&offset=${req?.offset}&page=0${
          req?.durationRange[0] == 0 && req?.durationRange[1] == 0
            ? ""
            : "&min_duration=" +
              req?.durationRange[0] +
              "&max_duration=" +
              req?.durationRange[1]
        }${req?.date ? "&date=" + req?.date : ""}${
          req?.costRange[0] == 0 && req?.costRange[1] == 0
            ? ""
            : "&min_cost=" +
              req?.costRange[0] +
              "&max_cost=" +
              req?.costRange[1]
        }${req?.experience ? "&required_experience=" + req?.experience : ""}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getBlogListRequest(req) {
    // 24/public-get/
    return new Request(
      K.Network.URL.GetBlogListCall + `?limit=4&offset=${req?.offset}&page=0`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getFindGMPulicRequest(req) {
    // 24/public-get/
    return new Request(
      K.Network.URL.GetGMPublicCall +
        `?limit=4&offset=${req?.offset}&page=0${
          req?.language ? "&language=" + encodeURI(req?.language) : ""
        }${req?.search ? "&name=" + encodeURI(req?.search) : ""}`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getMeRequest(token) {
    return new Request(
      K.Network.URL.GetMeCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      token
    );
  }
  static getHomeRequest() {
    return new Request(
      K.Network.URL.HomeCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getSingleBlogRequest(id) {
    return new Request(
      K.Network.URL.GetBlogListCall + `${id?.id}/public-blog-get/`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getGmGamesRequest() {
    return new Request(
      K.Network.URL.HomeCall,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
      // token
    );
  }
  static getGameRequest(id) {
    return new Request(
      K.Network.URL.GetGameCall + `/${id?.id}/`,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
}
