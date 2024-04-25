<script>
  export let authCodeUrls;
</script>

<div class="sc-449546b7-9 jzmuak">
  {#each authCodeUrls as authCodeUrl}
    <a href={authCodeUrl.url} target="_blank" rel="opener">
      <button type="button"
        ><span style="display:flex"
          ><span class="blind">{authCodeUrl.authServer} 로그인</span></span
        ></button
      >
    </a>
  {/each}
</div>
