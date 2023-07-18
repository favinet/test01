var crypto = require("crypto");

// 암호화 AES256
function encrypt(data, key, iv) {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encryptedText = cipher.update(data, "utf8", "base64");
  encryptedText += cipher.final("base64");
  return encryptedText;
}

// 복호화 AES256
function decrypt(data, key, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decryptedText = decipher.update(data, "base64", "utf8");
  decryptedText += decipher.final("utf8");
  return decryptedText;
}

// 암복호화 KEY
const key = "NhAllONEpay00100140703202mmoCnuR"; // 32비트
var iv = crypto.randomBytes(16);
// 암복호화 테스트
let plainText = "내 이름은 순자닷컴";
let encryptedText = encrypt(plainText, key, iv);
let decryptedText = decrypt(encryptedText, key, iv);
console.log("텍스트 : ", plainText);
console.log("암호화 : ", encryptedText);
console.log("복호화 : ", decryptedText);
