from fastapi import FastAPI, File, UploadFile, Form
import pandas as pd
from backtesting.backtester import perform_backtest
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configuration CORS pour autoriser les requêtes depuis le frontend
origins = [
    "http://localhost:3000",  # L'adresse de votre frontend react.js
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/backtest/")
async def backtest(
    strategy: str = Form(...),
    data_file: UploadFile = File(...),
    parameters: str = Form(...)  # Accepte parameters comme une chaîne JSON
):
    # Convertir les paramètres de chaîne JSON en dictionnaire
    import json
    parameters_dict = json.loads(parameters)

    # Charger les données historiques à partir du fichier téléchargé
    contents = await data_file.read()
    data = pd.read_csv(pd.io.common.BytesIO(contents))

    # Appel de la fonction de backtesting
    results = perform_backtest(data, strategy, parameters_dict)

    return results
