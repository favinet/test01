const moment = require("moment");
const qs = require("qs");
const crypto = require("crypto");

function HmacUtil() {
  this.algorithm = "sha256";
  this.secretKey = "test_secret_key";
  //this.secretKey = "4B45595F4F46465257414C4C5F4F5052";

  this.expiresIn = 2 * 60 * 1000; // 2minutes

  this.hmacDatetime = function () {
    return moment().format("YYYY-MM-DDTHH:mm:ssZ");
  };

  this.alphabeticalSort = function (a, b) {
    return a.localeCompare(b);
  };

  this.sortedQueryString = function (encodedQueryString) {
    let obj = qs.parse(encodedQueryString);
    return qs.stringify(obj, { sort: this.alphabeticalSort });
  };

  this.payloadHash = function (payload) {
    return crypto
      .createHash(this.algorithm)
      .update(payload, "utf8")
      .digest("hex");
  };

  this.stringToSign = function (
    method,
    uri,
    hmacDatetime,
    queryString,
    payload
  ) {
    return (
      method +
      "\n" +
      uri +
      "\n" +
      hmacDatetime +
      "\n" +
      this.sortedQueryString(queryString) +
      "\n" +
      this.payloadHash(payload)
    );
  };

  this.sign = function (stringToSign) {
    rawHmac = crypto
      .createHmac(this.algorithm, this.secretKey)
      .update(stringToSign)
      .digest("hex");
    return Buffer.from(rawHmac).toString("base64");
  };

  this.signature = function (method, uri, hmacDatetime, queryString, payload) {
    return this.sign(
      this.stringToSign(method, uri, hmacDatetime, queryString, payload)
    );
  };

  this.isValid = function (
    method,
    uri,
    hmacDatetime,
    queryString,
    payload,
    signature
  ) {
    let sameSignature =
      this.signature(method, uri, hmacDatetime, queryString, payload) ===
      signature;
    let notExpired = new Date() - new Date(hmacDatetime) < this.expiresIn; // 2.minutes
    return sameSignature && notExpired;
  };
}

/*
method(대문자)    	POST
uri			/api/offerwall/reward
hmacDateTime		2020-06-08T16:56:34+09:00
queryString		(빈값)
payload(raw body)	{"campaign_id":"1","uid":"test_uid","advertising_id":"d2ca81dc-e3bc-4449-aa8b-f7b0f62b76b8","platform":1,"reward":100,"reward_type":0,"ad_name":"테스트 광고명!","repeat_participate_type":0,"click_key":"MTU5MTYwMzA2OTA4ODo-PDp0ZXN0X3VpZDo-PDp1U0hIaE5wOTZQeGpGaDFOUjlRR2NiU0U"}
*/

const hmac = new HmacUtil();

const method = "POST";
const uri = "/app/paybooc/OfrRewdApi.api";
//const uri = "/app/paybooc/OfrRewdApi.api";
const hmacDatetime = hmac.hmacDatetime(); //"2023-07-03T16:58:00+09:00";
const queryString = "";
const uId = "100000135";
//const uId = "106989579";
const trnsUniqNo = moment().valueOf() + "99";
const advNm = encodeURIComponent("[상품보기] 깔자매트");
const campId = "119818";
const payload =
  '{"trnsUniqNo":"' +
  trnsUniqNo +
  '","uId":"' +
  uId +
  '","ctgId":"","campId":"' +
  campId +
  '","advNm":"' +
  advNm +
  '","reqAmt":5,"pltfmDvCd":"2"}';
//const payload =
//  '{"trnsUniqNo":"168792772977500","uId":"100000135","ctgId":"","campId":"7Y+tIDE1Y20g64ST7J2A7Y+tIOyerOu0ieyaqSDssI3ssI3snbTthYzsnbTtlIQg6rKA7KCV7IOJIDHrr7jthLAgLi4=","advNm":"%ED%8F%AD%2015cm%20%EB%84%93%EC%9D%80%ED%8F%AD%20%EC%9E%AC%EB%B4%89%EC%9A%A9%20%EC%B0%8D%EC%B0%8D%EC%9D%B4%ED%85%8C%EC%9D%B4%ED%94%84%20%EA%B2%80%EC%A0%95%EC%83%89%201%EB%AF%B8%ED%84%B0%20%EC%9D%B4%EC%83%81%2C%201%EA%B0%9C","reqAmt":2,"pltfmDvCd":"1"}';
//console.log("payload : " + payload);
const stringToSign = hmac.stringToSign(
  method,
  uri,
  hmacDatetime,
  queryString,
  payload
);
console.log("stringToSign : " + stringToSign);
const signature = hmac.signature(
  method,
  uri,
  hmacDatetime,
  queryString,
  payload
);

console.log("signature : " + signature);
const valid = hmac.isValid(
  method,
  uri,
  hmacDatetime,
  queryString,
  payload,
  signature
);
console.log("isValid : " + valid);
console.log("payload : " + payload);
//console.log(" moment().valueOf() " + moment().valueOf());
//console.log(" moment().format('x') " + moment().format("x"));
//1687927511892+23 = 15자리
//1318781876406
//const
//encodedName = encodeURIComponent(
//  "폭 15cm 넓은폭 재봉용 찍찍이테이프 검정색 1미터 이상, 1개"
//);
//console.log("encodedName : " + encodedName);
module.exports.HmacUtil = HmacUtil;
