/* eslint-disable max-len */
import React, { ReactNode, useMemo, useState } from "react";
import styles from "./fx.module.scss";
import TradingViewWidget from "react-tradingview-widget";
import { CoinIcon } from "../../elements/CoinIcon";
import { ArrowDropDown } from "../../elements/ArrowDropDown";
import { formatNumbersWithDotDelimiter, round } from "../../utils/utils";
import {
  Coin,
  networks,
  supportedPairs,
  supportedStableCoinsDol,
} from "../../config/networks.config";
import { SelectComponent } from "../../components/select/Select.component";
import { SpinnerComponent } from "../../components/spinner/Spinner.component";
import selectStyles from "../../components/select/Select.module.scss";
import selectPairStyles from "../../components/select-pair/SelectPair.module.scss";
import { SelectPairComponent } from "../../components/select-pair/SelectPair.component";

export const FxTab: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(
    formatNumbersWithDotDelimiter(0)
  );
  const [selectedToken, setSelectedToken] = useState<number>(0);
  const [selectedPair, setSelectedPair] = useState<number>(0);
  const [long, setLong] = useState(0);
  const [balance, setBalance] = useState(0);
  const [balances, setBalances] = useState<number[]>([]);
  const [collateral, setCollateral] = useState(0);
  const [viewBalance, setViewBalance] = useState(0);
  const [coin, setCoin] = useState<Coin>(
    networks.find((network) => network.name === "Ethereum")
      ?.nativeCurrency as Coin
  );

  const [allowedCollateralTokens, setAllowedCollateralTokens] = useState<
    Coin[]
  >([]);

  const onTokenChange = (option: number): void => {
    setSelectedToken(option);
  };

  const onPairChange = (option: number): void => {
    setSelectedPair(option);
  };

  const tokens = useMemo(
    () =>
      supportedStableCoinsDol.map((token, index) => ({
        icon: token.icon,
        key: index,
        label: token.name,
        value: token.address,
      })),
    []
  );

  const pairs = useMemo(
    () =>
      supportedPairs.map((pair, index) => ({
        coinCollateralIcon: pair.coinCollateral.icon,
        coinCollateralName: pair.coinCollateral.name,
        key: index,
        coinBorrowIcon: pair.coinBorrow.icon,
        coinBorrowName: pair.coinBorrow.name,
        value: pair.pairName,
      })),
    []
  );

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    let amount = event.target.value;
    const max = 0;
    const tot = 0;
    if (parseFloat(amount.replace(/,/g, "")) > viewBalance - 1) {
      amount = Math.ceil(Math.max(viewBalance - 1, 0)).toString();
    }
    if (max && tot && parseFloat(amount.replace(/,/g, "")) > max - tot) {
      amount = Math.max(max - tot, 0).toString();
    }
    const value = parseInt(amount.replace(/,/g, ""));
    setCollateral(value);
  };

  return (
    <div className={styles["fx"]}>
      <div className={styles["left"]}>
        <div className={styles["tradingview"]}>
          <TradingViewWidget
            symbol="UNISWAP3ETH:AGEURUSDC"
            theme={"DARK"}
            locale="us"
            autosize={true}
            interval={"30"}
            hide_volume={true}
            style={"2"}
          />
        </div>
        <div className={styles["orders"]}>
          <h1>Orders</h1>
          <p>These are your active and historic orders</p>
        </div>
      </div>
      <div className={styles["right"]}>
        <div className={styles["buysell"]}>
          <div className={styles["buy"]}>Buy/Long</div>
          <div className={styles["sell"]}>Sell/Short</div>
        </div>
        <div className={styles["collateral-balance"]}>
          <div className={styles["collateral-amount"]}>
            Collateral: {collateral}{" "}
          </div>
          <div className={styles["balance"]}>Balance: {balance}</div>
        </div>
        <div className={styles["collateral"]}>
          <div className={styles["collateral-left"]}>
            <input
              onChange={onAmountChange}
              type="string"
              value={inputValue}
              disabled={false}
            />
            <div className={styles["max"]}>MAX</div>
          </div>
          <div className={styles["collateral-right"]}>
            <SelectComponent
              options={tokens}
              onOptionChange={onTokenChange}
              selectedValue={selectedToken}
              renderOption={(option): ReactNode => (
                <>
                  {option.icon && (
                    <img
                      className={selectStyles["select-option-icon"]}
                      src={option.icon}
                      alt={option.label || option.value}
                    />
                  )}
                  <span className={selectStyles["select-option-label"]}>
                    {option.label || option.value}
                  </span>
                  <span className={styles["option-amount"]}>
                    {balances[0] && <SpinnerComponent size="small" />}
                    {balances[0] &&
                      formatNumbersWithDotDelimiter(
                        0 //round(balances?.[option.value]?.amount || 0)
                      )}
                  </span>
                </>
              )}
            />
          </div>
        </div>

        <div className={styles["long-label"]}>Long: ${long}</div>
        <div className={styles["long"]}>
          <input
            onChange={onAmountChange}
            type="string"
            value={inputValue}
            className={styles["long-left"]}
            disabled={false}
          />
          <SelectPairComponent
            options={pairs}
            onOptionChange={onPairChange}
            selectedValue={selectedPair}
            renderOption={(option): ReactNode => (
              <>
                {option.coinCollateralIcon && (
                  <img
                    className={selectPairStyles["select-option-icon"]}
                    src={option.coinCollateralIcon}
                    alt={option.coinCollateralName || option.value}
                  />
                )}
                {option.coinBorrowIcon && (
                  <img
                    className={selectPairStyles["select-option-icon"]}
                    src={option.coinBorrowIcon}
                    alt={option.coinBorrowName || option.value}
                  />
                )}
                <span className={selectPairStyles["select-option-label"]}>
                  {option.value}
                </span>
                <span className={styles["option-amount"]}>
                  {balances[0] && <SpinnerComponent size="small" />}
                  {balances[0] &&
                    formatNumbersWithDotDelimiter(
                      0 //round(balances?.[option.value]?.amount || 0)
                    )}
                </span>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
};
