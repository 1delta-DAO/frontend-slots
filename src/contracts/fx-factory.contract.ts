import { FxFactory } from "../abi/types";
import { getContract } from "../utils/blockchain";
import FACTORY_ABI from "../abi/1fx-factory.json";
import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumberish, BytesLike, Contract, ContractTransaction, Wallet } from "ethers";
import { PermitData } from "../hooks/usePermit";
import { parseUnits } from "@ethersproject/units";

const contractFactoryAddress = "0x648cE75895873BECBC4c9a291A28CA1EF121953B";

export const getFxFactoryContract = getContract<FxFactory & Contract>(
  FACTORY_ABI,
  contractFactoryAddress,
  137
);

export const nextAddress = async (): Promise<string> => {
  return await getFxFactoryContract.getNextAddress();
};

export const createSlot = async (
  user: string,
  depositAmount: string,
  collateralA: string,
  debtV: string,
  targetCollateral: string,
  borrowBase: string,
  data1inch: string,
  library: JsonRpcProvider,
  permitData: PermitData | undefined,
  relayerSigner: Wallet | undefined,
): Promise<ContractTransaction> => {
  if (!permitData)
    return getFxFactoryContract
      .connect(library.getSigner())
      .createSlot(
        user,
        depositAmount,
        collateralA,
        debtV,
        targetCollateral,
        borrowBase,
        data1inch
      );
  else {
    const signer = relayerSigner ?? library.getSigner()
    let gas = undefined
    let feeData = undefined
    if (relayerSigner) {
      feeData = await library.getFeeData()
      gas = await getFxFactoryContract
        .connect(signer).estimateGas
        .createSlotWithPermit(
          collateralA,
          debtV,
          targetCollateral,
          borrowBase,
          data1inch,
          permitData
        );
      console.log("Gas estimate", gas.toString())

      console.log("Gas price", feeData.gasPrice?.toString())
      console.log("Max fee", feeData.maxFeePerGas?.toString())
      console.log("Max prio", feeData.maxPriorityFeePerGas?.toString())

    }
    const opts = (gas && feeData) ? {
      gasLimit: gas.mul(13).div(10),
      maxFeePerGas: feeData.maxFeePerGas?.mul(13).div(10),
      maxPriorityFeePerGas: 40000000000 //feeData.maxPriorityFeePerGas?.mul(13).div(10)
    } : {}
    return getFxFactoryContract
      .connect(signer)
      .createSlotWithPermit(
        collateralA,
        debtV,
        targetCollateral,
        borrowBase,
        data1inch,
        permitData,
        opts
      );
  }
};
