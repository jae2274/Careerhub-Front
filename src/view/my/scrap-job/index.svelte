<script>
  import Layout from "~/components/my/Layout.svelte";
  import JobPostingList from "~/components/jobPostingList/JobPostingList.svelte";

  import {
    findAllScrapTags,
    findScrapJobs,
    findUntaggedScrapJobs,
  } from "~/view/my/scrap-job/api";
  let jobPostings = [];
  findScrapJobs().then((res) => {
    jobPostings = res;
  });
  const scrapTagsPromise = findAllScrapTags();

  async function findScrapJobsAction(tag) {
    jobPostings = await findScrapJobs(tag);
  }

  async function findUntaggedScrapJobsAction() {
    jobPostings = await findUntaggedScrapJobs();
  }
</script>

<Layout>
  <div slot="content">
    <ul class="sc-e0579984-4 hkhKhq">
      <li on:click={() => findScrapJobsAction()}>전체</li>
      {#await scrapTagsPromise then scrapTags}
        {#each scrapTags.tags as scrapTag}
          <li on:click={() => findScrapJobsAction(scrapTag)}>
            {scrapTag}
          </li>
        {/each}
      {/await}
      <li on:click={findUntaggedScrapJobsAction}>그 외</li>
    </ul>
    <JobPostingList {jobPostings}></JobPostingList>
  </div>
</Layout>

<style>
  .hkhKhq {
    display: flex;
    margin-left: -20px;
    list-style: none;
  }
  .hkhKhq > li {
    position: relative;
    padding: 0px 20px;
    cursor: pointer;
  }
</style>
