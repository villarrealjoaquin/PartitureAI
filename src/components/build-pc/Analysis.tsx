import type { Analysis as AnalysisType } from "@/types";
import { Skeleton } from "../ui/skeleton";

export const Analysis = ({
  hasApiKey,
  answer,
  analysis,
}: {
  hasApiKey: boolean;
  answer: string;
  analysis: AnalysisType[];
}) => {
  return (
    <>
      {hasApiKey && (
        <>
          <div className="text-white m-auto mt-5 pt-5 pr-4 max-w-4xl">
            {answer ? (
              <div className="flex flex-col items-start gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
                <p className="text-sm text-white mb-4">{answer}</p>
                <div className="flex  flex-wrap gap-4">
                  {analysis &&
                    analysis.map((analysis) => (
                      <article
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
                      </article>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Skeleton className="w-1/2 h-[10px]" />
                <Skeleton className="w-10/12 h-[10px]" />
                <Skeleton className="w-full h-[10px]" />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
