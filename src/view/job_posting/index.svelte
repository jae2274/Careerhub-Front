<script>
  import Header from "~/components/Header.svelte";
  import JobPostingList from "~/components/jobPostingList/JobPostingList.svelte";
  import SearchQuery from "~/components/query/SearchQuery.svelte";
  import {onMount, onDestroy} from "svelte";

  import {findJobPostings, createQuery} from "~/view/job_posting/api";
  import {request} from "~/view/job_posting/store";
  import {query} from "~/components/query/store";
  import {parseQuery} from "~/components/query/utils";
  import {querystring, replace, location} from "svelte-spa-router";
  import {initPage, jobPostingInfo} from "~/view/job_posting/jobPostingStore";

  let listElement;
  let isWaitingTimeout = false;
  let needToInitScrollAnchor = true;

  if ($jobPostingInfo.queryStr != $querystring) {
    jobPostingInfo.init($querystring);
    query.initQuery(parseQuery($querystring));
  } else {
  }

  let initialized = $jobPostingInfo.jobPostings.length == 0;
  let page = $jobPostingInfo.page;

  $: setQuery($query);
  $: initialized ? callList($request, page) : (initialized = true);

  function setQuery(query) {
    request.setQuery(query);
    if (initialized) {
      page = 0;
    }
  }

  async function callList(request, page) {
    if (page == initPage) {
      const queryStr = createQuery(request, page, false);
      const url = `${$location}${queryStr}`;
      replace(url);

      jobPostingInfo.init(!queryStr || queryStr.replace("?", ""));
    }
    const resJobPostings = await callListApi(request, page);
    if (resJobPostings.length == 0) {
      return;
    }
    jobPostingInfo.addJobPostings(resJobPostings);
    jobPostingInfo.setPage(page);
    return $jobPostingInfo.jobPostings;
  }

  function callListApi(request, page) {
    return findJobPostings(createQuery(request, page, true));
  }

  function isScrollEnded() {
    return (
      listElement.scrollTop + listElement.clientHeight + 1 >=
      listElement.scrollHeight
    );
  }

  onMount(() => {
    if (needToInitScrollAnchor) {
      listElement.scrollTop = $jobPostingInfo.scrollAnchor - 518; //TODO: SearchQuery 컴포넌트에 의한 틀어짐 교정. 이후 리팩토링 필요
      console.log("set scrollAnchor", $jobPostingInfo.scrollAnchor);
      needToInitScrollAnchor = false;
    }
    listElement.addEventListener("scroll", () => {
      const scrollTop = listElement.scrollTop;
      jobPostingInfo.setScrollAnchor(scrollTop);
      console.log("scrollTop", scrollTop);
      if (isScrollEnded() && !isWaitingTimeout) {
        // jobPostingInfo.setScrollAnchor();

        isWaitingTimeout = true;

        setTimeout(() => {
          isWaitingTimeout = false;
          if (isScrollEnded()) {
            page += 1;
          }
        }, 250);
      }
    });
  });
</script>

<Header />
<div class="hdErFU" bind:this={listElement}>
  <SearchQuery></SearchQuery>
  <div class="jobPostingList">
    <JobPostingList jobPostings={$jobPostingInfo.jobPostings} />
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
</style>
