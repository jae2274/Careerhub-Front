<script>
  import {agreements} from "~/view/login/store";

  $: totalAgree = $agreements.reduce((acc, cur) => {
    return acc && cur.isAgree;
  }, true);
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

<style>
  .hZseKN {
    margin: 28px 0px;
  }
  .hZseKN > div {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
  }

  .cIWAOJ > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .icoaXV {
    cursor: pointer;
    width: 24px;
    min-width: 24px;
    max-width: 24px;
    height: 24px;
    border: 1.2px solid rgb(212, 212, 212);
    background-color: rgb(255, 255, 255);
    border-radius: 3.6px;
    vertical-align: middle;
    padding: 0px;
    outline: none !important;
  }

  .hZseKN .optional {
    color: rgb(136, 136, 136);
  }
  em,
  address {
    font-style: normal;
  }
  .hZseKN .required {
    color: rgb(240, 68, 82);
  }

  .icoaXV:checked {
    border-color: rgb(0, 221, 109);
    background: url(/attach-checked.svg) center center no-repeat !important; /* 임의로 pulic 디렉토리 바로 아래에 배치한 이미지 파일들을 별도로 디렉토리 분리하기 */
  }
</style>
