<script>
  import Header from "~/components/Header.svelte";

  export let params = {};
  import {getPostingDetail} from "~/view/job_posting/postingId/api";
  import Detail from "~/view/job_posting/postingId/Detail.svelte";

  const promisePostingDetail = getPostingDetail(params.site, params.postingId);
</script>

<Header />
{#await promisePostingDetail then postingDetail}
  <Detail {postingDetail}></Detail>
{/await}
