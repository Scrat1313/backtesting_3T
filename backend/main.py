# backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from backtesting.backtester import perform_backtest

app = FastAPI()

# Exemple de classe pour représenter une requête de backtest
class BacktestRequest(BaseModel):
    strategy: str
    data_file: str
    parameters: dict

@app.post("/backtest/")
async def backtest(request: BacktestRequest):
    # Charger les données historiques
    data = pd.read_csv(request.data_file)

    # Appel de la fonction de backtesting
    results = perform_backtest(data, request.strategy, request.parameters)

    return results
