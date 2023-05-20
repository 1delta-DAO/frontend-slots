import { FxFactory } from "../abi/types";
import { getContract } from "../utils/blockchain";
import FACTORY_ABI from "../abi/1fx-factory.json";
import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumberish, BytesLike, ContractTransaction } from "ethers";
import { PermitData } from "../hooks/usePermit";

const contractFactoryAddress = "0x648cE75895873BECBC4c9a291A28CA1EF121953B";

export const getFxFactoryContract = getContract<FxFactory>(
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
  permitData: PermitData | undefined
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
    console.log("using permit")
    return getFxFactoryContract
      .connect(library.getSigner())
      .createSlotWithPermit(
        collateralA,
        debtV,
        targetCollateral,
        borrowBase,
        data1inch,
        permitData
      );
  }
};
