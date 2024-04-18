import JobPostingDetail from "~/view/job_posting/postingId.svelte";
import JobPostingList from "~/view/job_posting/index.svelte";

export default {
  "/job_posting": JobPostingList,
  "/job_posting/:site/:postingId": JobPostingDetail, // 파라미터가 있는 페이지
};
