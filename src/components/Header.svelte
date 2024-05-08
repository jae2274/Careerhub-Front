<script>
  import {link} from "svelte-spa-router";
  import {getCookie, deleteAllCookies} from "~/cookie.js";
  import {isLogin, getUsernameFromCookie} from "~/httputils.js";

  let isLoginValue = isLogin();
  let username = getUsernameFromCookie();
  let isHidedProfile = true;
  function switchProfileList(isShow) {
    isHidedProfile = !isShow;
    console.log("switchProfileList" + isShow);
  }

  function logout() {
    deleteAllCookies();
    grantType = null;
    accessToken = null;
    refreshToken = null;
  }
</script>

<header class="sc-e0579984-0 fkDWvK">
  <div class="sc-e0579984-1 crWJDg">
    <nav aria-label="Main navigation" class="sc-e0579984-3 hTjgMJ">
      <ul class="sc-e0579984-4 hkhKhq">
        <li>
          <a
            use:link
            aria-current="page"
            class="sc-e0579984-5 dBdbkC"
            href="/job_posting">개발자 채용</a
          >
        </li>
      </ul>
      <ul class="sc-e0579984-6 iEFHAz">
        {#if isLoginValue}
          <li
            on:mouseover={() => switchProfileList(true)}
            on:mouseleave={() => switchProfileList(false)}
          >
            <div class="sc-e0579984-7 cXmSGh">
              <button type="button">{username}</button><span>님</span><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
                ><path
                  fill="#222"
                  fill-rule="evenodd"
                  d="M13.472 5.195c.26.26.26.683 0 .943l-5 5a.667.667 0 0 1-.943 0l-5-5a.667.667 0 1 1 .943-.943L8 9.724l4.529-4.529c.26-.26.682-.26.943 0Z"
                  clip-rule="evenodd"
                ></path></svg
              >
            </div>
            <div class="sc-e0579984-8 fUNPNd" class:hide={isHidedProfile}>
              <ul>
                <li><a use:link href="/my/match-job">마이페이지</a></li>
                <li>
                  <button type="button" on:click={logout}>로그아웃</button>
                </li>
              </ul>
            </div>
          </li>
        {:else}
          <li>
            <a use:link href="/login" rel="referrer">회원가입/로그인</a>
          </li>
        {/if}
      </ul>
    </nav>
  </div>
</header>

<style>
  .arrow_up {
    transform: rotate(-180deg);
    transition:
      transform 0.2s ease-in-out 0s,
      -webkit-transform 0.2s ease-in-out 0s;
  }

  .fkDWvK {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 10;
    background-color: rgb(255, 255, 255);
    width: 100%;
    border-bottom: 1px solid rgb(228, 228, 228);
  }

  .crWJDg {
    position: relative;
    max-width: 1060px;
    margin: 0px auto;
  }

  .hTjgMJ {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
  }

  .hkhKhq {
    display: flex;
    margin-left: -20px;
  }

  .hkhKhq > li {
    position: relative;
    padding: 0px 20px;
  }

  .dBdbkC[aria-current="page"] {
    font-weight: 700;
  }

  .iEFHAz {
    display: flex;
    margin-right: -12px;
  }

  .iEFHAz li {
    position: relative;
    padding: 0px 12px;
  }

  .cXmSGh {
    display: flex;
    align-items: center;
  }

  .iEFHAz li > a,
  .iEFHAz li button {
    display: inline-block;
    position: relative;
    padding: 10px 0px;
    font-size: 15px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.5px;
    color: rgb(34, 34, 34);
  }

  .cXmSGh span {
    padding-bottom: 1px;
  }

  .cXmSGh svg {
    margin-left: 5px;
  }
  .cXmSGh svg path {
    fill: rgb(204, 204, 204);
  }

  .fUNPNd {
    position: absolute;
    width: 175px;
    right: 0px;
    border: 1px solid rgb(228, 228, 228);
    box-sizing: border-box;
    box-shadow: rgba(20, 20, 20, 0.12) 0px 8px 16px;
    border-radius: 4px;
    padding: 8px 0px;
    background-color: rgb(255, 255, 255);
  }

  .hide {
    display: none;
  }

  header,
  nav,
  aside,
  main,
  article,
  section,
  footer {
    display: block;
  }

  html,
  body,
  header,
  nav,
  aside,
  main,
  article,
  section,
  footer,
  h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  li,
  dl,
  dt,
  dd,
  p,
  pre,
  em,
  address,
  blockquote,
  q,
  form,
  fieldset,
  input,
  textarea,
  select,
  button,
  iframe {
    margin: 0px;
    padding: 0px;
  }

  div {
    display: block;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  ul,
  ol {
    list-style: none;
  }
  a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  .iEFHAz li > a,
  .iEFHAz li button {
    display: inline-block;
    position: relative;
    padding: 10px 0px;
    font-size: 15px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.5px;
    color: rgb(34, 34, 34);
  }
  .cXmSGh button {
    width: 60px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  button {
    border: none;
    border-radius: 0px;
    background: none;
    cursor: pointer;
    box-sizing: border-box;
    font-family: inherit;
  }
</style>
