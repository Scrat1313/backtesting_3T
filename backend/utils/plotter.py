# backend/utils/plotter.py

import matplotlib.pyplot as plt


def plot_results(signals, entries, exits):
    plt.figure(figsize=(12, 6))

    plt.plot(entries, label='Entrées', marker='o', linestyle='None')
    plt.plot(exits, label='Sorties', marker='x', linestyle='None')
    plt.title('Résultats de Backtesting')
    plt.xlabel('Index')
    plt.ylabel('Prix')
    plt.legend()
    plt.show()
