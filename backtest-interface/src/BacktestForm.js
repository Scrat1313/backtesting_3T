import React, { useState } from 'react';
import {
  TrendingUp,
  Upload,
  Target,
  Shield,
  PlayCircle,
  AlertCircle,
  BarChart2,
  ArrowUp,
  ArrowDown,
  Loader2
} from 'lucide-react';
import PerformanceChart from "./PerformanceChart";

const BacktestForm = () => {
    const [strategy, setStrategy] = useState('three_touches');
    const [dataFile, setDataFile] = useState(null);
    const [parameters, setParameters] = useState({ take_profit: 0.02, stop_loss: 0.01 });
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResults(null);
        setIsLoading(true);

        const formData = new FormData();
        formData.append('strategy', strategy);
        formData.append('data_file', dataFile);
        formData.append('parameters', JSON.stringify(parameters));

        try {
            const response = await fetch('http://localhost:8000/backtest/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            setResults(data);
        } catch (err) {
            console.error(err);
            setError("Une erreur est survenue lors de l'exécution du backtest");
        } finally {
            setIsLoading(false);
        }
    };

    const renderResultsTable = () => {
        if (!results) return null;

        return (
            <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                        <BarChart2 className="w-5 h-5 text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Résultats du Backtest</h2>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signal</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Take Profit</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop Loss</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {results.signals.map((signal, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {signal.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {signal.signal === 'buy' ? (
                                                <ArrowUp className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <ArrowDown className="w-4 h-4 text-red-500" />
                                            )}
                                            <span className={signal.signal === 'buy' ? 'text-green-600' : 'text-red-600'}>
                                                {signal.signal}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{signal.entry}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{signal.take_profit}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{signal.stop_loss}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="w-6 h-6 text-white" />
                            <h1 className="text-2xl font-bold text-white">Backtest Strategy</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                                    <TrendingUp className="w-4 h-4 text-gray-500" />
                                    <span>Stratégie</span>
                                </label>
                                <select
                                    value={strategy}
                                    onChange={(e) => setStrategy(e.target.value)}
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                >
                                    <option value="three_touches">Three Touches</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                                    <Upload className="w-4 h-4 text-gray-500" />
                                    <span>Fichier de données</span>
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    onChange={(e) => setDataFile(e.target.files[0])}
                                                    required
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500">CSV, XLSX up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                                        <Target className="w-4 h-4 text-gray-500" />
                                        <span>Take Profit</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={parameters.take_profit}
                                        onChange={(e) => setParameters({ ...parameters, take_profit: parseFloat(e.target.value) })}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-1">
                                        <Shield className="w-4 h-4 text-gray-500" />
                                        <span>Stop Loss</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={parameters.stop_loss}
                                        onChange={(e) => setParameters({ ...parameters, stop_loss: parseFloat(e.target.value) })}
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <PlayCircle className="w-5 h-5" />
                            )}
                            <span>{isLoading ? 'Exécution en cours...' : 'Lancer le Backtest'}</span>
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-200">
                        <div className="flex items-center space-x-2 text-red-700">
                            <AlertCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {renderResultsTable()}

                {results && (
                    <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center space-x-2">
                                <BarChart2 className="w-5 h-5 text-gray-600" />
                                <h2 className="text-lg font-semibold text-gray-800">Aperçu des Performances</h2>
                            </div>
                        </div>
                        <div className="p-6">
                            <PerformanceChart
                                winrate={results.winrate}
                                totalTrades={results.total_trades}
                                winningTrades={results.winning_trades}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BacktestForm;