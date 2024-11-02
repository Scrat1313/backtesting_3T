# backend/tests/test_backtester.py

import pytest
import pandas as pd
from backtesting.backtester import perform_backtest

def test_perform_backtest():
    # Simulez des données pour le test
    data = {
        "Close": [1, 2, 3, 2, 3, 4, 5],
        "Open": [1, 1, 1, 1, 2, 2, 3],
        "High": [1, 2, 3, 2, 3, 4, 5],
        "Low": [1, 1, 1, 1, 2, 2, 3],
    }
    df = pd.DataFrame(data)

    results = perform_backtest(df, "three_touches", {"take_profit": 0.02})
    assert "result" in results
    assert results["result"] == "Backtest terminé pour la stratégie des 3 Touches"
