<script>
  import {getAuthCodeUrls, signIn} from "~/view/login/api";
  import {
    setGrantTypeToCookie,
    setAccessTokenToCookie,
    setRefreshTokenToCookie,
  } from "~/httputils";
  import SignIn from "~/view/login/SignIn.svelte";
  import SignUp from "~/view/login/SignUp.svelte";

  const backUrl = document.referrer | "/";
  $: isNewUser = false;
  $: authToken = "";
  $: agreements = [];
  $: email = "";
  const apiResProms = getAuthCodeUrls();
  window.addEventListener("message", async function (e) {
    authToken = e.data;
    const res = await signIn(e.data);

    if (res.signInStatus == "success") {
      setGrantTypeToCookie(res.successRes.grantType);
      setAccessTokenToCookie(res.successRes.accessToken);
      setRefreshTokenToCookie(res.successRes.refreshToken);

      window.location.href = backUrl;
    } else if (res.signInStatus == "new_user") {
      email = res.newUserRes.email;
      agreements = res.newUserRes.agreements;
      isNewUser = true;
    }

    console.log(res);
  });
</script>

{#await apiResProms}
  <p>Loading...</p>
{:then apiRes}
  {#if isNewUser}
    <SignUp {authToken} {email} {agreements} />
  {:else}
    <SignIn authCodeUrls={apiRes.authCodeUrls} />
  {/if}
{/await}
