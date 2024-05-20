<script>
  import {
    scrap,
    unscrap,
    addTag,
    removeTag,
  } from "~/components/jobPostingList/api";
  import {fade} from "svelte/transition";
  import {link} from "svelte-spa-router";
  import {isLogin} from "~/httputils.js";

  export let delay;
  export let jobPosting;

  $: companyName = jobPosting.companyName;
  $: imageUrl = jobPosting.imageUrl;
  $: postingId = jobPosting.postingId;
  $: title = jobPosting.title;
  $: skills = jobPosting.skills || [];
  $: categories = jobPosting.categories || [];
  $: site = jobPosting.site;
  $: viewAddress = createViewAddress(jobPosting.addresses);
  $: viewCareer = createViewCareer(jobPosting.minCareer, jobPosting.maxCareer);
  $: scrapInfo = jobPosting.scrapInfo;
  $: reviewInfo = jobPosting.reviewInfo;

  function createViewAddress(addresses) {
    const address = addresses[0];
    const parts = address ? address.split(" ") : [];

    const viewAddress =
      parts.length >= 2
        ? parts[0] + " " + parts[1]
        : parts.length === 1
          ? parts[0]
          : "";

    return viewAddress;
  }

  $: isViewTagInput = false;
  function viewTagInput() {
    isViewTagInput = true;
  }

  function createViewCareer(min, max) {
    let viewCareer = `경력무관`;

    if (min && max) {
      viewCareer = `경력 ${min}~${max}`;
    } else if (min) {
      viewCareer = `경력 ${min}년 이상`;
    } else if (max) {
      viewCareer = `경력 ${max}년 이하`;
    }

    return viewCareer;
  }

  async function switchScrapped() {
    if (scrapInfo.isScrapped) {
      await unscrap(site, postingId);
      scrapInfo.isScrapped = false;
      scrapInfo.tags = [];
    } else {
      await scrap(site, postingId);
      scrapInfo.isScrapped = true;
    }
  }

  function focus(el) {
    el.focus();
  }

  async function addNewTag(e) {
    if (e.key === "Enter") {
      console.log(e.target.value);
      await addTag(site, postingId, e.target.value);
      isViewTagInput = false;
      scrapInfo.tags = [...scrapInfo.tags, e.target.value];
    }
  }

  async function removeTagAction(tag) {
    await removeTag(site, postingId, tag);
    scrapInfo.tags = scrapInfo.tags.filter((t) => t !== tag);
  }

  function scoreString(score) {
    const tenDecimal = Math.floor(score / 10);
    const oneDecimal = score % 10;

    return `${tenDecimal}.${oneDecimal}`;
  }
</script>

<div class="sc-bQtKYq dblCQy" in:fade={{delay, duration: 500}}>
  <a target="_self" use:link href={`/job_posting/${site}/${postingId}`}
    ><div class="img_filter" />
    <div class="img_box">
      <img class="img" alt="지바이크" src={imageUrl} />
      {#if scrapInfo}
        <div class="counts">
          <button
            aria-pressed="false"
            type="button"
            class="sc-6683f4b1-7 vpLCw"
            on:click|stopPropagation|preventDefault={switchScrapped}
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              {#if scrapInfo.isScrapped}
                <path
                  fill="#00DD6D"
                  fill-rule="evenodd"
                  d="M6.403 20.825a1 1 0 0 1-1.653-.757V5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v15.068a1 1 0 0 1-1.653.757L12 16l-5.597 4.825Z"
                  clip-rule="evenodd"
                ></path>
              {:else}
                <path
                  fill="#222"
                  fill-rule="evenodd"
                  d="M10.725 14.71a2 2 0 0 1 2.55 0l3.975 3.289V5H6.75v12.999l3.975-3.29ZM4.75 20.123V5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v15.124a1 1 0 0 1-1.638.77L12 16.25l-5.612 4.645a1 1 0 0 1-1.638-.77Z"
                  clip-rule="evenodd"
                ></path>
              {/if}
            </svg></button
          >
        </div>
        {#if scrapInfo.isScrapped}
          <div class="tags">
            <button on:click|stopPropagation|preventDefault={viewTagInput}>
              <svg width="20" height="20">
                <!-- 원 그리기 -->
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="red"
                  stroke-width="1"
                  fill="none"
                ></circle>
                <!-- 가운데 + 기호 그리기 -->
                <line
                  x1="6"
                  y1="10"
                  x2="14"
                  y2="10"
                  stroke="red"
                  stroke-width="1"
                ></line>
                <line
                  x1="10"
                  y1="6"
                  x2="10"
                  y2="14"
                  stroke="red"
                  stroke-width="1"
                ></line>
              </svg>
            </button>
            {#if isViewTagInput}
              <input
                type="text"
                placeholder="입력 후 엔터"
                use:focus
                on:click|stopPropagation|preventDefault
                on:focusout={(_) => (isViewTagInput = false)}
                on:keydown={addNewTag}
              />
            {/if}
            <ul>
              {#each scrapInfo.tags as tag}
                <li
                  on:click|stopPropagation|preventDefault={() =>
                    removeTagAction(tag)}
                >
                  {tag}
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      {/if}
    </div>
    <div class="sc-dVNjXY kJoWbe">
      <div class="sc-xiLah jCplrW"><span>{companyName}</span></div>
      <h2 class="position_card_info_title">{title}</h2>
      {#if reviewInfo}
        <div class="rating">
          <span class="star"></span>
          <span class="score"
            >{scoreString(reviewInfo.score)}
            <em class="num">({reviewInfo.reviewCount}개 리뷰)</em></span
          >
        </div>
      {/if}
      {#if skills.length > 0}
        <ul class="sc-jHkVzv cYCPrU" style="color: brown;">
          {#each skills as skillName, index}
            <li>
              {#if index !== 0}
                &nbsp·&nbsp
              {/if}{skillName}
            </li>
          {/each}
        </ul>
      {/if}
      <ul class="sc-jHkVzv cYCPrU" style="color: yellowgreen;">
        {#each categories as category, index}
          <li>
            {#if index !== 0}
              &nbsp·&nbsp
            {/if}{category}
          </li>
        {/each}
      </ul>
      <ul class="sc-jHkVzv jAbqnL">
        <li style="color: blueviolet">{viewAddress}</li>
        <li style="color:teal">{viewCareer}</li>
      </ul>
      <ul class="sc-jHkVzv jAbqnL">
        <li>from {site}</li>
      </ul>
    </div></a
  >
</div>

<style>
  .dblCQy {
    opacity: initial;
    position: relative;
    width: calc(25% - 20px);
    flex: 1 1 22%;
    box-sizing: border-box;
    padding: 10px;
    max-width: 270px;
  }
  a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  div {
    display: block;
  }
  .dblCQy .img_box {
    width: 100%;
    height: 166px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
  }
  .kJoWbe {
    padding: 12px 0px 36px;
    width: calc(100% - 7px);
  }

  .dblCQy .img_box .img {
    width: 250px;
    height: 166px;
    object-fit: cover;
    transition: all 0.3s ease 0s;
    image-rendering: -webkit-optimize-contrast;
  }

  .dblCQy .img_box .counts {
    position: absolute;
    margin-left: auto;
    color: rgb(255, 255, 255);
    font-size: 13px;
    z-index: 1;
  }
  .dblCQy .counts .position_view_count {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-right: 10px;
  }
  .kJoWbe {
    padding: 12px 0px 36px;
    width: calc(100% - 7px);
  }
  .jCplrW {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }
  .kJoWbe > div > span {
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.5px;
    color: rgb(68, 68, 68);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .kJoWbe h2 {
    margin-top: 6px;
    font-size: 17px;
    line-height: 1.4em;
    letter-spacing: -0.5px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .cYCPrU {
    display: flex;
    margin-top: 8px;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.5px;
    color: rgb(153, 153, 153);
    height: 18px;
    font-family:
      Montserrat,
      "Noto Sans KR",
      -apple-system,
      system-ui,
      "Apple SD Gothic Neo",
      "Malgun Gothic",
      "Nanum Gothic",
      sans-serif;
    flex-wrap: wrap;
    overflow: hidden;
  }
  .cYCPrU li:first-child {
    max-width: 58%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .jAbqnL {
    display: flex;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.5px;
    color: rgb(153, 153, 153);
    margin-top: 4px;
  }

  .jAbqnL li:first-child {
    max-width: 58%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .jAbqnL li {
    margin-right: 5px;
  }

  ul,
  ol {
    list-style: none;
  }

  .dblCQy .img_box .counts {
    position: absolute;
    margin-left: auto;
    color: rgb(255, 255, 255);
    font-size: 13px;
    z-index: 1;
  }
  .dblCQy .counts {
    top: 16px;
    right: 16px;
  }
  button {
    border: none;
    border-radius: 0px;
    background: none;
    cursor: pointer;
  }
  .dblCQy .counts button {
    padding: 0px;
  }
  .vpLCw > svg {
    width: 21px;
    height: 21px;
  }

  .vpLCw > svg path {
    fill: rgb(255, 0, 0);
  }
  .dblCQy .tags {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 244px;
    height: 160px;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-start;
    padding: 3px;
    color: red;
  }

  ul > li:hover {
    opacity: 0.4;
  }

  .rating {
    margin-top: 7px;
  }
  .rating .star {
    font-size: 16px;
    line-height: 1.3em;
    background: url(https://static.teamblind.com/img/www/sp-cmp.png?time=oct2020)
      no-repeat;
    background-size: 522.24px 696.32px;
    background-position: -136px -167.28px;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 4px;
    vertical-align: top;
    content: "";
  }

  .rating .score {
    font-size: 16px;
    line-height: 1.3em;
    display: inline-block;
    height: 18px;
    margin-right: 4px;
    vertical-align: top;
    content: "";
  }
  .rating .num {
    font-size: 14px;
    color: #94969b;
    font-style: normal;
  }
</style>
