<script>
  import Layout from "~/components/my/Layout.svelte";
  import JobPostingList from "~/components/jobPostingList/JobPostingList.svelte";

  import {findScrapJobs} from "~/view/my/scrap-job/api";
  let promises = [];
  promises = [...promises, findScrapJobs()];
</script>

<Layout>
  <div slot="content">
    <JobPostingList {promises}></JobPostingList>
  </div>
</Layout>
