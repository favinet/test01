var crypto = require("crypto");

function getAlgorithm(keyBase64) {
  var key = Buffer(keyBase64, "hex").toString("ASCII"); //Buffer.from(keyBase64, 'base64');
  console.log("key : " + key.length);
  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 32:
      return "aes-256-cbc";
  }

  throw new Error("Invalid key length: " + key.length);
}

function encrypt(plainText, keyBase64, ivBase64) {
  const key = Buffer.from(keyBase64, "base64");
  const iv = Buffer.from(ivBase64, "base64");

  const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}

function decrypt(messagebase64, keyBase64, ivBase64) {
  const key = Buffer.from(keyBase64, "base64");
  const iv = Buffer.from(ivBase64, "base64");

  const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
  let decrypted = decipher.update(messagebase64, "base64");
  decrypted += decipher.final();
  return decrypted;
}

var keyBase64 = "NhAllONEpay00100140703202mmoCnuR";
var ivBase64 = Buffer.from([
  0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c,
  0x0d, 0x0e, 0x0f,
]);
var plainText =
  "Why, then, ’tis none to you, for there is nothing either good or bad, but thinking makes it so";

var cipherText = encrypt(plainText, keyBase64, ivBase64);
var decryptedCipherText = decrypt(cipherText, keyBase64, ivBase64);

console.log("Algorithm: " + getAlgorithm(keyBase64));
console.log("Plaintext: " + plainText);
console.log("Ciphertext: " + cipherText);
console.log("Decoded Ciphertext: " + decryptedCipherText);
