"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchSignInKey = void 0;

require("core-js/modules/es.promise.js");

const URL = "https://host-api-staging.thangovn.com/api/v1/tvn-sdk-api-keys/signIn";

const fetchSignInKey = async appId => {
  const response = await fetch("".concat(URL, "?app_id=").concat(appId), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      AppPlatform: "Web"
    }
  });
  const result = await response.json();
  return result;
};

exports.fetchSignInKey = fetchSignInKey;