import type { Analysis as AnalysisType } from "@/types";
import { Skeleton } from "../ui/skeleton";
import { AnalysisItem } from "./AnalysisItem";
import { SkeletonComponent } from "./SkeletonComponent";

export const ComponentsAnalysis = ({
  answer,
  analysis,
  error,
  isLoading,
}: {
  answer: string;
  analysis: AnalysisType[];
  error: string | null;
  isLoading: boolean;
}) => {
  if (error) {
    return (
      <div className="text-white m-auto mt-5 pt-5 pr-4 max-w-4xl">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (isLoading) {
    return <SkeletonComponent />;
  }
  return (
    <div className="text-white m-auto mt-5 pt-5 pr-4 max-w-4xl">
      <div className="flex flex-col items-start gap-4 p-4 bg-gray-800 rounded-lg shadow-md">
        <p className="text-sm text-white mb-4">{answer}</p>
        <AnalysisItem analysis={analysis} />
      </div>
    </div>
  );
};
