# backend/backtesting/performance.py

def calculate_performance(entries, exits):
    # Exemple simple de calcul de performance
    total_return = sum(exits) - sum(entries)
    performance = {
        "total_return": total_return,
        "num_trades": len(entries),
        "average_return": total_return / len(entries) if entries else 0
    }
    return performance