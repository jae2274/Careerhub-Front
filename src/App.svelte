<script>
  import Router from "svelte-spa-router";
  import {onMount, onDestroy} from "svelte";
  import Header from "~/components/Header.svelte";

  import view from "~/view";
</script>

<Header></Header>
<Router routes={view} restoreScrollState={true}></Router>

<style>
</style>
