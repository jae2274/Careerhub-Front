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
  import {initPage, promiseInfo} from "~/view/job_posting/promiseStore";

  let listElement;
  let isWaitingTimeout = false;

  if ($promiseInfo.queryStr != $querystring) {
    promiseInfo.init($querystring);
    query.initQuery(parseQuery($querystring));
  }

  $: !request.setQuery($query) && promiseInfo.setPage(initPage);

  let initialized = $promiseInfo.promises.length == 0;
  $: initialized ? callList($request, $promiseInfo.page) : (initialized = true);

  function callList(request, page) {
    if (page == initPage) {
      const queryStr = createQuery(request, page, false);
      const url = `${$location}${queryStr}`;
      replace(url);

      promiseInfo.init(!queryStr || queryStr.replace("?", ""));
    }
    promiseInfo.addPromise(callListApi(request, page));

    return $promiseInfo.promises;
  }

  function callListApi(request, page) {
    return findJobPostings(createQuery(request, page, true));
  }

  // 스크롤을 최하단까지 내렸을 때 페이지를 증가시키는 이벤트
  onMount(() => {
    listElement.addEventListener("scroll", () => {
      if (isScrollEnded() && !isWaitingTimeout) {
        isWaitingTimeout = true;

        setTimeout(() => {
          isWaitingTimeout = false;
          if (isScrollEnded()) {
            promiseInfo.setPage($promiseInfo.page + 1);
          }
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
