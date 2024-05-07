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
</script>

<div class="sc-dkqQuH eYcCbP">
  <button type="button" class="outlined btn_hover" on:click={switchHidedCareer}
    ><span>경력 <mark /></span><svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      class="arrow"
      class:arrow_up={!isCareerHided}
      ><g fill="none" fill-rule="evenodd"
        ><g
          ><g
            ><g
              ><g
                ><path
                  d="M0 0H16V16H0z"
                  transform="translate(-316 -224) translate(20 216) translate(224) translate(72 8)"
                /><path
                  stroke="#CCC"
                  stroke-width="1.2"
                  d="M3 6L8 11 13 6"
                  transform="translate(-316 -224) translate(20 216) translate(224) translate(72 8)"
                /></g
              ></g
            ></g
          ></g
        ></g
      ></svg
    ></button
  >
  {#if !isCareerHided}
    <div type="경력" class="sc-cVAmsi fKqAid">
      <div class="careerQueryBox">
        <div class="sc-fydGpi careerInputBox">
          <input type="number" bind:value={minCareer} />
        </div>
        <span>년 이상</span>
      </div>
      <div class="careerQueryBox">
        <div class="sc-fydGpi careerInputBox">
          <input type="number" bind:value={maxCareer} />
        </div>
        <span>년 이하</span>
      </div>
      {#if minCareer || maxCareer}
        <div class="layer_bottom">
          <span>
            {#if minCareer && maxCareer}
              {minCareer}년 ~ {maxCareer}년
            {:else if minCareer}
              {minCareer}년 이상
            {:else if maxCareer}
              {maxCareer}년 이하
            {/if}
          </span>
        </div>
      {/if}
    </div>
  {/if}
  <div role="presentation">
    {#if minCareer || maxCareer}
      <span>
        {#if minCareer && maxCareer}
          {minCareer}년 ~ {maxCareer}년
        {:else if minCareer}
          {minCareer}년 이상
        {:else if maxCareer}
          {maxCareer}년 이하
        {/if}
      </span>
    {/if}
  </div>
</div>

<style>
  .eYcCbP {
    position: relative;
    margin: 0px 0px 1px;
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
    box-shadow: rgba(0, 0, 0, 0.12) 0px 8px 16px;
    background-color: rgb(255, 255, 255);
    position: absolute;
    top: 44px;
    left: 0px;
    border: 1px solid rgb(228, 228, 228);
    border-radius: 12px;
    z-index: 5;
    width: 160px;
  }

  .careerQueryBox {
    height: 40px;
    width: 100%;
    margin: 5px 5px;
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
</style>
