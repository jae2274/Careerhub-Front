<script>
  import SearchQuery from "~/components/query/SearchQuery.svelte";
  import {addCondition} from "~/view/my/match-job/api";
  import {query} from "~/components/query/store";
  import {push} from "svelte-spa-router";

  function addMatchJob() {
    addCondition({
      conditionName: "matchJob",
      query: $query,
    });
    push("/my/match-job");
  }
</script>

<button on:click={addMatchJob}>추가</button>
<SearchQuery></SearchQuery>
