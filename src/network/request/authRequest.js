import K from "../../constants";
import Request from ".";
export default class AuthReqest extends Request {
  constructor(params) {
    super(params);
  }

  static getLoginRequest(reqbody) {
    return new Request(
      K.Network.URL.LoginCall,
      K.Network.Method.POST,
      reqbody,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static googleAuthRequest(reqbody) {
    return new Request(
      K.Network.URL.GoogleAuthCall,
      K.Network.Method.POST,
      reqbody,
      K.Network.Header.Type.Json,
      {}
    );
  }
  static getSignupRequest(reqbody) {
    return new Request(
      K.Network.URL.SignupCall,
      K.Network.Method.POST,
      reqbody,
      K.Network.Header.Type.Json,
      {}
    );
  }
}
