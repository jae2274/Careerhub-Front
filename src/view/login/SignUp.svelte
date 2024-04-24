<script>
  import {signUp} from "~/view/login/api";
  export let authToken;
  export let agreements;

  const backUrl = document.referrer | "/";
  export let email;
  export let username;
  $: totalAgree = agreements.reduce((acc, cur) => {
    return acc && cur.isAgree;
  }, true);
  $: reqiredAgreements = agreements.filter((agreement) => agreement.required);
  $: totalRequired = reqiredAgreements.reduce((acc, cur) => {
    return acc && cur.isAgree;
  }, true);
  $: isValid = totalRequired && username;

  function switchTotalAgree() {
    if (totalAgree) {
      agreements = agreements.map((agreement) => {
        agreement.isAgree = false;
        return agreement;
      });
    } else {
      agreements = agreements.map((agreement) => {
        agreement.isAgree = true;
        return agreement;
      });
    }
  }

  async function signUpAction() {
    if (checkValid()) {
      await signUp(authToken, username, agreements);
      window.postMessage({authToken});
    }
  }

  function checkValid() {
    if (!username) {
      alert("이름을 입력해주세요.");
      return false;
    }

    if (!totalRequired) {
      alert("필수 항목에 동의해주세요.");
      return false;
    }
    return true;
  }
</script>

<div class="sc-449546b7-0 fNoeJZ">
  <h1><strong>회원가입</strong></h1>
  <form>
    <div class="sc-449546b7-8 eUPBEx">
      <div class="sc-7ed7b6f6-0 gljHiu sc-449546b7-2 fltwWN">
        <label for="email"
          >이메일<em class="sc-1f8961c5-1 kkTTBk"
            ><span class="blind">필수</span></em
          ></label
        ><input
          aria-disabled="false"
          aria-invalid="true"
          id="email"
          placeholder="이메일을 입력해 주세요."
          type="text"
          name="email"
          value={email}
          disabled
        />
      </div>
      <div class="sc-7ed7b6f6-0 gljHiu sc-449546b7-3 laohHo">
        <label for="username"
          >이름<em class="sc-1f8961c5-1 kkTTBk"
            ><span class="blind">필수</span></em
          ></label
        ><input
          aria-disabled="false"
          aria-invalid="true"
          id="username"
          maxlength="15"
          placeholder="이름을 입력해주세요."
          type="text"
          name="username"
          bind:value={username}
        />
      </div>
      <div class="sc-449546b7-5 hZseKN">
        <div class="sc-7ed7b6f6-0 gljHiu">
          <input
            id="totalAgree"
            class="sc-bcPKhP icoaXV"
            type="checkbox"
            name="totalAgree"
            bind:checked={totalAgree}
            on:click={switchTotalAgree}
          /><label for="totalAgree"
            ><strong>전체 동의</strong><em class="optional">
              (선택 항목에 대한 동의 포함)</em
            ></label
          >
        </div>
        <hr class="sc-449546b7-7 gDQzLl" />
        {#each agreements as agreement}
          <div class="sc-449546b7-6 cIWAOJ">
            <div class="sc-7ed7b6f6-0 gljHiu">
              <input
                id="fifteenYearOver"
                class="sc-bcPKhP icoaXV"
                type="checkbox"
                name="fifteenYearOver"
                bind:checked={agreement.isAgree}
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
        aria-disabled={isValid ? "false" : "true"}
        type="button"
        class="sc-4581d57a-0 REWlo"
        on:click={signUpAction}>회원가입</button
      >
    </div>
  </form>
</div>

<style>
  div {
    display: block;
    unicode-bidi: isolate;
  }
  h1 {
    font-size: 34px;
    font-weight: 500;
    line-height: 50px;
    text-align: center;
  }
  form {
    width: 340px;
    margin: 0px auto;
  }
  .fltwWN {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }
  .fltwWN > label {
    letter-spacing: -0.5px;
    color: rgb(34, 34, 34);
    margin-bottom: 6px;
  }
  input[type="text"] {
    width: 100%;
    height: 48px;
    padding: 12px 16px;
    border: 1px solid rgb(212, 212, 212);
    color: rgb(0, 0, 0);
    background: rgb(255, 255, 255);
    border-radius: 4px;
    letter-spacing: -1px;
    box-sizing: border-box;
  }
  .fltwWN {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 8px;
  }
  .kkTTBk {
    display: inline-block;
    position: relative;
  }
  .blind {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
  }
  .kkTTBk::after {
    display: inline-block;
    margin: 0px 0px 2px 6px;
    content: "";
    width: 5px;
    height: 5px;
    background-color: rgb(240, 68, 82);
    border-radius: 3px;
    position: absolute;
    top: -8px;
  }
  .laohHo {
    margin-top: 24px;
  }
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
  input {
    appearance: none;
  }
  strong {
    font-weight: bold;
  }
  .hZseKN .optional {
    color: rgb(136, 136, 136);
  }
  em,
  address {
    font-style: normal;
  }

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
  .hZseKN .required {
    color: rgb(240, 68, 82);
  }

  .icoaXV:checked {
    border-color: rgb(0, 221, 109);
    background: url(/attach-checked.svg) center center no-repeat !important; /* 임의로 pulic 디렉토리 바로 아래에 배치한 이미지 파일들을 별도로 디렉토리 분리하기 */
  }
</style>
