<script>
  import CategoryList from "~/components/query/CategoryList.svelte";
  import TechStack from "~/components/query/TechStack.svelte";
  import CareerQuery from "~/components/query/CareerQuery.svelte";
  import CompanyQuery from "~/components/query/CompanyQuery.svelte";
  import {category} from "~/components/query/api";
  import {query} from "~/components/query/store";

  $: isSelectAnyone = $query.categories && $query.categories.length > 0;
  $: promiseCategories = category();

  function clearCategoryQuery() {
    query.clearCategory();
  }
</script>

<div class="cCZWVz">
  <section class="sc-JkixQ cCZWVz caregoryQuery">
    {#await promiseCategories}
      <span>Loading...</span>
    {:then categories}
      <div class="list_job_btn_wrap">
        <button
          type="button"
          class="sc-pVTFL"
          class:selected={!isSelectAnyone}
          on:click={clearCategoryQuery}>전체</button
        >
      </div>
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
    <CompanyQuery />
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
