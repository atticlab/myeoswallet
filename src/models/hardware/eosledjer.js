/* eslint-disable */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.foreach = foreach;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bippath = require('bip32-path'); /* Borrowed from https://github.com/tarassh/fairy-wallet */


var CLA = 0xD4;
var INS_GET_PUBLIC_KEY = 0x02;
var INS_SIGN = 0x04;
var INS_GET_APP_CONFIGURATION = 0x06;
var P1_CONFIRM = 0x01;
var P1_NON_CONFIRM = 0x00;
var P2_NO_CHAINCODE = 0x00;
var P2_CHAINCODE = 0x01;
var P1_FIRST = 0x00;
var P1_MORE = 0x80;

function foreach(arr, callback) {
    function iterate(index, array, result) {
        if (index >= array.length) {
            return result;
        }return callback(array[index], index).then(function (res) {
            result.push(res);
            return iterate(index + 1, array, result);
        });
    }
    return _promise2.default.resolve().then(function () {
        return iterate(0, arr, []);
    });
}

/**
 * EOS API
 *
 * @example
 * import Eos from "@ledgerhq/hw-app-eos";
 * const eos = new Eos(transport)
 */

var Eos = function () {
    function Eos(transport) {
        (0, _classCallCheck3.default)(this, Eos);

        this.transport = transport;
        transport.decorateAppAPIMethods(this, ["getPublicKey", "signTransaction", "getAppConfiguration"], "e0s");
    }

    /**
     * get EOS public key for a given BIP 32 path.
     * @param path a path in BIP 32 format
     * @option boolDisplay optionally enable or not the display
     * @option boolChaincode optionally enable or not the chaincode request
     * @return an object with a publicKey, address and (optionally) chainCode
     * @example
     * eos.getPublicKey("44'/194'/0'/0'/0").then(o => o.address)
     */


    (0, _createClass3.default)(Eos, [{
        key: "getPublicKey",
        value: function getPublicKey(path, boolDisplay, boolChaincode) {
            var paths = bippath.fromString(path).toPathArray();
            var buffer = Buffer.alloc(1 + paths.length * 4);
            buffer[0] = paths.length;
            paths.forEach(function (element, index) {
                buffer.writeUInt32BE(element, 1 + 4 * index);
            });
            return this.transport.send(CLA, INS_GET_PUBLIC_KEY, boolDisplay ? P1_CONFIRM : P1_NON_CONFIRM, boolChaincode ? P2_CHAINCODE : P2_NO_CHAINCODE, buffer).then(function (response) {
                var result = {};
                var publicKeyLength = response[0];
                var addressLength = response[1 + publicKeyLength];
                result.publicKey = response.slice(1, 1 + publicKeyLength).toString("hex");
                result.wif = response.slice(1 + publicKeyLength + 1, 1 + publicKeyLength + 1 + addressLength).toString("ascii");
                if (boolChaincode) {
                    result.chainCode = response.slice(1 + publicKeyLength + 1 + addressLength, 1 + publicKeyLength + 1 + addressLength + 32).toString("hex");
                }
                return result;
            });
        }

        /**
         * You can sign a transaction and retrieve v, r, s given the raw transaction and the BIP 32 path of the account to sign
         * @example
         eth.signTransaction("44'/194'/0'/0'/0", "....").then(result => ...)
         */

    }, {
        key: "signTransaction",
        value: function signTransaction(path, rawTxHex) {
            var _this = this;

            var paths = bippath.fromString(path).toPathArray();
            var offset = 0;
            var rawTx = Buffer.from(rawTxHex, "hex");
            var toSend = [];
            var response = void 0;

            var _loop = function _loop() {
                var maxChunkSize = offset === 0 ? 150 - 1 - paths.length * 4 : 150;
                var chunkSize = offset + maxChunkSize > rawTx.length ? rawTx.length - offset : maxChunkSize;
                var buffer = Buffer.alloc(offset === 0 ? 1 + paths.length * 4 + chunkSize : chunkSize);
                if (offset === 0) {
                    buffer[0] = paths.length;
                    paths.forEach(function (element, index) {
                        buffer.writeUInt32BE(element, 1 + 4 * index);
                    });
                    rawTx.copy(buffer, 1 + 4 * paths.length, offset, offset + chunkSize);
                } else {
                    rawTx.copy(buffer, 0, offset, offset + chunkSize);
                }
                toSend.push(buffer);
                offset += chunkSize;
            };

            while (offset !== rawTx.length) {
                _loop();
            }
            return foreach(toSend, function (data, i) {
                return _this.transport.send(CLA, INS_SIGN, i === 0 ? P1_FIRST : P1_MORE, 0x00, data).then(function (apduResponse) {
                    response = apduResponse;
                    return response;
                });
            }).then(function () {
                var v = response.slice(0, 1).toString("hex");
                var r = response.slice(1, 1 + 32).toString("hex");
                var s = response.slice(1 + 32, 1 + 32 + 32).toString("hex");
                return { v: v, r: r, s: s };
            });
        }

        /**
         */

    }, {
        key: "getAppConfiguration",
        value: function getAppConfiguration() {
            return this.transport.send(CLA, INS_GET_APP_CONFIGURATION, 0x00, 0x00).then(function (response) {
                var result = {};
                result.version = response[1] + "." + response[2] + "." + response[3];
                return result;
            });
        }
    }]);
    return Eos;
}();

exports.default = Eos;
