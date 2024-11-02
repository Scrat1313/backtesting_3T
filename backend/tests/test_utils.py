# backend/tests/test_utils.py

import pytest
from utils.metrics import calculate_metrics


def test_calculate_metrics():
    entries = [100, 105, 110]
    exits = [105, 110, 115]
    performance = calculate_metrics(entries, exits)

    assert performance["total_return"] == 15
    assert performance["num_trades"] == 3
    assert performance["average_return"] == 5
