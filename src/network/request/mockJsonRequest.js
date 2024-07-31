import K from "../../constants";
import Request from ".";

import { store } from "../../store";

export default class MockRequest extends Request {
  constructor(params) {
    super(params);
  }

  static getData() {
    return new Request(
      K.Network.URL.GETMOCK,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {}
    );
  }
}
