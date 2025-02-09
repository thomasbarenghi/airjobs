"use client";
import { JobChips, TextElement } from "@/components";
import type { ApplicantsEnum, IJob } from "@/interfaces/job.interface";
import Image from "next/image";
import Routes from "@/utils/constants/routes.const";
import Link from "next/link";
import ButtonsGroup from "./ButtonsGroup";
import type { IUser } from "@/interfaces/user.interface";
import useSWR from "swr";
import Endpoints from "@/utils/constants/endpoints.const";
import HeroPlaceholder from "./HeroPlaceholder";

interface Props {
  job: IJob;
  loggedUser: IUser;
  isError: boolean;
}

const HeroSection = ({ job, loggedUser, isError }: Props) => {
  if (isError) return <HeroPlaceholder />;
  const { data, mutate } = useSWR(Endpoints.INDIVIDUAL_JOB(job._id), {
    fallbackData: job,
  });

  const isOwner = data?.owner?._id === loggedUser?._id;
  const hasApplied = data?.applicants?.some(
    (data: ApplicantsEnum) => data?.user?._id === loggedUser?._id
  );
  const applicantStatus =
    data?.applicants?.find(
      (applicant: ApplicantsEnum) => applicant.user._id === loggedUser?._id
    )?.status ?? "Under review";

  return (
    <section className=" section-reduced flex flex-col gap-10">
      <div className="flex w-full flex-col justify-between gap-5 lg:flex-row ">
        <div className="flex flex-grow items-center gap-5">
          <div className="w-full">
            <Link href={Routes.COMPANY(data?.owner?._id ?? null)}>
              <div className="flex w-full gap-5">
                <Image
                  width={80}
                  height={80}
                  src={data?.owner?.company?.logo ?? "/image/placeholder.png"}
                  alt="Company's logo"
                  className="aspect-square rounded-lg object-cover"
                />
                <div className="flex flex-col justify-center">
                  <TextElement
                    as="p"
                    type="t3"
                    className="!font-semibold leading-[24px] "
                  >
                    {data?.title}
                  </TextElement>
                  <TextElement as="p" type="base" className="!font-light">
                    {data?.owner?.company?.name}
                  </TextElement>
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden md:block lg:hidden">
            <ButtonsGroup
              mutate={mutate}
              hasApplied={hasApplied}
              applicantStatus={applicantStatus}
              data={data}
              loggedUser={loggedUser}
              jobId={data?._id}
              isOwner={isOwner}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-5">
          <JobChips job={data} />
          <div className="md:hidden lg:block">
            <ButtonsGroup
              mutate={mutate}
              hasApplied={hasApplied}
              applicantStatus={applicantStatus}
              data={data}
              loggedUser={loggedUser}
              jobId={data?._id}
              isOwner={isOwner}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <TextElement
          as="p"
          type="base"
          className="overflow-y-hidden !font-light leading-[165%] text-gray-900"
        >
          {data?.description}
        </TextElement>
        <div className="flex flex-col gap-1">
          <TextElement as="p" type="base" className="!font-light text-gray-900">
            Salary:{" "}
            <b className="font-semibold">
              {data?.currency}
              {data?.salary}
            </b>
          </TextElement>
          <TextElement as="p" type="base" className="!font-light text-gray-900">
            You can apply until:{" "}
            <b className="font-semibold">
              {new Date(data?.deadline).toLocaleDateString()}
            </b>
          </TextElement>
          <TextElement as="p" type="base" className="!font-light text-gray-900">
            The maximum number of applicants is: {data?.maxApplicants}, and has{" "}
            {data?.applicants?.length} applicants
          </TextElement>
          <TextElement as="p" type="base" className="!font-light text-gray-900">
            The country of the data is:{" "}
            <b className="font-semibold">{data?.country}</b>
          </TextElement>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
