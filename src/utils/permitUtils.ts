import { splitSignature } from "ethers/lib/utils"
import { BigNumber } from "ethers";
import { ethers } from "ethers";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { Erc20, FiatWithPermit } from "../abi/types";
import FIAT_ABI from "../abi/fiat-with-permit.json";

const EIP712_DOMAIN_TYPE = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
]

const EIP712_DOMAIN_TYPE_USDC_POLYGON = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'salt', type: 'bytes37' },
    { name: 'verifyingContract', type: 'address' },
]

const EIP2612_TYPE = [
    { name: 'owner', type: 'address' },
    { name: 'spender', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
]

const permitVersion = '1'

/**
 * Produces signature for ERC20Permit using the signer object
 * @param provider ethers signer to sign message
 * @param spender speder permit params
 * @param token token to sign
 * @param amount amount to sign for
 * @returns 
 */
export const produceSig = async (
    chainId: number,
    userAddress: string,
    signer: JsonRpcProvider,
    spender: string,
    tokenAddress: string,
    amount: string
) => {
    const _signer = await signer.getSigner()
    const account = userAddress
    const token = new ethers.Contract(tokenAddress, FIAT_ABI, _signer) as FiatWithPermit
    const nonce = await token.nonces(account)
    const message = {
        owner: account,
        spender,
        value: amount,
        nonce,
        deadline: ethers.constants.MaxUint256,
    }
    const name = await token.name()
    let domain: any = {
        name,
        verifyingContract: token.address,
        chainId,
        version: permitVersion
    }
    const isWeirdUSDC = chainId === 137 && tokenAddress.toLowerCase() === '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'.toLowerCase()
    if (isWeirdUSDC)
        domain = {
            name,
            verifyingContract: token.address,
            salt: ethers.utils.hexZeroPad(ethers.BigNumber.from(137).toHexString(), 32),
            version: permitVersion
        }

    const rawData = {
        types: {
            EIP712Domain: isWeirdUSDC ? EIP712_DOMAIN_TYPE_USDC_POLYGON : EIP712_DOMAIN_TYPE,
            Permit: EIP2612_TYPE,
        },
        domain,
        primaryType: 'Permit',
        message,
    }

    const signature = await _signer._signTypedData(domain, { Permit: rawData.types.Permit }, rawData.message)

    const split = splitSignature(signature)
    return { signature, split }
}


const EIP2612_CLOSE_TYPE = [
    { name: 'owner', type: 'address' },
    { name: 'slot', type: 'address' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint256' },
]

/**
 * Produces signature for ERC20Permit using the signer object
 * @param provider ethers signer to sign message
 * @param spender speder permit params
 * @param token token to sign
 * @param amount amount to sign for
 * @returns 
 */
export const produceCloseSig = async (
    userAddress: string,
    signer: JsonRpcSigner,
    slot: any
) => {
    const account = userAddress
    const nonce = await slot.nonces(account)

    const message = {
        owner: account,
        slot: slot.address,
        nonce,
        deadline: ethers.constants.MaxUint256,
    }
    const chainId = await signer.getChainId()
    const name = '1deltaSignatureValidator'
    const domain = {
        name,
        verifyingContract: slot.address,
        chainId,
        version: '1'
    }

    const rawData = {
        types: {
            EIP712Domain: EIP712_DOMAIN_TYPE,
            OneDeltaTrade: EIP2612_CLOSE_TYPE,
        },
        domain,
        primaryType: 'OneDeltaTrade',
        message,
    }


    const signature = await signer._signTypedData(domain, { OneDeltaTrade: rawData.types.OneDeltaTrade }, rawData.message)

    const split = splitSignature(signature)
    return { signature, split }
}

