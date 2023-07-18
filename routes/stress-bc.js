// get the client
var Random = require("random-js").Random;
const mysql = require("mysql2/promise");
const { HmacUtil } = require("./hmac");
const moment = require("moment");
const request = require("request");
var async = require("async");

const TEST_ASYNC_COUNT = 1;
const TEST_DOMAIN = "https://isrnd.bccard.com:34443";
//const TEST_IDS = ["100000135", "100000974", "100000137"];
const TEST_IDS = [
  "000000002",
  "000000011",
  "100000001",
  "100000054",
  "100000055",
  "100000056",
  "100000057",
  "100000058",
  "100000059",
  "100000060",
  "100000062",
  "100000063",
  "100000064",
  "100000069",
  "100000070",
  "100000071",
  "100000072",
  "100000073",
  "100000074",
  "100000076",
  "100000079",
  "100000080",
  "100000083",
  "100000085",
  "100000129",
  "100000131",
  "100000133",
  "100000135",
  "100000136",
  "100000137",
  "100000148",
  "100000149",
  "100000151",
  "100000152",
  "100000154",
  "100000155",
  "100000158",
  "100000161",
  "100000162",
  "100000164",
  "100000169",
  "100000171",
  "100000172",
  "100000210",
  "100000211",
  "100000212",
  "100000213",
  "100000214",
  "100000234",
  "100000247",
  "100000263",
  "100000264",
  "100000266",
  "100000282",
  "100000285",
  "100000306",
  "100000355",
  "100000360",
  "100000374",
  "100000382",
  "100000388",
  "100000409",
  "100000411",
  "100000412",
  "100000413",
  "100000414",
  "100000415",
  "100000416",
  "100000417",
  "100000418",
  "100000420",
  "100000421",
  "100000428",
  "100000429",
  "100000430",
  "100000431",
  "100000432",
  "100000433",
  "100000434",
  "100000435",
  "100000437",
  "100000439",
  "100000440",
  "100000441",
  "100000444",
  "100000445",
  "100000446",
  "100000447",
  "100000448",
  "100000449",
  "100000450",
  "100000451",
  "100000452",
  "100000453",
  "100000454",
  "100000456",
  "100000506",
  "100000509",
  "100000510",
  "100000511",
  "100000512",
  "100000513",
  "100000514",
  "100000515",
  "100000516",
  "100000517",
  "100000518",
  "100000519",
  "100000520",
  "100000521",
  "100000522",
  "100000523",
  "100000524",
  "100000525",
  "100000526",
  "100000527",
  "100000528",
  "100000529",
  "100000530",
  "100000506",
  "100000509",
  "100000510",
  "100000511",
  "100000512",
  "100000513",
  "100000514",
  "100000515",
  "100000516",
  "100000517",
  "100000518",
  "100000519",
  "100000520",
  "100000521",
  "100000522",
  "100000523",
  "100000524",
  "100000525",
  "100000526",
  "100000527",
  "100000528",
  "100000529",
  "100000530",
];
const TEST_URI = "/app/paybooc/OfrRewdApi.api";
const TEST_METHOD = "POST";
const TEST_QUERYSTRING = "";

function requestStress(stress, callback) {
  let headers = {};
  headers["Content-Type"] = "application/json";
  headers["X-Hmac-Datetime"] = stress.hmacDatetime;
  headers["X-Hmac-Signature"] = stress.hmacSignature;

  request(
    {
      method: TEST_METHOD,
      uri: TEST_DOMAIN + TEST_URI,
      headers: headers,
      body: stress.payload,
    },
    function (err, response, body) {
      //!err && response.statusCode == 200
      if (!err) {
        try {
          const body = JSON.parse(response.body);
          console.log(
            response.statusCode + "," + body.code + "," + body.message
          );
        } catch (err) {
          console.log("-888,-888," + response.body);
        }
        //console.log("response.statusCode : " + response.statusCode);
        //console.log("response.body : " + response.body);
      } else {
        console.log("-999,-999," + error.toString());
      }
      callback(null, !err);
    }
  );
}

const db = async () => {
  try {
    // create the connection to database
    let connection = await mysql.createConnection({
      host: "34.64.182.227",
      user: "runcomm",
      password: "vkqlspt0721^@",
      database: "touchad_renewal",
    });
    const [res] = await connection.query(
      "select " +
        "cd as campId, " +
        "title as advNm, " +
        "point_amt as reqAmt, " +
        "CASE WHEN 'I' THEN '2' WHEN 'A' THEN '1' ELSE '3' END as pltfmDvCd " +
        "from tb_advertise " +
        "where " +
        "cat = 'C' " +
        "ORDER BY RAND() LIMIT " +
        TEST_ASYNC_COUNT
    );
    //console.log(res);
    let stressList = [];
    for (let i = 0; i < res.length; i++) {
      const random = new Random();
      const randomId = random.string(2, "0123456789");
      const randomSeq = random.integer(0, TEST_IDS.length - 1);
      const adv = res[i];
      const hmac = new HmacUtil();
      const hmacDatetime = hmac.hmacDatetime(); //"2023-07-03T16:58:00+09:00";
      const uId = TEST_IDS[randomSeq];
      const trnsUniqNo = moment().valueOf() + randomId;
      const advNm = encodeURIComponent(adv.advNm);
      const campId = adv.campId;
      const reqAmt = adv.reqAmt;
      const pltfmDvCd = adv.pltfmDvCd;
      const method = TEST_METHOD;
      const uri = TEST_URI;
      const queryString = TEST_QUERYSTRING;
      const payload =
        '{"trnsUniqNo":"' +
        trnsUniqNo +
        '","uId":"' +
        uId +
        '","ctgId":"","campId":"' +
        campId +
        '","advNm":"' +
        advNm +
        '","reqAmt":' +
        reqAmt +
        ',"pltfmDvCd":"' +
        pltfmDvCd +
        '"}';
      const signature = hmac.signature(
        method,
        uri,
        hmacDatetime,
        queryString,
        payload
      );
      const valid = hmac.isValid(
        method,
        uri,
        hmacDatetime,
        queryString,
        payload,
        signature
      );
      //console.log("isValid : " + valid);
      stressList.push({
        hmacDatetime: hmacDatetime,
        hmacSignature: signature,
        payload: payload,
      });
      //hmacDatetime:"", hmacSignature:"", payload:""
      //X-Hmac-Datetime:"" , X-Hmac-Signature:"" , payload:""
    }
    connection.end();
    return stressList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const go = async () => {
  try {
    const stressList = await db();
    //console.log("stressList : " + stressList.length);

    let result = await async.every(stressList, requestStress);
    //console.log(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports.go = go;

//go();

// const retry = async () => {
//   try {
//     let result = await async.retry({ times: 2, interval: 1000 }, go);
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// retry();
//with placeholder
// connection.query(
//   "select '' as trnsUniqNo, '' as uId, '' as campId, cd as campId, title as advNm, point_amt as reqAmt, CASE WHEN 'I' THEN '2' WHEN 'A' THEN '1' ELSE '3' END as pltfmDvCd from tb_advertise where cat = 'C' ORDER BY RAND() LIMIT 5",
//   [],
//   function (err, res) {
//     console.log(res);
//   }
// );

// const [result] = await connection.query(
//   "select '' as trnsUniqNo, '' as uId, '' as campId, cd as campId, title as advNm, point_amt as reqAmt, CASE WHEN 'I' THEN '2' WHEN 'A' THEN '1' ELSE '3' END as pltfmDvCd from tb_advertise where cat = 'C' ORDER BY RAND() LIMIT 5"
// );

// console.log(result);

// connection.release();
