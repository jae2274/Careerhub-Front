<script>
  import SearchQuery from "~/components/query/SearchQuery.svelte";
  import {addCondition} from "~/view/my/match-job/api";
  import {query} from "~/components/query/store";
  import {push} from "svelte-spa-router";
  import Layout from "~/components/my/Layout.svelte";
  query.clearQuery();
  async function addMatchJob() {
    const body = await addCondition({
      conditionName: "matchJob",
      query: $query,
    });

    if (!body.isSuccess) {
      alert("맞춤채용조건 추가에 실패하였습니다.");
    }
    push("/my/match-job");
  }
</script>

<Layout>
  <div slot="content">
    <button on:click={addMatchJob}>추가</button>
    <SearchQuery></SearchQuery>
  </div>
</Layout>
