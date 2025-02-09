import type { IJob } from "@/interfaces/job.interface";
import { JobItem } from "@/components";
import Placeholder from "./Placeholder";
import Skeleton from "./Skeleton";

interface JobsFlexProps {
  jobs: IJob[];
  isLoading: boolean;
  isError: boolean;
}

const JobsFlex = ({ jobs, isLoading, isError }: JobsFlexProps) => (
  <div className="flex w-full flex-col  gap-5">
    {isLoading && <Skeleton />}
    {(!isLoading && (jobs?.length < 1 || jobs === undefined)) || isError ? (
      <Placeholder isError={isError} />
    ) : (
      Array.isArray(jobs) &&
      jobs?.map((job: IJob, index: number) => (
        <JobItem key={job._id} job={job} />
      ))
    )}
  </div>
);

export default JobsFlex;
