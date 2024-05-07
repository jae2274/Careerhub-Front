<script>
  export let params = {};
  import {getPostingDetail} from "~/view/job_posting/postingId/api";
  import Detail from "~/view/job_posting/postingId/Detail.svelte";

  const promisePostingDetail = getPostingDetail(params.site, params.postingId);
</script>

{#await promisePostingDetail then postingDetail}
  <Detail {postingDetail}></Detail>
{/await}
