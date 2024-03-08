<script>
  import {fade} from "svelte/transition";
  import {link} from "svelte-spa-router";
  export let delay;
  export let jobPosting;

  $: companyName = jobPosting.companyName;
  $: imageUrl = jobPosting.imageUrl;
  $: postingId = jobPosting.postingId;
  $: title = jobPosting.title;
  $: skills = jobPosting.skills;
  $: site = jobPosting.site;
  $: viewAddress = createViewAddress(jobPosting.addresses);
  $: viewCareer = createViewCareer(jobPosting.minCareer, jobPosting.maxCareer);

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
</script>

<div class="sc-bQtKYq dblCQy" in:fade={{delay, duration: 500}}>
  <a target="_self" use:link href={`/job_posting/${site}/${postingId}`}
    ><div class="img_filter" />
    <div class="img_box">
      <img class="img" alt="지바이크" src={imageUrl} />
      <div class="counts">
        <div class="position_view_count">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"
            ><g fill="none" fill-rule="evenodd"
              ><path d="M0 0h16v16H0z" /><g stroke="#FFF" stroke-linecap="round"
                ><path
                  d="M8 10c.86 0 1.556-.672 1.556-1.5S8.859 7 8 7c-.86 0-1.556.672-1.556 1.5S7.141 10 8 10z"
                /><path
                  d="M15 8.5c-1.469 2.243-4.108 4.5-7 4.5-2.892 0-5.531-2.257-7-4.5C2.788 6.369 4.882 4 8 4s5.212 2.369 7 4.5z"
                /></g
              ></g
            ></svg
          ><span>1705</span>
        </div>
        <button type="button" class="sc-furwcr kTzMzQ" />
      </div>
    </div>
    <div class="sc-dVNjXY kJoWbe">
      <div class="sc-xiLah jCplrW"><span>{companyName}</span></div>
      <h2 class="position_card_info_title">{title}</h2>
      <ul class="sc-jHkVzv cYCPrU">
        {#each skills as skillName, index}
          <li>
            {#if index !== 0}
              &nbsp·&nbsp
            {/if}{skillName}
          </li>
        {/each}
      </ul>
      <ul class="sc-jHkVzv jAbqnL">
        <li>{viewAddress}</li>
        <li>{viewCareer}</li>
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
</style>
