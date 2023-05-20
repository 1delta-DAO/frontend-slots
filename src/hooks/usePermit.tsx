import { JsonRpcProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Signature } from "ethers";
import { useCallback, useState } from "react";

import { produceSig } from "../utils/permitUtils";


interface PermitData {
  signature: any;
  split: Signature;
}

interface UsePermit {
  signPermit: () => Promise<void>;
  permit: PermitData | undefined
}



export const usePermit = (
  spenderAddress: string, tokenAddress: string | undefined, amount: string
): UsePermit => {
  const { library, account } = useWeb3React<JsonRpcProvider>();

  const [permit, setPermit] = useState<PermitData | undefined>(undefined)

  const signPermit = useCallback(async () => {
    if (library && account && tokenAddress) {
      try {
        const sig = await produceSig(account, library, spenderAddress, tokenAddress, amount);
        setPermit(sig)
      } catch (e) {
        console.log("Error creating permit signature:", e)
      }
    }
  }, [library, account, spenderAddress, tokenAddress, amount]
  )



  return { permit, signPermit };
};
