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
  let needToInitScrollAnchor = true;

  function completeListCallback() {
    if (needToInitScrollAnchor) {
      listElement.scrollTop = $promiseInfo.scrollAnchor;
      console.log("set scrollAnchor", $promiseInfo.scrollAnchor);

      needToInitScrollAnchor = false;
    }
  }
  if ($promiseInfo.queryStr != $querystring) {
    promiseInfo.init($querystring);
    query.initQuery(parseQuery($querystring));
  } else {
  }

  $: setQuery($query);

  let initialized = $promiseInfo.promises.length == 0;
  let page = $promiseInfo.page;

  $: initialized ? callList($request, page) : (initialized = true);

  function setQuery(query) {
    request.setQuery(query);
    page = 0;
  }

  function callList(request, page) {
    if (page == initPage) {
      const queryStr = createQuery(request, page, false);
      const url = `${$location}${queryStr}`;
      replace(url);

      promiseInfo.init(!queryStr || queryStr.replace("?", ""));
    }
    promiseInfo.addPromise(callListApi(request, page));
    promiseInfo.setPage(page);
    return $promiseInfo.promises;
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
    // 스크롤을 최하단까지 내렸을 때 페이지를 증가시키는 이벤트
    listElement.addEventListener("scroll", () => {
      const scrollTop = listElement.scrollTop;
      promiseInfo.setScrollAnchor(scrollTop);
      console.log("scrollTop", scrollTop);
      if (isScrollEnded() && !isWaitingTimeout) {
        // promiseInfo.setScrollAnchor();

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
<div class="hdErFU">
  <SearchQuery></SearchQuery>
  <div class="jobPostingList" bind:this={listElement}>
    <JobPostingList promises={$promiseInfo.promises} {completeListCallback} />
  </div>
</div>

<style>
  .hdErFU {
    background-color: rgb(255, 255, 255);
    font-size: 16px;
    padding-top: 120px;
    padding-bottom: 0.1px;
  }
  :global(.jobPostingList) {
    overflow-y: scroll;
    height: 1024px;
  }
</style>
