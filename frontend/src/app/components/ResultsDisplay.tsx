// src/components/ResultsDisplay.tsx

import { FC } from 'react';

interface ResultsDisplayProps {
    results: any;
}

const ResultsDisplay: FC<ResultsDisplayProps> = ({ results }) => {
    return (
        <div className="mt-4 p-4 border rounded">
            <h2 className="text-lg font-bold">Results</h2>
            <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
    );
};

export default ResultsDisplay;
