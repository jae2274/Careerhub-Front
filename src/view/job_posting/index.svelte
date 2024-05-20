<script>
  import Header from "~/components/Header.svelte";
  import JobPostingList from "~/components/jobPostingList/JobPostingList.svelte";
  import SearchQuery from "~/components/query/SearchQuery.svelte";
  import {onMount, onDestroy} from "svelte";

  import {findJobPostings, createQuery} from "~/view/job_posting/api";
  import {initPage, request} from "~/view/job_posting/store";
  import {query} from "~/components/query/store";
  import {parseQuery} from "~/components/query/utils";
  import {querystring, replace, location} from "svelte-spa-router";
  import {promiseInfo} from "~/view/job_posting/promiseStore";

  let listElement;
  let isWaitingTimeout = false;
  onMount(() => {
    listElement.addEventListener("scroll", () => {
      if (isScrollEnded() && !isWaitingTimeout) {
        isWaitingTimeout = true;

        setTimeout(() => {
          isWaitingTimeout = false;
          if (isScrollEnded()) request.nextPage();
        }, 250);
      }
    });
  });

  function isScrollEnded() {
    return (
      listElement.scrollTop + listElement.clientHeight + 1 >=
      listElement.scrollHeight
    );
  }

  // if ($promiseInfo.queryStr != $querystring) {
  //   promiseInfo.init($querystring);
  //   query.initQuery(parseQuery($querystring));
  // }

  $: request.setQuery($query);
  $: callList($request);

  function callList(request) {
    if (request.page == initPage) {
      const url = `${$location}${createQuery(request, false)}`;
      replace(url);
      promiseInfo.init($querystring);
    }
    promiseInfo.addPromise(callListApi(request));
  }

  function callListApi(request) {
    return findJobPostings(createQuery(request, true));
  }
</script>

<Header />
<div class="hdErFU" bind:this={listElement}>
  <SearchQuery></SearchQuery>
  <JobPostingList promises={$promiseInfo.promises} />
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
</style>
