<script>
  import Agreements from "~/view/login/Agreements.svelte";

  import {agreements} from "~/view/login/store";
  export let authToken;

  $: totalRequired = $agreements
    .filter((agreement) => agreement.required)
    .reduce((acc, cur) => {
      return acc && cur.isAgree;
    }, true);

  function signInAction() {
    if (checkValid()) {
      window.postMessage({authToken, additionalAgreements: $agreements});
    }
  }

  function checkValid() {
    if (!totalRequired) {
      alert("필수 항목에 동의해주세요.");
      return false;
    }
    return true;
  }
</script>

<h2>아래 항목에 대한 추가 동의를 진행해주세요</h2>
<Agreements />
<button
  aria-disabled={totalRequired ? "false" : "true"}
  type="button"
  class="sc-4581d57a-0 REWlo"
  on:click={signInAction}>로그인</button
>

<style>
  .REWlo:disabled,
  .REWlo[aria-disabled="true"] {
    color: rgb(255, 255, 255);
    background-color: rgb(196, 196, 196);
    cursor: not-allowed;
  }
  .eUPBEx > button {
    width: 100%;
  }

  .REWlo {
    padding: 0px 16px;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    height: 56px;
    min-width: 210px;
    border-radius: 8px;
    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0);
    cursor: pointer;
  }
</style>
