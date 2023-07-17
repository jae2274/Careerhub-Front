<script>
  import Router from 'svelte-spa-router'
  import { onMount, onDestroy } from "svelte";    

  import routes from '~/routes'
</script>

<Router {routes} restoreScrollState={true}></Router>

<style>

  </style>
