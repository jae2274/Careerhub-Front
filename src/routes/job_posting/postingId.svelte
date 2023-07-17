<script>
    export let params = {}
    import { getPostingDetail } from "~/job_posting/postingId/api";
    import  Detail  from "~/job_posting/postingId/Detail.svelte"

    const promisePostingDetail = getPostingDetail(params.postingId)

</script>

{#await promisePostingDetail}
    
{:then postingDetail} 
    <Detail {postingDetail}></Detail>
{/await}