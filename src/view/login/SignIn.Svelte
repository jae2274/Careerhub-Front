<script>
  export let authCodeUrls;
</script>

<div class="sc-449546b7-9 jzmuak">
  {#each authCodeUrls as authCodeUrl}
    <a href={authCodeUrl.url} target="_blank" rel="opener">
      <button type="button"
        ><span style="display:flex"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            ><g fill="none" fill-rule="evenodd"
              ><path
                fill="#03C75A"
                d="M22 44C9.9 44 0 34.1 0 22S9.9 0 22 0s22 9.9 22 22-9.9 22-22 22"
              ></path><path
                fill="#FFF"
                d="m24.859 22.561-5.953-8.523H13.97v15.924h5.17V21.44l5.954 8.522h4.935V14.038h-5.17z"
              ></path></g
            ></svg
          ><span class="blind">{authCodeUrl.authServer} 로그인</span></span
        ></button
      >
    </a>
  {/each}
</div>
