import { getUser } from "@/services/user/getUser.service";
import FormSection from "../../_forms/FormSection";
import type { Metadata } from "next";
import { getJob } from "@/services/job/getJob.service";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Edit Job | Airjobs",
  themeColor: "#0F03C1",
};

const EditJob = async ({ params }: { params: { jobId: string } }) => {
  const session = await auth();
  const { data: job } = await getJob(params.jobId);
  const { data: loggedUser } = await getUser(session?.user?.email as string);

  return (
    <article className="mt-[100px] flex w-full flex-col items-center gap-10 pb-10 pt-4 ">
      <FormSection mode="edit" job={job} loggedUser={loggedUser} />
    </article>
  );
};

export default EditJob;
