<script>
  import {query} from "~/components/query/store";

  export let categoryBySite;

  S: categoryObjects = categoryBySite.categories.map((category) => {
    return {selected: false, categoryName: category, site: categoryBySite.site};
  });
  $: adjustSelectedCategories = adjustSelected($query);

  function adjustSelected(query) {
    return categoryObjects.map((category) => {
      category.selected = false;

      if (query.categories) {
        for (const reqCategory of query.categories) {
          if (
            reqCategory.site == category.site &&
            reqCategory.categoryName == category.categoryName
          ) {
            category.selected = true;
            return category;
          }
        }
      }

      return category;
    });
  }

  function switchSelected(site, categoryName, selected) {
    if (selected) query.removeCategory(site, categoryName);
    else query.addCategory(site, categoryName);
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
