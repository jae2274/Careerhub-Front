<script>
  import Header from "~/components/Header.svelte";
  import JobPostingList from "~/components/jobPostingList/JobPostingList.svelte";
  import SearchQuery from "~/components/query/SearchQuery.svelte";
  import {onMount, onDestroy} from "svelte";

  import {
    findJobPostings,
    countJobPostings,
    createUrlParams,
    createUrlParamsForCount,
  } from "~/view/job_posting/api";
  import {initPage} from "~/view/job_posting/store";
  import {query} from "~/components/query/store";
  import {parseQuery, parsePagination} from "~/components/query/utils";
  import {querystring, push, location} from "svelte-spa-router";

  let listElement;

  const pageObj = parsePagination($querystring);

  let currentPage = pageObj.page;
  let pageSize = pageObj.size;
  query.initQuery(parseQuery($querystring));

  $: count = 0;
  $: pageCount = Math.ceil(count / pageSize);
  $: pageNumbers = setPagenation(pageCount, currentPage);
  $: getCount($query);
  $: jobPostings = [];
  $: getJobPostings(currentPage, pageSize, $query);

  function setPagenation(pageCount, currentPage = 1) {
    const minPageNum = Math.max(1, currentPage - 7);
    const maxPageNum = Math.min(minPageNum + 14, pageCount);

    return Array.from(
      {length: maxPageNum - minPageNum + 1},
      (_, i) => minPageNum + i
    );
  }

  async function getPageJobPostings(page) {
    currentPage = page;
  }

  async function getJobPostings(page, size, query) {
    const queryStr = createUrlParams({page: page, size, query});

    const url = `${$location}${queryStr}`;
    push(url);

    jobPostings = await findJobPostings(queryStr);
  }

  async function getCount(query) {
    count = (await countJobPostings(createUrlParamsForCount(query))).count;
  }

  function convertPageString(pageNum) {
    if (pageNum < 10) {
      return `0${pageNum}`;
    }
    return `${pageNum}`;
  }
</script>

<Header />
<div class="hdErFU" bind:this={listElement}>
  <SearchQuery></SearchQuery>
  <div class="jobPostingList">
    <JobPostingList {jobPostings} />
  </div>
  <div class="paginate">
    {#if pageCount > 1}
      <span on:click={() => getPageJobPostings(1)}>first</span>
    {/if}
    {#each pageNumbers as pageNum}
      <span
        on:click={() => getPageJobPostings(pageNum)}
        class:bold={currentPage === pageNum}>{convertPageString(pageNum)}</span
      >
    {/each}

    {#if pageCount > 1}
      <span on:click={() => getPageJobPostings(pageCount)}>last</span>
    {/if}
  </div>
</div>

<style>
  :global(.hdErFU) {
    background-color: rgb(255, 255, 255);
    font-size: 16px;
    padding-top: 120px;
    padding-bottom: 0.1px;
    overflow-y: scroll;
    height: 100%;
  }

  .paginate {
    text-align: center;
    margin-bottom: 20px;
  }

  .paginate span {
    margin-right: 5px;
  }
  .bold {
    font-weight: bold;
  }
</style>
