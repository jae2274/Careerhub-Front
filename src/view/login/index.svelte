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

  const backUrl = document.referrer | "/";
  $: status = "sign_in";
  $: authToken = "";
  $: agreements = [];
  $: additionalAgreements = [];
  $: email = "";
  $: username = "";

  const apiResProms = getAuthCodeUrls();

  window.addEventListener("message", async function (e) {
    authToken = e.data.authToken;
    additionalAgreements = e.data.additionalAgreements || [];
    const res = await signIn(authToken, additionalAgreements);

    if (res.signInStatus == "success") {
      setGrantTypeToCookie(res.successRes.grantType);
      setAccessTokenToCookie(res.successRes.accessToken);
      setRefreshTokenToCookie(res.successRes.refreshToken);
      setUsernameToCookie(res.successRes.username);
      setRolesToCookie(res.successRes.roles);

      window.location.href = backUrl;
    } else if (res.signInStatus == "new_user") {
      agreements = res.newUserRes.agreements;
      email = res.newUserRes.email;
      username = res.newUserRes.username;

      status = "new_user";
    } else if (res.signInStatus == "necessary_agreements") {
      additionalAgreements = res.necessaryAgreementsRes.agreements;
      status = "necessary_agreements";
    }

    console.log(res);
  });
</script>

{#await apiResProms}
  <p>Loading...</p>
{:then apiRes}
  {#if status == "new_user"}
    <SignUp {authToken} {email} {agreements} {username} />
  {:else if status == "sign_in"}
    <SignIn authCodeUrls={apiRes.authCodeUrls} />
  {:else if status == "necessary_agreements"}
    <RequireAgreement {authToken} {additionalAgreements} />
  {/if}
{/await}
