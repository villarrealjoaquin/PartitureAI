import { Analysis } from "@/types";

export const AnalysisItem = ({ analysis }: { analysis: Analysis[] }) => {
  return (
    <ul className="flex flex-wrap gap-4">
      {analysis &&
        analysis.map((analysis) => (
          <li
            key={analysis.type}
            className="flex items-center gap-4 p-2 bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-green-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L3 12h5v8h8v-8h5L12 2z" />
              </svg>
              <p className="text-sm font-semibold text-white">
                {analysis.text}:
              </p>
              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1 rounded-lg text-sm font-bold bg-opacity-10 bg-${analysis.condition ? "green" : "red"}-600`}
                >
                  {analysis.value}
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};
