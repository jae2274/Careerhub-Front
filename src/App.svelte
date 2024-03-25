<script>
  import Router from "svelte-spa-router";
  import {onMount, onDestroy} from "svelte";
  import Header from "~/components/Header.svelte";

  import routes from "~/routes";
</script>

<Header></Header>
<Router {routes} restoreScrollState={true}></Router>

<style>
</style>
