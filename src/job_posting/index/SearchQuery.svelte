<script>
  //   import CategoryList from "~/job_posting/index/CategoryList.svelte";
  import TechStack from "~/job_posting/index/TechStack.svelte";
  import CareerQuery from "~/job_posting/index/CareerQuery.svelte";
  //   import {category} from "~/job_posting/index/api";

  //   let categories = category();
</script>

<div class="cCZWVz">
  <!-- <section class="sc-JkixQ cCZWVz">
    {#await categories}
      <span>Loading...</span>
    {:then categories}
      <CategoryList {categories}></CategoryList>
    {:catch error}
      <span>Fail!</span>
    {/await}
  </section> -->
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
</style>
