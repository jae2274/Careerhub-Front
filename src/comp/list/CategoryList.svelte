<script>
    import { request } from "./store";

    export let categories

    $: categories = categories.map(category => {
        if( $request.categoryIds.includes(category.id) ) {
            category.selected=true;
        }else{
            category.selected=false;
        }
        
        return category;
    })

    $: isSelectAnyone = categories.map(it=>it.selected).reduce((prev, next) =>prev||next)

    function switchSelected(categoryId, selected){
        if(selected)
            request.removeCategory(categoryId)
        else
            request.addCategory(categoryId)
    }
</script>

<div class="list_job_btn_wrap">
    <button type="button" class="sc-pVTFL" class:selected={!isSelectAnyone}>전체</button>
    {#each categories as {defaultName, id, selected}}
    <button type="button" 
        on:click={()=>switchSelected(id, selected)}
        class:selected={selected}
    >{defaultName}</button>
    {/each}
</div>

<style>

    div {
        display: block;
    }
    button {
        margin: 0px 10px 10px 0px;
        background-color: rgb(255, 255, 255);
        padding: 3px 16px;
        font-size: 16px;
        line-height: 32px;
        letter-spacing: -0.5px;
        border-radius: 20px;
        border: 1px solid rgb(228, 228, 228);
        color: rgb(68, 68, 68);
    }

    .selected {
        color: rgb(255, 255, 255);
        border: 1px solid rgb(0, 221, 109);
        background-color: rgb(0, 221, 109);
        font-weight: bold;
    }
</style>