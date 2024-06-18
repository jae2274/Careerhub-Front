<script>
  import {getAuthCodeUrls, signIn} from "~/view/login/api";
  import {
    setGrantTypeToCookie,
    setAccessTokenToCookie,
    setRefreshTokenToCookie,
    setUsernameToCookie,
    setRolesToCookie,
  } from "~/httputils";
  import SignIn from "~/view/login/SignIn.svelte";
  import SignUp from "~/view/login/SignUp.svelte";
  import RequireAgreement from "~/view/login/RequireAgreement.svelte";
  import {agreements, loginStore} from "~/view/login/store";

  import {pop} from "svelte-spa-router";
  import {getIsInitEvent, initEvent} from "~/view/login/initEvent";

  loginStore.reset();
  const apiResProms = getAuthCodeUrls();

  if (!getIsInitEvent()) {
    window.addEventListener("message", async function (e) {
      loginStore.setAuthToken(e.data.authToken);
      const additionalAgreements = e.data.additionalAgreements || [];
      const res = await signIn($loginStore.authToken, additionalAgreements);
      loginStore.setStatus(res.signInStatus);

      switch ($loginStore.status) {
        case "success":
          setGrantTypeToCookie(res.successRes.grantType);
          setAccessTokenToCookie(res.successRes.accessToken);
          setRefreshTokenToCookie(res.successRes.refreshToken);
          setUsernameToCookie(res.successRes.username);
          setRolesToCookie(res.successRes.roles);

          pop();
          break;
        case "new_user":
          loginStore.setEmail(res.newUserRes.email);
          loginStore.setUsername(res.newUserRes.username);

          agreements.set(res.newUserRes.agreements);
          break;
        case "necessary_agreements":
          agreements.set(res.necessaryAgreementsRes.agreements);
          break;
      }
    });
    initEvent();
  }

  $: authToken = $loginStore.authToken;
  $: email = $loginStore.email;
  $: status = $loginStore.status;
  $: username = $loginStore.username;
</script>

{#await apiResProms}
  <p>Loading...</p>
{:then apiRes}
  {#if status == "new_user"}
    <SignUp {authToken} {email} {agreements} {username} />
  {:else if status == "sign_in"}
    <SignIn authCodeUrls={apiRes.authCodeUrls} />
  {:else if status == "necessary_agreements"}
    <RequireAgreement {authToken} />
  {/if}
{/await}
