<script>
  import Layout from "../../../components/my/Layout.svelte";
  import {withdraw} from "~/view/my/withdrawal/api";
  import {deleteAllCookies} from "~/cookie.js";
  import {getAuthoritiesFromCookie} from "~/httputils.js";
  let isAllow = false;

  async function submitHandler(event) {
    if (
      getAuthoritiesFromCookie().includes("AUTHORITY_ADMIN") &&
      !confirm("해당 계정은 관리자 계정입니다. 탈퇴하시겠습니까?")
    ) {
      return;
    }
    withdraw();
    deleteAllCookies();
    alert("탈퇴되었습니다.");
    window.location.href = "#/login";
  }
</script>

<Layout>
  <div slot="content">
    <div class="sc-e7026bfb-2 gTYoky">
      <h1>계정 탈퇴</h1>
      <div class="sc-68540173-0 bMJSTc">
        <form novalidate="">
          <h3>
            ⚠️ 계정 탈퇴 전,<br class="sc-68540173-3 jQcUHD" /> 주의 사항을 꼭 확인해주세요!
          </h3>
          <ul class="sc-68540173-2 bUqJsr">
            <li>
              <dt>탈퇴 계정 복구 불가</dt>
              <dd>탈퇴 후에는 계정과 데이터 복구가 불가능합니다.</dd>
            </li>
            <li>
              <dt>개인 정보 삭제</dt>
              <dd>이메일, 전화번호 등의 개인정보는 탈퇴 즉시 삭제됩니다.</dd>
            </li>
          </ul>
          <div class="sc-68540173-1 gzzpXq">
            <div class="sc-3478a63b-0 dxBcNX default">
              <input
                autocomplete="off"
                id="agreement"
                class="sc-9c736514-0 dcoGOS"
                type="checkbox"
                name="agreement"
                bind:checked={isAllow}
              /><label for="agreement" class="sc-beab3720-0 lbwSup"
                >안내 사항을 모두 확인했으며 이에 동의합니다.</label
              >
            </div>
            <button
              disabled={!isAllow}
              type="submit"
              class="sc-b0913d02-0 sc-b0913d02-3 heyaGD"
              class:allow_btn={isAllow}
              class:disable_btn={!isAllow}
              on:click={submitHandler}>탈퇴하기</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</Layout>

<style>
  .gTYoky {
    width: 790px;
    position: relative;
  }
  .gTYoky > h1 {
    font-size: 24px;
    line-height: 32px;
    font-weight: 700;
    color: rgb(34, 34, 34);
  }

  @media (max-width: 1080px) {
    .bMJSTc {
      margin-top: 0px;
      padding: 8px 0px 60px;
    }
  }
  .bMJSTc {
    border-radius: 8px;
    background-color: rgb(247, 247, 247);
    margin-top: 24px;
    padding: 48px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .bMJSTc form {
    width: 430px;
  }
  .bMJSTc form h3 {
    font-size: 20px;
    line-height: 28px;
  }
  .jQcUHD {
    display: none;
  }
  .bUqJsr {
    margin-top: 20px;
    margin-bottom: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid rgb(228, 228, 228);
  }
  @media (max-width: 1080px) {
    .bUqJsr {
      margin-top: 16px;
    }
  }
  ul,
  ol {
    list-style: none;
  }
  .bUqJsr li {
    margin-bottom: 24px;
  }

  .bMJSTc form dt {
    font-weight: bold;
    font-size: 17px;
    line-height: 24px;
  }

  .bMJSTc form dd {
    word-break: keep-all;
    font-size: 15px;
    line-height: 22px;
    margin-top: 4px;
    color: rgb(68, 68, 68);
  }

  .ihIAES {
    position: relative;
    text-align: left;
    margin-top: 24px;
  }
  .bMJSTc form label {
    color: rgb(68, 68, 68);
  }

  .fHyjBS {
    display: block;
    padding-bottom: 6px;
    text-align: left;
    font-weight: 400;
    color: rgb(34, 34, 34);
    font-size: 15px;
    line-height: 22px;
  }

  .ihIAES .inp_typo {
    width: calc(100% - 91px);
  }
  input {
    appearance: none;
  }

  .dxBcNX {
    position: relative;
  }
  .dxBcNX input {
    position: absolute;
    top: 0px;
    width: 1px;
    height: 1px;
    outline: none;
    opacity: 0;
    pointer-events: none;
  }
  .dcoGOS:read-only {
    cursor: default;
    color: rgb(153, 153, 153);
    background-color: rgb(244, 244, 244);
  }

  .dcoGOS {
    width: 100%;
    height: 48px;
    padding: 12px 16px;
    border: 1px solid rgb(212, 212, 212);
    color: rgb(0, 0, 0);
    background: rgb(255, 255, 255);
    border-radius: 4px;
    box-sizing: border-box;
  }
  .gzzpXq {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
  }
  .dxBcNX.default label {
    margin-right: 0px;
    display: inline-block;
    padding-left: 34px;
    color: rgb(51, 51, 51);
    text-align: left;
    cursor: pointer;
  }

  .gzzpXq label {
    font-size: 15px;
    line-height: 22px;
    padding-left: 32px;
  }
  .gzzpXq > button {
    width: 180px;
    margin-top: 32px;
    align-self: center;
    font-size: 15px;
    line-height: 22px;
  }
  .dxBcNX.default label::before {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
    width: 9px;
    height: 5px;
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    border-bottom: 1.2px solid currentcolor;
    border-left: 1.2px solid currentcolor;
    transform: rotate(-45deg);
    content: "";
  }
  .dxBcNX.default label::after {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    color: rgb(255, 255, 255);
    border: 1px solid rgb(212, 212, 212);
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    content: "";
  }
  .dxBcNX input:checked + label::before,
  .dxBcNX input:checked + label::after {
    background-color: rgb(0, 221, 109);
    border-color: rgb(255, 255, 255);
  }
  .disable_btn {
    border: 1px solid rgb(196, 196, 196);
    color: rgb(255, 255, 255);
    font-size: 14px;
    line-height: 20px;
    background: rgb(196, 196, 196);
    cursor: default;
  }

  .heyaGD {
    font-size: 15px;
    border-radius: 3px;
    height: 48px;
  }
  .allow_btn {
    padding: 0px 13px;
    border: 1px solid rgb(212, 212, 212);
    background: rgb(255, 255, 255);
    color: rgb(51, 51, 51);
    box-sizing: border-box;
    font-size: 15px;
    height: 48px;
    line-height: 46px;
    font-weight: normal;
    cursor: pointer;
  }
</style>
