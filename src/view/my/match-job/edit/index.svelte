<script>
  import SearchQuery from "~/components/query/SearchQuery.svelte";
  import {updateCondition} from "~/view/my/match-job/api";
  import {query} from "~/components/query/store";
  import {querystring, push} from "svelte-spa-router";
  import {decodeQuery} from "~/components/query/utils";

  export let params = {};

  const conditionId = params.conditionId;

  const queryParams = new URLSearchParams($querystring);

  const encodedQuery = queryParams.get("encoded_query");

  const q = decodeQuery(encodedQuery);
  query.initQuery(q);

  async function updateMatchJob() {
    await updateCondition({
      conditionId,
      conditionName: "matchJob",
      query: $query,
    });
    push("/my/match-job");
  }
</script>

<button on:click={updateMatchJob}>변경</button>
<SearchQuery></SearchQuery>
