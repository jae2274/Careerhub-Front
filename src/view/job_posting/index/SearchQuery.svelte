<script>
  import CategoryList from "~/view/job_posting/index/CategoryList.svelte";
  import TechStack from "~/view/job_posting/index/TechStack.svelte";
  import CareerQuery from "~/view/job_posting/index/CareerQuery.svelte";
  import {category} from "~/view/job_posting/index/api";
  import {request} from "~/view/job_posting/index/store";

  $: isSelectAnyone = $request.categories && $request.categories.length > 0;
  $: promiseCategories = category();

  function clearCategoryQuery() {
    request.clearCategory();
  }
</script>

<div class="cCZWVz">
  <section class="sc-JkixQ cCZWVz caregoryQuery">
    {#await promiseCategories}
      <span>Loading...</span>
    {:then categories}
      <button
        type="button"
        class="sc-pVTFL"
        class:selected={!isSelectAnyone}
        on:click={clearCategoryQuery}>전체</button
      >
      {#each categories.categoriesBySite as categoryBySite}
        <span>From {categoryBySite.site}</span>
        <CategoryList {categoryBySite}></CategoryList>
      {/each}
    {:catch error}
      <span>Fail!</span>
    {/await}
  </section>
  <div class="queryBox">
    <TechStack />
    <CareerQuery />
  </div>
</div>

<style>
  .cCZWVz {
    max-width: 1060px;
    margin: 32px auto 50px;
  }

  .queryBox {
    display: flex;
  }

  :global(.caregoryQuery div) {
    display: block;
  }

  :global(.caregoryQuery button) {
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

  :global(.caregoryQuery .selected) {
    color: rgb(255, 255, 255);
    border: 1px solid rgb(0, 221, 109);
    background-color: rgb(0, 221, 109);
    font-weight: bold;
  }
</style>
