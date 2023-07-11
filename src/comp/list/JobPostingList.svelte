<script>
	import JobPostingItem from "./JobPostingItem.svelte"

	export let jobPostings
</script>
<section class="sc-hgKiOD bPkSMN">
	{#each jobPostings as jobPosting}
	<JobPostingItem {jobPosting}></JobPostingItem>
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
