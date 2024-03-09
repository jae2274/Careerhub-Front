<script>
  import {request} from "~/job_posting/index/store";

  export let categoryBySite;

  S: categoryObjects = categoryBySite.categories.map((category) => {
    return {selected: false, categoryName: category, site: categoryBySite.site};
  });
  $: adjustSelectedCategories = adjustSelected($request);

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
  {#each adjustSelectedCategories as { site, categoryName, selected }}
    <button
      type="button"
      on:click={() => switchSelected(site, categoryName, selected)}
      class:selected>{categoryName}</button
    >
  {/each}
</div>
