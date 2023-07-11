<script>
	import JobPostingList from "../comp/list/JobPostingList.svelte";
    import SearchQuery from "../comp/list/SearchQuery.svelte";
	import { onMount, onDestroy } from "svelte";    
    import { request } from "../comp/list/store";

    let listElement;
    onMount(() => {
			console.log("listElm is defined");
			listElement.addEventListener("scroll",  ()=>{
				console.log("scrolling...")
				if (
					listElement.scrollTop + listElement.clientHeight >=
					listElement.scrollHeight
				) {
					request.nextPage();
				}
			});
	});
	onDestroy(() => {
		listElement.removeEventListener("scroll");
	});
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