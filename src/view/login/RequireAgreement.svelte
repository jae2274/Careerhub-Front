<script>
  import {agreements} from "~/view/login/store";
  export let authToken;

  $: totalAgree = $agreements.reduce((acc, cur) => {
    return acc && cur.isAgree;
  }, true);

  function signInAction() {
    window.postMessage({authToken, additionalAgreements: $agreements});
  }
</script>

<div class="sc-449546b7-5 hZseKN">
  <div class="sc-7ed7b6f6-0 gljHiu">
    <input
      id="totalAgree"
      class="sc-bcPKhP icoaXV"
      type="checkbox"
      name="totalAgree"
      bind:checked={totalAgree}
      on:click={() => agreements.switchTotalAgreements(!totalAgree)}
    /><label for="totalAgree"
      ><strong>전체 동의</strong><em class="optional">
        (선택 항목에 대한 동의 포함)</em
      ></label
    >
  </div>
  <hr class="sc-449546b7-7 gDQzLl" />
  {#each $agreements as agreement}
    <div class="sc-449546b7-6 cIWAOJ">
      <div class="sc-7ed7b6f6-0 gljHiu">
        <input
          id="fifteenYearOver"
          class="sc-bcPKhP icoaXV"
          type="checkbox"
          name="fifteenYearOver"
          bind:checked={agreement.isAgree}
          on:click={() => agreements.switchAgreement(agreement.agreementId)}
        /><label for="fifteenYearOver"
          >{agreement.summary}<em class="required">
            {#if agreement.required}
              &nbsp;(필수)
            {/if}
          </em></label
        >
      </div>
    </div>
  {/each}
</div>
<button
  aria-disabled={totalAgree ? "false" : "true"}
  type="button"
  class="sc-4581d57a-0 REWlo"
  on:click={signInAction}>로그인</button
>
