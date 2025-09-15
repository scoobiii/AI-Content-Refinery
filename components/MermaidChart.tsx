import React, { useEffect } from 'react';

// Declare mermaid for TypeScript to avoid errors, as it's loaded from a script tag.
declare global {
  interface Window {
    mermaid: any;
  }
}

interface MermaidChartProps {
  chartData: string;
}

const InvalidDataMessage: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-900/50 rounded-lg h-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-amber-500 mb-4">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
    <h4 className="font-semibold text-lg text-slate-200">Could Not Generate Flowchart</h4>
    <p className="text-slate-400 mt-1 max-w-md">
      The AI could not generate a flowchart from the provided text. This feature works best with content describing energy production, demand, and surplus data.
    </p>
  </div>
);


export const MermaidChart: React.FC<MermaidChartProps> = ({ chartData }) => {
  // A simple validation: check if the string starts with 'graph', which is common for Mermaid flowcharts.
  const isValidMermaid = chartData && chartData.trim().startsWith('graph');

  useEffect(() => {
    // Only try to render if the syntax looks valid and the mermaid library is available
    if (isValidMermaid && window.mermaid) {
      try {
        window.mermaid.initialize({ startOnLoad: true, theme: 'dark' });
        // Let mermaid find and render the diagrams by itself
        window.mermaid.run();
      } catch (e) {
        console.error("Error rendering Mermaid chart:", e);
      }
    }
  }, [chartData, isValidMermaid]); // Rerun this effect if the chart data or its validity changes

  if (!isValidMermaid) {
    return <InvalidDataMessage />;
  }

  // The 'mermaid' class is essential for Mermaid.js to identify where to render the chart.
  // Using a key on the div ensures React replaces the DOM element when chartData changes,
  // which helps in reliably re-triggering the Mermaid rendering process.
  return (
    <div className="mermaid" key={chartData}>
      {chartData}
    </div>
  );
};