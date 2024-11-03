import pandas as pd
from strategies.three_touch_strategy import three_touch_backtest

def perform_backtest(data: pd.DataFrame, strategy: str, parameters: dict):
    # Appel de la logique de backtesting en fonction de la stratégie choisie
    if strategy == "three_touches":
        return three_touch_backtest(data, parameters)

    return {"error": "Stratégie non reconnue"}
