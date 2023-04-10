"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOverride = void 0;
const ethers_1 = require("ethers");
function createOverride(provider, contract, method, args) {
    return __awaiter(this, void 0, void 0, function* () {
        // if provider is jsonrpc, then this gas esimates will be made by provider
        if (provider instanceof ethers_1.ethers.providers.JsonRpcProvider) {
            return {};
        }
        let gas = yield contract.estimateGas[method](...args);
        const fee = yield contract.provider.getFeeData();
        // gas as ethers.BigNumber
        gas = ethers_1.ethers.BigNumber.from(gas);
        // multiply by 1.3
        gas = gas.mul(13).div(10);
        return {
            gasPrice: fee.gasPrice,
            gasLimit: gas
        };
    });
}
exports.createOverride = createOverride;
