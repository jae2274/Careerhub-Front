<script>
  import JobPostingItem from "~/job_posting/index/JobPostingItem.svelte";
  import {
    findJobPostings,
    createQuery,
    parseQuery,
  } from "~/job_posting/index/api";
  import {initPage, request} from "~/job_posting/index/store";
  import {querystring, replace, location} from "svelte-spa-router";

  let promises = [];
  request.initRequest(parseQuery($querystring));

  $: callList($request);

  function callList(request) {
    if (request.page == initPage) {
      const url = `${$location}${createQuery(request, false)}`;
      replace(url);
      promises = [];
    }
    promises = [...promises, callListApi(request)];
  }

  function callListApi(request) {
    return findJobPostings(createQuery(request, true));
  }
</script>

<section class="sc-hgKiOD bPkSMN">
  {#each promises as promiseJobPostings}
    {#await promiseJobPostings}
      <div class="loading">Loading...</div>
    {:then jobPostings}
      {#each jobPostings.jobPostings as jobPosting, index}
        <JobPostingItem {jobPosting} delay={index * 200}></JobPostingItem>
      {/each}
    {/await}
  {/each}
</section>

<style>
  .bPkSMN {
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: flex-start;
    width: 1080px;
    margin: 0px auto;
    height: 100%;
    left: 0px;
  }
  .loading {
    width: 100%;
    height: 50px;
    background-color: rgb(0, 221, 109);
    text-align: center;
    font-size: 30px;
    color: white;
  }
</style>
