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

    for i in range(len(data)):
        if data['Price'].iloc[i] >= data['Price'].rolling(window=3).max().iloc[i]:
            signals.append("Sell Signal")
        elif data['Price'].iloc[i] <= data['Price'].rolling(window=3).min().iloc[i]:
            signals.append("Buy Signal")
        else:
            signals.append("No Signal")

    return {
        "result": "Backtest terminé pour la stratégie des 3 Touches",
        "signals": signals
    }
