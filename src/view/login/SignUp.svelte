<script>
  import Agreements from "~/view/login/Agreements.svelte";
  import {signUp} from "~/view/login/api";
  import {agreements} from "~/view/login/store";

  export let authToken;

  const backUrl = document.referrer | "/";
  export let email;
  export let username;

  $: totalRequired = $agreements
    .filter((agreement) => agreement.required)
    .reduce((acc, cur) => {
      return acc && cur.isAgree;
    }, true);
  $: isValid = totalRequired && username;

  async function signUpAction() {
    if (checkValid()) {
      await signUp(authToken, username, $agreements);
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
      <Agreements />
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
  input {
    appearance: none;
  }
  strong {
    font-weight: bold;
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
</style>
