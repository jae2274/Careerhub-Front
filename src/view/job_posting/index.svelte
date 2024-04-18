<script>
  import JobPostingList from "~/view/job_posting/index/JobPostingList.svelte";
  import SearchQuery from "~/view/job_posting/index/SearchQuery.svelte";
  import {onMount, onDestroy} from "svelte";
  import {request} from "~/view/job_posting/index/store";

  let listElement;
  let isWaitingTimeout = false;
  onMount(() => {
    console.log("listElm is defined");
    listElement.addEventListener("scroll", () => {
      console.log("scrolling...");
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
</script>

<div class="hdErFU" bind:this={listElement}>
  <SearchQuery></SearchQuery>
  <JobPostingList />
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
