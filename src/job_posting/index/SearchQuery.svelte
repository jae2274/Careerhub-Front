<script>
    import CategoryList from "./CategoryList.svelte";
    import TechStack from './TechStack.svelte';
    import CareerQuery from './CareerQuery.svelte';
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
    <div class="queryBox">
        <TechStack/>
        <CareerQuery/>
    </div>
</div>

<style>
.cCZWVz {
    max-width: 1060px;
    margin: 32px auto 50px;
}

.queryBox{
    display: flex;
}
</style>