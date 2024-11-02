# backend/strategies/base_strategy.py

class BaseStrategy:
    def __init__(self, parameters):
        self.parameters = parameters

    def backtest(self, data):
        raise NotImplementedError("Cette méthode doit être implémentée par la sous-classe.")
