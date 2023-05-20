import { JsonRpcProvider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ContractTransaction } from "ethers";
import { useCallback } from "react";
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
}

export const useOpenPosition = (permit: PermitData | undefined): UseOpenPosution => {
    const { library, account } = useWeb3React<JsonRpcProvider>();
    const txAwaitModal = useTxWaitModal();
    const { refresh } = useUserPositions();
    const openPosition = useCallback((
        depositAmount: string,
        collateralA: string,
        debtV: string,
        targetCollateral: string,
        borrowBase: string,
        data1inch: string
    ) => {
        if (library && account) {
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
                    permit
                )
            );
        }
    },
        [permit, library, account])

    const txAwait = useCallback(
        (tx: Promise<ContractTransaction>): void => {
            tx.then(async (tx) => {
                txAwaitModal.showModal();
                await tx.wait(1);
                txAwaitModal.closeModal();
                refresh();
            }).catch((error: JsonRpcError | { error: JsonRpcError }) => {
                const err =
                    (error as { error: JsonRpcError }).error !== undefined
                        ? (error as { error: JsonRpcError }).error
                        : (error as JsonRpcError);
                txAwaitModal.closeModal();
                console.log(extractRevertReason(err));
            });
        },
        [txAwaitModal, refresh]
    );

    return { openPosition };
};
