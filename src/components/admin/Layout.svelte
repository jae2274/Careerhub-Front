<script>
  import {getUsernameFromCookie} from "~/httputils.js";
  import {link} from "svelte-spa-router";
  import Header from "~/components/Header.svelte";
</script>

<Header></Header>
<main class="sc-86d8e5af-0 kmUkgn">
  <div>
    <div class="sc-3fbb18db-0 clYeIU">
      <div class="sc-3fbb18db-1 hzSLTk">
        <div>
          <h2>
            <a rel="noreferrer" target="_blank" href="/resumes"
              >{getUsernameFromCookie()}님
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 12 12"
                ><path
                  fill="#222"
                  fill-rule="evenodd"
                  d="M4.146 1.896a.5.5 0 0 1 .708 0l3.75 3.75a.5.5 0 0 1 0 .708l-3.75 3.75a.5.5 0 0 1-.708-.708L7.543 6 4.146 2.604a.5.5 0 0 1 0-.708Z"
                  clip-rule="evenodd"
                ></path></svg
              ></a
            >
          </h2>
          <div class="sc-4cabea4e-0 heJQkf">
            <ul class="sc-4cabea4e-1 fqgxdW">
              <li class="sc-4cabea4e-2 cdjpus">
                <a use:link href="/admin/user">유저</a>
              </li>
              <li class="sc-4cabea4e-2 cdjpus">
                <a use:link href="/admin/ticket">티켓</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sc-3fbb18db-2 jEzXte">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</main>

<style>
  .kmUkgn {
    background-color: rgb(255, 255, 255);
    font-size: 16px;
    padding-top: 120px;
    padding-bottom: 0.1px;
  }
  div {
    display: block;
    unicode-bidi: isolate;
  }
  .clYeIU {
    display: flex;
    justify-content: space-between;
    max-width: 1060px;
    margin: 0px auto;
    padding: 48px 0px 120px;
  }
  .hzSLTk {
    width: 210px;
    height: 200px;
  }
  .hzSLTk > div {
    position: fixed;
    content: "";
    display: block;
    width: 210px;
  }

  .hzSLTk > div > h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
    color: rgb(0, 0, 0);
    line-height: 30px;
  }
  a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  .hzSLTk > div svg {
    display: none;
  }
  ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    unicode-bidi: isolate;
  }
  ul,
  li {
    margin: 0px;
    padding: 0px;
  }
  ul {
    list-style: none;
  }
  .fqgxdW {
    width: 210px;
    position: relative;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
    unicode-bidi: isolate;
  }
  .cdjpus {
    font-size: 15px;
    color: rgb(34, 34, 34);
    margin-bottom: 24px;
    cursor: pointer;
    position: relative;
    font-weight: 400;
  }
  a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  .jEzXte {
    width: 900px;
    position: relative;
  }
</style>
