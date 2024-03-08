<script>
  import {request} from "~/job_posting/index/store";

  export let categoryBySite;

  S: categoryObjects = categoryBySite.categories.map((category) => {
    return {selected: false, categoryName: category, site: categoryBySite.site};
  });
  $: adjustSelectedCategories = adjustSelected($request);

  $: isSelectAnyone = adjustSelectedCategories
    .map((it) => it.selected)
    .reduce((prev, next) => prev || next);

  function adjustSelected(request) {
    return categoryObjects.map((category) => {
      category.selected = false;

      for (const reqCategory of request.categories) {
        if (
          reqCategory.site == category.site &&
          reqCategory.categoryName == category.categoryName
        ) {
          category.selected = true;
          return category;
        }
      }

      return category;
    });
  }

  function switchSelected(site, categoryName, selected) {
    if (selected) request.removeCategory(site, categoryName);
    else request.addCategory(site, categoryName);
  }
</script>

<div class="list_job_btn_wrap">
  <button type="button" class="sc-pVTFL" class:selected={!isSelectAnyone}
    >전체</button
  >
  {#each adjustSelectedCategories as { site, categoryName, selected }}
    <button
      type="button"
      on:click={() => switchSelected(site, categoryName, selected)}
      class:selected>{categoryName}</button
    >
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
