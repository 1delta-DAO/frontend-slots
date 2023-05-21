/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-len */
import { formatEther } from "@ethersproject/units";
import React, { useMemo } from "react";
import { ALL_COINS } from "../../config/networks.config";
import { SlotData } from "../../contracts/fx.contracts";
import styles from "./positionTable.module.scss";

interface TableProps {
  slots: SlotData[];
}

export const PositionTable = ({ slots }: TableProps) => {
  return (
    <table className={styles["positions"]}>
      {PositinHeader()}
      {slots.map((s) => (
        <PositionRow slot={s} key={s.slot} />
      ))}
    </table>
  );
};

interface RowProps {
  slot: SlotData;
}

export const linkSvg =
"M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z";


const PositionRow = ({ slot }: RowProps) => {
  const [debt, collateral, nav, leverage, hf] = useMemo(() => {
    const collateral = Number(slot.totalCollateralBase);
    const debt = Number(slot.totalDebtBase);
    let nav = collateral - debt;
    const leverage = collateral / nav;
    nav /= 1e8;
    return [
      debt.toLocaleString(),
      collateral.toLocaleString(),
      nav.toLocaleString(),
      leverage.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      Number(formatEther(slot.healthFactor)).toLocaleString(undefined, { minimumFractionDigits: 2 }),
    ];
  }, [slot]);

  const [imgCollat, imgDebt, symbolCollat, symbolDebt] = useMemo(() => {
    const collateralSlot = ALL_COINS.find(
      (c) => c.address.toLowerCase() === slot.collateral.toLowerCase()
    );
    const debtSlot = ALL_COINS.find(
      (c) => c.address.toLowerCase() === slot.debt.toLowerCase()
    );
    return [
      collateralSlot?.icon,
      debtSlot?.icon,
      collateralSlot?.symbol,
      debtSlot?.symbol,
    ];
  }, [slot]);

  const getPnl = (): string => {
    return (Math.random() / 50 - 0.01).toLocaleString(undefined, {
      maximumFractionDigits: 4,
    });
  };

  const onClosePosition = () => {
    console.log("close position");
  };

  const onClickLink = (address: string) => {
    window.open(
      "https://polygonscan.com/address/" + address + "#code",
      "_blank"
    );
  };


    const pnl = getPnl()
  return (
    <tr className={styles["row"]}>
      <td className={styles["column"]}>
        <div className={styles["pair"]}>
          <img src={imgCollat} alt="1" />
          <span>{symbolCollat}</span>
          <img src={imgDebt} alt="2" />
          <span>{symbolDebt}</span>
          <svg
            width="16"
            height="16"
            viewBox={`0 0 512 512`}
            onClick={() => onClickLink(slot.slot)}
            className={styles["link"]}>
            <path d={linkSvg} fill="#0caf48" />
          </svg>
        </div>
      </td>
      <td>
        <div style={{color: Number(pnl) > 0 ? 'green':'red'}}>
        {pnl}
        </div>
        </td>
      <td>{leverage}x</td>
      <td>${nav}</td>
      <td>{hf}</td>
      <td className={styles["column"]}>
        <div className={styles["close"]}>
          <span onClick={onClosePosition} onKeyDown={onClosePosition}>
            Close
          </span>
        </div>
      </td>
    </tr>
  );
};

const PositinHeader = () => {
  return (
    <thead className={styles["header"]}>
      <td>Pair</td>
      <td>PNL</td>
      <td>Leverage</td>
      <td>Position Size</td>
      <td>Health Factor</td>
      <td></td>
    </thead>
  );
};
