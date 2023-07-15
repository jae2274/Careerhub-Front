<script>
    import CategoryList from "./CategoryList.svelte";
    import TechStack from './TechStack.svelte';
    import { category } from "./api";

    let categories = category()
</script>

<div class="cCZWVz">
    <section class="sc-JkixQ cCZWVz">
        {#await categories}
        <span>Loading...</span>
        {:then categories} 
        <CategoryList {categories}></CategoryList>
        {:catch error}
        <span>Fail!</span>
        {/await}
    </section>
    <TechStack/>
</div>

<style>
.cCZWVz {
    max-width: 1060px;
    margin: 32px auto 50px;
}
</style>