from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from backtesting.backtester import perform_backtest
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration CORS pour autoriser les requêtes depuis le frontend
origins = [
    "http://localhost:3000",  # L'adresse de votre frontend Next.js
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Classe pour représenter une requête de backtest
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
