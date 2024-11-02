# backend/backtesting/backtester.py

import pandas as pd
from strategies.three_touch_strategy import three_touch_backtest


def perform_backtest(data: pd.DataFrame, strategy: str, parameters: dict):
    # Implémentation de la logique de backtesting pour la stratégie
    if strategy == "three_touches":
        return three_touch_backtest(data, parameters)

    return {"error": "Stratégie non reconnue"}
