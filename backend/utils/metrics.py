# backend/utils/metrics.py

def calculate_metrics(entries, exits):
    total_return = sum(exits) - sum(entries)
    performance = {
        "total_return": total_return,
        "num_trades": len(entries),
        "average_return": total_return / len(entries) if entries else 0
    }
    return performance
