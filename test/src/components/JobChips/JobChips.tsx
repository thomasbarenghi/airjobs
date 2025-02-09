"use client";
import type { IJob } from "@/interfaces/job.interface";
import { Chip } from "@heroui/react";
import JobChipsPlaceholder from "./Placeholder";
import JobChipsSkeleton from "./Skeleton";

interface Props {
  job?: IJob;
  isLoading?: boolean;
  isPlaceholder?: boolean;
}

const Chips = ({ job, isLoading = false, isPlaceholder = false }: Props) => (
  <>
    {isLoading && <JobChipsSkeleton />}
    {isPlaceholder && <JobChipsPlaceholder />}
    {!isLoading && !isPlaceholder && (
      <div className="flex flex-wrap gap-2 lg:flex-nowrap">
        <Chip className="bg-violet-200 text-secondary">{job?.type}</Chip>
        <Chip className="bg-violet-200 text-secondary">{job?.location}</Chip>
        <Chip className="bg-violet-200 text-secondary"> {job?.seniority}</Chip>
      </div>
    )}
  </>
);

export default Chips;
