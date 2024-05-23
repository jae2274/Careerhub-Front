<script>
  import JobPostingItem from "~/components/jobPostingList/JobPostingItem.svelte";

  export let jobPostings = [];
</script>

<section class="sc-hgKiOD bPkSMN">
  {#if jobPostings && jobPostings.length !== 0}
    {#each jobPostings as jobPosting, index}
      <JobPostingItem {jobPosting} delay={200}></JobPostingItem>
    {/each}
  {/if}
</section>

<style>
  .bPkSMN {
    z-index: 2;
    display: flex;
    flex-wrap: wrap;
    -webkit-box-pack: start;
    justify-content: flex-start;
    width: 1080px;
    margin: 0px auto;
    height: 100%;
    left: 0px;
  }
  .loading {
    width: 100%;
    height: 50px;
    background-color: rgb(0, 221, 109);
    text-align: center;
    font-size: 30px;
    color: white;
  }
</style>
