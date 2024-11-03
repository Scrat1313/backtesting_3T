// src/components/BacktestForm.tsx
"use client";
import { useState } from 'react';

const BacktestForm = () => {
    const [strategy, setStrategy] = useState('three_touches');
    const [parameters, setParameters] = useState({ take_profit: 0.02 });
    const [dataFile, setDataFile] = useState<File | null>(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Créer un FormData pour envoyer le fichier et les autres données
        const formData = new FormData();
        if (dataFile) {
            formData.append('data_file', dataFile);
        }
        formData.append('strategy', strategy);
        formData.append('parameters', JSON.stringify(parameters));

        const response = await fetch('http://localhost:8000/backtest/', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        setData(result);
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Backtest Strategy</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                    className="border rounded p-2 w-full"
                >
                    <option value="three_touches">Three Touch Strategy</option>
                    {/* D'autres stratégies peuvent être ajoutées ici */}
                </select>
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setDataFile(e.target.files[0]);
                        }
                    }}
                    className="border rounded p-2 w-full"
                />
                <div>
                    <label className="block mb-1">Take Profit:</label>
                    <input
                        type="number"
                        value={parameters.take_profit}
                        onChange={(e) => setParameters({ take_profit: parseFloat(e.target.value) })}
                        className="border rounded p-2 w-full"
                        step="0.01"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded p-2 w-full"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Run Backtest'}
                </button>
            </form>
            {data && (
                <div className="mt-4 p-4 border rounded">
                    <h2 className="text-lg font-bold">Results</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default BacktestForm;
