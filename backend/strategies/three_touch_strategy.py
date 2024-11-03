import pandas as pd

def three_touch_backtest(data: pd.DataFrame, parameters: dict):
    # Nettoyer les noms de colonnes
    data.columns = data.columns.str.strip()  # Supprime les espaces autour des noms de colonnes

    # Convertir la colonne 'Price' en numérique
    data['Price'] = pd.to_numeric(data['Price'].str.replace(',', ''), errors='coerce')

    # Ajout d'une colonne de tendance
    data['Trend'] = 'Neutral'  # Valeur par défaut

    # Déterminer la tendance
    data.loc[data['Price'] > data['Price'].shift(1), 'Trend'] = 'Bullish'
    data.loc[data['Price'] < data['Price'].shift(1), 'Trend'] = 'Bearish'

    # Initialisation des signaux
    signals = []
    take_profit_ratio = parameters.get("take_profit", 0.02)  # Par exemple, 2% de TP
    stop_loss_ratio = parameters.get("stop_loss", 0.01)  # Par exemple, 1% de SL

    for i in range(3, len(data)):
        signal_info = {
            "date": data['Date'].iloc[i],
            "signal": "No Signal",
            "entry": None,
            "take_profit": None,
            "stop_loss": None
        }

        # Détection des signaux de vente ou d'achat
        if data['Price'].iloc[i] >= data['Price'].rolling(window=3).max().iloc[i]:
            signal_info["signal"] = "Sell Signal"
            signal_info["entry"] = data['Price'].iloc[i]
            signal_info["take_profit"] = signal_info["entry"] * (1 - take_profit_ratio)
            signal_info["stop_loss"] = signal_info["entry"] * (1 + stop_loss_ratio)

        elif data['Price'].iloc[i] <= data['Price'].rolling(window=3).min().iloc[i]:
            signal_info["signal"] = "Buy Signal"
            signal_info["entry"] = data['Price'].iloc[i]
            signal_info["take_profit"] = signal_info["entry"] * (1 + take_profit_ratio)
            signal_info["stop_loss"] = signal_info["entry"] * (1 - stop_loss_ratio)

        signals.append(signal_info)

    return {
        "result": "Backtest terminé pour la stratégie des 3 Touches",
        "signals": signals
    }
