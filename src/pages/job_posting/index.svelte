<script>
	import JobPostingList from "../../job_posting/index/JobPostingList.svelte";
    import SearchQuery from "../../job_posting/index/SearchQuery.svelte";
	import { onMount, onDestroy } from "svelte";    
    import { request } from "../../job_posting/index/store";

    let listElement;
	let isWaitingTimeout = false
    onMount(() => {
			console.log("listElm is defined");
			listElement.addEventListener("scroll",  ()=>{
				console.log("scrolling...")
				if (isScrollEnded() && !isWaitingTimeout) {
					isWaitingTimeout = true;

					setTimeout(()=> {
						isWaitingTimeout = false;
						if(isScrollEnded()) request.nextPage();
					},250);
				}
			});
	});
	onDestroy(() => {
		listElement.removeEventListener("scroll");
	});

	function isScrollEnded(){
		return listElement.scrollTop + listElement.clientHeight + 1>=
					listElement.scrollHeight;
	}
</script>

<div class="hdErFU" bind:this={listElement}>

    <SearchQuery></SearchQuery>
    <JobPostingList/>

</div>
<style>
:global(.hdErFU){
    background-color: rgb(255, 255, 255);
    font-size: 16px;
    padding-top: 120px;
    padding-bottom: 0.1px;
    overflow-y: scroll;
    height: 100%;
}
</style>