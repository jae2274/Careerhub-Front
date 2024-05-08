<script>
  import Layout from "~/components/my/Layout.svelte";
  import JobPostingList from "~/components/jobPostingList/JobPostingList.svelte";

  import {
    findAllScrapTags,
    findScrapJobs,
    findUntaggedScrapJobs,
  } from "~/view/my/scrap-job/api";
  let promises = [];
  promises = [...promises, findScrapJobs()];
  const scrapTagsPromise = findAllScrapTags();

  function findScrapJobsAction(tag) {
    promises = [findScrapJobs(tag)];
  }

  function findUntaggedScrapJobsAction() {
    promises = [findUntaggedScrapJobs()];
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
    <JobPostingList {promises}></JobPostingList>
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
