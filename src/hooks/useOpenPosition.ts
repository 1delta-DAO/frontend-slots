import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ContractTransaction, ethers } from "ethers";
import { useCallback, useState } from "react";
import { useTxWaitModal } from "../components/modal/modals/tx-wait/tx-wait.modal";

import { extractRevertReason, JsonRpcError } from "../utils/blockchain";
import { useUserPositions } from "./useUserPositions";
import { createSlot } from "../contracts/fx-factory.contract";
import { PermitData } from "./usePermit";

interface UseOpenPosution {
    openPosition: (
        depositAmount: string,
        collateralA: string,
        debtV: string,
        targetCollateral: string,
        borrowBase: string,
        data1inch: string
    ) => void;
    hash: string | undefined,
    isLoading: boolean
}

export const useOpenPosition = (permit: PermitData | undefined): UseOpenPosution => {
    const { library, account } = useWeb3React<JsonRpcProvider>();
    const txAwaitModal = useTxWaitModal();
    const [isLoading, setIsLoading] = useState(false)
    const { refresh } = useUserPositions();
    const pk = process.env.RELAYER_PK 
    const hasRelayer = Boolean(pk)
    const relayerWallet = hasRelayer ? new ethers.Wallet(pk,
        new StaticJsonRpcProvider('https://rpc.ankr.com/polygon', { chainId: 137, name: 'Polygon' })) : undefined
    const [hash, setHash] = useState<string | undefined>(undefined)
    const hasPermit = Boolean(permit)
    const openPosition = useCallback((
        depositAmount: string,
        collateralA: string,
        debtV: string,
        targetCollateral: string,
        borrowBase: string,
        data1inch: string
    ) => {
        if (library && account) {
            if (!hasRelayer) console.log("no relayer found")
            txAwait(
                createSlot(
                    account,
                    depositAmount,
                    collateralA,
                    debtV,
                    targetCollateral,
                    borrowBase,
                    data1inch,
                    library,
                    permit,
                    relayerWallet as any
                )
            );
        }
    },
        [permit, library, account, relayerWallet])

    const txAwait = useCallback(
        (tx: Promise<ContractTransaction>): void => {
            tx.then(async (tx) => {
                if (hasPermit)
                    setIsLoading(true)
                else
                    txAwaitModal.showModal();
                console.log("hash", tx.hash)
                setHash(tx.hash)
                await tx.wait(1);
                if (hasPermit || isLoading)
                    setIsLoading(false)
                else txAwaitModal.closeModal();
                refresh();
            }).catch((error: JsonRpcError | { error: JsonRpcError }) => {
                const err =
                    (error as { error: JsonRpcError }).error !== undefined
                        ? (error as { error: JsonRpcError }).error
                        : (error as JsonRpcError);
                txAwaitModal.closeModal();
                setIsLoading(false)
                console.log(extractRevertReason(err), error);
            });
        },
        [txAwaitModal, refresh]
    );

    return { openPosition, hash, isLoading };
};
