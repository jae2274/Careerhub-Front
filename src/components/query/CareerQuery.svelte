<script>
  import {query} from "~/components/query/store";
  import {onMount, onDestroy} from "svelte";

  let isCareerHided = true;
  let minCareer = $query.minCareer;
  let maxCareer = $query.maxCareer;

  let init = false;
  $: !isInit() || query.setMinCareer(minCareer);
  $: !isInit() || query.setMaxCareer(maxCareer);

  function isInit() {
    return init;
  }
  onMount(() => {
    init = true;
  });

  function switchHidedCareer() {
    isCareerHided = !isCareerHided;
  }

  function removeCareer() {
    minCareer = null;
    maxCareer = null;
  }
</script>

<div class="sc-dkqQuH eYcCbP">
  <div type="경력" class="sc-cVAmsi fKqAid">
    <div class="careerQueryBox">
      <div class="sc-fydGpi careerInputBox">
        <input type="number" bind:value={minCareer} min="0" />
      </div>
      <span>년 이상</span>
    </div>
    <div class="careerQueryBox">
      <div class="sc-fydGpi careerInputBox">
        <input type="number" bind:value={maxCareer} min={minCareer} />
      </div>
      <span>년 이하</span>
    </div>
  </div>
  <div role="presentation">
    {#if minCareer || maxCareer}
      <div class="btn_stack cursor_default" on:click={() => removeCareer()}>
        <span>
          {#if minCareer && maxCareer}
            {minCareer}년 ~ {maxCareer}년
          {:else if minCareer}
            {minCareer}년 이상
          {:else if maxCareer}
            {maxCareer}년 이하
          {/if}
        </span>
        <button class="delete_btn"><span class="blind">삭제</span></button>
      </div>
    {/if}
  </div>
</div>

<style>
  .eYcCbP {
    position: relative;
    margin-right: 24px;
  }
  .eYcCbP .btn_hover {
    border: 1px solid rgb(0, 0, 0);
  }
  .eYcCbP .outlined {
    position: relative;
    background-color: rgb(255, 255, 255);
    padding: 6px 30px 7px 12px;
    border: 1px solid rgb(228, 228, 228);
    border-radius: 100px;
    margin-bottom: 8px;
    text-align: left;
    box-sizing: border-box;
    z-index: 4;
  }
  .eYcCbP .btn_hover span {
    color: rgb(0, 0, 0);
  }
  .eYcCbP .outlined span {
    font-size: 15px;
    line-height: 24px;
    letter-spacing: -0.5px;
    color: rgb(34, 34, 34);
  }
  .eYcCbP .arrow_up {
    transform: rotate(-180deg);
    transition:
      transform 0.2s ease-in-out 0s,
      -webkit-transform 0.2s ease-in-out 0s;
  }
  .eYcCbP .arrow {
    position: absolute;
    top: 11px;
    right: 12px;
    transition:
      transform 0.2s ease-in-out 0s,
      -webkit-transform 0.2s ease-in-out 0s;
  }

  .fKqAid {
    z-index: 5;
    width: 200px;
    display: inline-flex;
  }

  .careerQueryBox {
    height: 40px;
    margin: 0px 5px;
    display: flex;
  }

  .careerQueryBox > span {
    margin: 10px 0px;
  }

  .careerInputBox {
    position: relative;
    border-radius: 4px;
    height: 100%;
    width: 40px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    border: 1px solid rgb(0, 221, 109);
  }

  .careerInputBox > input[type="number"] {
    height: 100%;
    width: 40px;
    border: none;
    font-size: 14px;
    text-align: right;
  }
  .gKahww {
    margin-bottom: 16px;
    display: inline-block;
  }

  .layer_bottom {
    height: 30px;
    border-top: 1px solid rgb(228, 228, 228);
    padding: 0px 24px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
  }
  .layer_bottom span {
    margin: 6px;
  }

  .btn_stack {
    display: inline-block;
    cursor: pointer;
    width: fit-content;
    padding: 8px 16px;
    background-color: rgb(244, 244, 244);
    border-radius: 100px;
    margin: 0px 8px 8px 0px;
    font-size: 14px;
    font-family:
      Montserrat,
      "Noto Sans KR",
      -apple-system,
      system-ui,
      "Apple SD Gothic Neo",
      "Malgun Gothic",
      "Nanum Gothic",
      sans-serif;
    color: rgb(34, 34, 34);
    line-height: 16px;
    font-weight: 500;
  }
  .delete_btn {
    position: relative;
    width: 20px;
    height: 12px;
    color: rgb(255, 255, 255);
    background-color: transparent;
    padding: 0px;
    border: none;
  }
  .delete_btn::before {
    position: absolute;
    left: 7px;
    width: 12px;
    height: 1.3px;
    background-color: rgb(196, 196, 196);
    transform: rotate(45deg);
    content: "";
  }
  .delete_btn::after {
    position: absolute;
    left: 7px;
    width: 12px;
    height: 1.3px;
    background-color: rgb(196, 196, 196);
    transform: rotate(-45deg);
    content: "";
  }

  .blind {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
  }
</style>
