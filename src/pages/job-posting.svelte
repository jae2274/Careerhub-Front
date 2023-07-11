<script>
	import JobPostingList from "../comp/list/JobPostingList.svelte";
    import SearchQuery from "../comp/list/SearchQuery.svelte";
    import { findJobPostings, createQuery } from "../comp/list/api";
    import { request } from "../comp/list/store";

    const query = location.search
    let jobPostings = findJobPostings(query);
    $:jobPostings = callListApi($request)

    function callListApi(request){
        const query = createQuery(request)
        return findJobPostings(query)
    }
</script>

<div class="hdErFU">

    <SearchQuery></SearchQuery>

    {#await jobPostings}
        <span>...Loading</span>
    {:then jobPostings} 
        <JobPostingList {jobPostings}/>
    {:catch error}
        <span>Failed!</span>
    {/await}
</div>
<style>
:global(.hdErFU){
    background-color: rgb(255, 255, 255);
    font-size: 16px;
    padding-top: 120px;
    padding-bottom: 0.1px;
}
</style>