import { JsonRpcProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { BigNumberish, ethers, Signature } from "ethers";
import { BytesLike, splitSignature } from "ethers/lib/utils";
import { useCallback, useState } from "react";

import { produceSig } from "../utils/permitUtils";


export interface PermitData {
  owner: string;
  spender: string;
  value: BigNumberish;
  deadline: BigNumberish;
  v: BigNumberish;
  r: BytesLike;
  s: BytesLike;
}

interface UsePermit {
  signPermit: () => Promise<void>;
  permit: PermitData | undefined
}


export const usePermit = (
  spenderAddress: string, tokenAddress: string | undefined, amount: string
): UsePermit => {
  const { library, account, chainId } = useWeb3React<JsonRpcProvider>();

  const [permit, setPermit] = useState<PermitData | undefined>(undefined)

  const signPermit = useCallback(async () => {
    if (library && account && tokenAddress && chainId) {
      try {
        const sig = await produceSig(chainId, account, library, spenderAddress, tokenAddress, amount);
        const split = splitSignature(sig.signature)
        const sigFinal = {
          owner: account,
          spender: spenderAddress,
          value: amount,
          deadline: ethers.constants.MaxUint256,
          v: split.v,
          r: split.r,
          s: split.s
        }
        setPermit(sigFinal)
      } catch (e) {
        console.log("Error creating permit signature:", e)
        setPermit(undefined)
      }
    }
  }, [library, account, spenderAddress, tokenAddress, amount, chainId, permit]
  )



  return { permit, signPermit };
};
