import Home from "~/view/index.svelte";
import JobPostingDetail from "~/view/job_posting/postingId.svelte";
import JobPostingList from "~/view/job_posting/index.svelte";
import Login from "~/view/login/index.svelte";
import MatchJob from "~/view/my/match-job/index.svelte";
import AddMatchJob from "~/view/my/match-job/add/index.svelte";

export default {
  "/": Home,
  "/job_posting": JobPostingList,
  "/job_posting/:site/:postingId": JobPostingDetail, // 파라미터가 있는 페이지
  "/login": Login,
  "/my/match-job": MatchJob,
  "/my/match-job/add": AddMatchJob,
};
