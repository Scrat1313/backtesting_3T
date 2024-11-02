# backend/tests/test_strategies.py

import pandas as pd
from strategies.three_touch_strategy import three_touch_backtest

def test_three_touch_backtest():
    # Simulez des données pour le test
    data = {
        "Close": [1, 2, 3, 2, 3, 4, 5],
        "Open": [1, 1, 1, 1, 2, 2, 3],
        "High": [1, 2, 3, 2, 3, 4, 5],
        "Low": [1, 1, 1, 1, 2, 2, 3],
    }
    df = pd.DataFrame(data)

    results = three_touch_backtest(df, {"take_profit": 0.02})
    assert "signals" in results
    assert len(results["signals"]) == len(df) - 2
