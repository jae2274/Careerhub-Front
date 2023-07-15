<script>
	import JobPostingItem from "./JobPostingItem.svelte"
    import { findJobPostings, createQuery } from "./api";
    import { request } from "./store";

	
	let promises = []

	$: {
		if($request.page == 1){
			promises = []
		}
		promises = [...promises,callListApi($request)]
	}

    function callListApi(request){
        return findJobPostings(request)
    }
</script>
<section class="sc-hgKiOD bPkSMN">
	{#each promises as promiseJobPostings}
		{#await promiseJobPostings}
			<div>Loading...</div>
		{:then jobPostings}
			{#each jobPostings as jobPosting, index}
			<JobPostingItem {jobPosting} delay={index*200}></JobPostingItem>
			{/each}	
		{/await}
	{/each}
</section>
<style>
	.bPkSMN {
		z-index: 2;
		display: flex;
		flex-wrap: wrap;
		-webkit-box-pack: start;
		justify-content: flex-start;
		width: 1080px;
		margin: 0px auto;
		height: 100%;
		left: 0px;
	}
</style>
