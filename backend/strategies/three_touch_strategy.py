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

    # Initialisation des signaux et compteurs de performance
    signals = []
    take_profit_ratio = parameters.get("take_profit", 0.02)  # Par exemple, 2% de TP
    stop_loss_ratio = parameters.get("stop_loss", 0.01)  # Par exemple, 1% de SL
    total_trades = 0
    winning_trades = 0

    for i in range(3, len(data)):
        signal_info = {
            "date": data['Date'].iloc[i],
            "signal": "No Signal",
            "entry": "No Entry",
            "take_profit": "No TP",
            "stop_loss": "No SL"
        }

        # Détection des signaux de vente ou d'achat
        if data['Price'].iloc[i] >= data['Price'].rolling(window=3).max().iloc[i]:
            signal_info["signal"] = "Sell Signal"
            signal_info["entry"] = data['Price'].iloc[i]
            signal_info["take_profit"] = signal_info["entry"] * (1 - take_profit_ratio)
            signal_info["stop_loss"] = signal_info["entry"] * (1 + stop_loss_ratio)
            total_trades += 1

            # Vérifier si le TP a été atteint (indicateur d'un trade gagnant)
            if data['Price'].iloc[i:].min() <= signal_info["take_profit"]:
                winning_trades += 1

        elif data['Price'].iloc[i] <= data['Price'].rolling(window=3).min().iloc[i]:
            signal_info["signal"] = "Buy Signal"
            signal_info["entry"] = data['Price'].iloc[i]
            signal_info["take_profit"] = signal_info["entry"] * (1 + take_profit_ratio)
            signal_info["stop_loss"] = signal_info["entry"] * (1 - stop_loss_ratio)
            total_trades += 1

            # Vérifier si le TP a été atteint (indicateur d'un trade gagnant)
            if data['Price'].iloc[i:].max() >= signal_info["take_profit"]:
                winning_trades += 1

        signals.append(signal_info)

    # Calculer le winrate
    winrate = (winning_trades / total_trades) * 100 if total_trades > 0 else 0

    return {
        "result": "Backtest terminé pour la stratégie des 3 Touches",
        "signals": signals,
        "winrate": winrate,
        "total_trades": total_trades,
        "winning_trades": winning_trades
    }
