<script>
  import {link} from "svelte-spa-router";
  import {isLogin} from "~/httputils.js";
  import {
    scrap,
    unscrap,
    addTag,
    removeTag,
  } from "~/components/jobPostingList/api";

  import {getReviews} from "~/view/job_posting/postingId/api";
  const pageSize = 10;

  export let postingDetail;
  $: site = postingDetail.site;
  $: postingId = postingDetail.postingId;
  $: title = postingDetail.title;
  $: skills = postingDetail.skills || [];
  $: mainTask = postingDetail.mainTask;
  $: qualifications = postingDetail.qualifications;
  $: preferred = postingDetail.preferred;
  $: benefits = postingDetail.benefits;
  $: recruitProcess = postingDetail.recruitProcess;
  $: intro = postingDetail.intro;
  $: careerMin = postingDetail.careerMin;
  $: careerMax = postingDetail.careerMax;
  $: tags = postingDetail.tags || [];
  $: companyId = postingDetail.companyId;
  $: companyImages = postingDetail.companyImages || [];
  $: addresses = postingDetail.addresses || [];
  $: companyName = postingDetail.companyName;
  $: scrapInfo = postingDetail.scrapInfo;
  $: reviewInfo = postingDetail.reviewInfo;
  $: reviews = postingDetail.firstPageReviews || [];
  $: postUrl = postingDetail.postUrl;
  $: companyUrl = postingDetail.companyUrl;
  $: companyLogo = postingDetail.companyLogo;
  let isViewTagInput = false;

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

  let selectedPageNum = 1;

  async function getReviewsAction(pageNum) {
    const res = await getReviews(companyName, pageNum, pageSize);
    reviews = res;
    selectedPageNum = pageNum;
  }

  function convertPageString(pageNum) {
    if (pageNum < 10) {
      return `0${pageNum}`;
    }
    return `${pageNum}`;
  }

  function openNewTab(url) {
    window.open(url, "_blank");
  }
</script>

<div class="gzkEnW">
  <div class="sc-gVkuDy lkjbjv">
    <section class="title">
      <h1>{title}</h1>
    </section>
    {#if scrapInfo}
      <section class="scrapTags">
        <button
          aria-pressed="false"
          type="button"
          class="sc-6683f4b1-7 scrapBtn svelte-1tvf73y"
          on:click={switchScrapped}
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            class="svelte-1tvf73y"
          >
            {#if scrapInfo.isScrapped}
              <path
                fill="#00DD6D"
                fill-rule="evenodd"
                d="M6.403 20.825a1 1 0 0 1-1.653-.757V5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v15.068a1 1 0 0 1-1.653.757L12 16l-5.597 4.825Z"
                clip-rule="evenodd"
                class="svelte-1jo1owu"
              ></path>
            {:else}
              <path
                fill="#222"
                fill-rule="evenodd"
                d="M10.725 14.71a2 2 0 0 1 2.55 0l3.975 3.289V5H6.75v12.999l3.975-3.29ZM4.75 20.123V5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v15.124a1 1 0 0 1-1.638.77L12 16.25l-5.612 4.645a1 1 0 0 1-1.638-.77Z"
                clip-rule="evenodd"
                class="svelte-1tvf73y"
              ></path>
            {/if}
          </svg></button
        >
        {#if scrapInfo.isScrapped}
          <button
            class="svelte-1jo1owu scrapBtn svelte-ee8yuh"
            on:click={() => {
              isViewTagInput = true;
            }}
            ><svg width="36" height="36" class="svelte-ee8yuh">
              <circle
                cx="15"
                cy="15"
                r="12"
                stroke="red"
                stroke-width="1.5"
                fill="none"
              ></circle>
              <line
                x1="9"
                y1="15"
                x2="21"
                y2="15"
                stroke="red"
                stroke-width="1.5"
              ></line>
              <line
                x1="15"
                y1="9"
                x2="15"
                y2="21"
                stroke="red"
                stroke-width="1.5"
              ></line>
            </svg>
          </button>

          {#if isViewTagInput}
            <input
              type="text"
              placeholder="입력 후 엔터"
              use:focus
              on:focusout={(_) => (isViewTagInput = false)}
              on:keydown={addNewTag}
            />
          {/if}
          <ul>
            {#each scrapInfo.tags as scrapTag}
              <li on:click={() => removeTagAction(scrapTag)}>
                {scrapTag}
              </li>
            {/each}
          </ul>
        {/if}
      </section>
    {/if}
    <section class="sc-cvlWTT difxia">
      <div class="position_title_box_desc">
        <a use:link href={`/company/${companyId}`}
          >{companyName}<br /> from {site}</a
        >
      </div>
      {#if reviewInfo}
        <div class="rating">
          <div>
            <span class="star"></span>
            <span class="score"
              >{scoreString(reviewInfo.score)}
              <em class="num">({reviewInfo.reviewCount}개 리뷰)</em></span
            >
            {#if !reviewInfo.isCompleteCrawl}
              <span>리뷰 수집 진행중</span>
            {/if}
          </div>
          <div>
            {#each reviews as review}
              <div class="review_item_inr">
                <div class="star_score">
                  <span class="star"></span>
                  <span class="score">{scoreString(review.score)} </span>
                </div>

                <div class="auth">
                  <h3 class="rvtit">
                    {review.summary}
                  </h3>
                  <strong class=""
                    ><span class="ico_vrf"
                      ><i class="blind">Verified User</i></span
                    >
                    {#if review.employmentStatus}현직원{:else}전직원{/if}</strong
                  >
                  · {review.jobType} · {review.reviewUserId} - {review.date.split(
                    "T"
                  )[0]}
                </div>
                <!---->
              </div>
            {/each}
            {#if reviewInfo.isCompleteCrawl && reviewInfo.reviewCount > pageSize}
              <div class="paginate">
                {#each Array.from({length: Math.ceil(reviewInfo.reviewCount / pageSize)}, (_, index) => index + 1) as pageNum}
                  <span
                    on:click={() => getReviewsAction(pageNum)}
                    class:bold={selectedPageNum === pageNum}
                    >{convertPageString(pageNum)}</span
                  >
                {/each}
              </div>
            {/if}
          </div>
        </div>
      {/if}
      <ul class="position_tags">
        {#each tags as tag}
          <li>
            {tag}
          </li>
        {/each}
      </ul>
    </section>
    <section class="position_info">
      <h2 class="blind">포지션 상세 정보</h2>
      <dl class="sc-bxDdli jRSwwP">
        <dt class="sc-jWaEpP gRSNea">기술스택</dt>
        <dd>
          <pre>
                        {#each skills as skill}
              <div class="sc-hxaKAp hMPsbi">{skill}</div>
            {/each}
                    </pre>
        </dd>
      </dl>
      <dl class="sc-bxDdli jRSwwP">
        <dt class="sc-jWaEpP gRSNea">주요업무</dt>
        <dd>
          <pre>{mainTask}</pre>
        </dd>
      </dl>
      <dl class="sc-bxDdli jRSwwP">
        <dt class="sc-jWaEpP gRSNea">자격요건</dt>
        <dd>
          <pre>{qualifications}</pre>
        </dd>
      </dl>
      <dl class="sc-bxDdli jRSwwP">
        <dt class="sc-jWaEpP gRSNea">우대사항</dt>
        <dd>
          <pre>{preferred}</pre>
        </dd>
      </dl>
      <dl class="sc-bxDdli jRSwwP">
        <dt class="sc-jWaEpP gRSNea">복지 및 혜택</dt>
        <dd>
          <pre>{benefits}</pre>
        </dd>
      </dl>
      {#if recruitProcess}
        <dl class="sc-bxDdli jRSwwP">
          <dt class="sc-jWaEpP gRSNea">채용절차 및 기타 지원 유의사항</dt>
          <dd>
            <pre>{recruitProcess}</pre>
          </dd>
        </dl>
      {/if}
    </section>
    <section class="sc-fTxOGA DGezP">
      <h2 class="blind">포지션 경력/학력/마감일/근무지역 정보</h2>
      <dl class="sc-BHvUt hTBFSn">
        <dt>경력</dt>
        <dd>
          {#if careerMin && careerMax}
            {careerMin} ~ {careerMax}
          {:else if careerMin}
            {careerMin}년 이상
          {:else if careerMax}
            {careerMax}년 이하
          {:else}
            무관
          {/if}
        </dd>
      </dl>
      <dl class="sc-BHvUt hTBFSn">
        <dt>마감일</dt>
        <dd>?????</dd>
      </dl>
      <dl class="sc-BHvUt hTBFSn">
        <dt>근무지역</dt>
        <dd>
          <ul>
            {#each addresses as address}
              <li>
                {address}
              </li>
            {/each}
          </ul>
        </dd>
      </dl>
    </section>
    <section class="sc-dwFVFH fBgcaS">
      <h2 class="title">기업/서비스 소개</h2>
      <div class="sc-eJRTFu iWGriZ">
        <button class="sc-iqseJM kSjzbt" /><button class="sc-crHmcD cbXCAw" />
        <div class="sc-fGoOlv hIzUNT">
          {#each companyImages as image}
            <div>
              <img alt="{companyName}_{title}" src={image} />
            </div>
          {/each}
        </div>
        <div class="sc-hlGDCY dfgXIj">
          1 / {postingDetail.companyImages.length}
        </div>
      </div>
      <div>
        <pre class="sc-iidyiZ bJsREk">{intro}</pre>
        <div class="sc-dYPfWK cGaUXm">
          <div class="sc-gA-DPUo dEQZXS" />
          <button>기업/서비스 소개 더 보기</button>
        </div>
      </div>
    </section>
  </div>
</div>
<aside aria-label="포지션정보 우측 메뉴" class="sc-dcfb16a1-1 iOyFJs">
  <div class="wrap">
    <div class="contents">
      <a
        class="company"
        target="_blank"
        title="이글루코퍼레이션 기업정보"
        href="/company/123?company_nm=이글루코퍼레이션"
        ><img
          alt="{companyName} 로고"
          height="70"
          src={companyLogo}
          width="70"
        />
        <div class="name">
          <h2>{companyName}</h2>
          <span
            >기업정보 보기 <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 12 12"
              ><path
                fill="#222"
                fill-rule="evenodd"
                d="M4.146 1.896a.5.5 0 0 1 .708 0l3.75 3.75a.5.5 0 0 1 0 .708l-3.75 3.75a.5.5 0 0 1-.708-.708L7.543 6 4.146 2.604a.5.5 0 0 1 0-.708Z"
                clip-rule="evenodd"
              ></path></svg
            ></span
          >
        </div></a
      >
      <dl class="details">
        <!-- <div>
          <dt>업력</dt>
          <dd>
            <strong
              >26년차<span>(1999년 11월 설립)</span
              ></strong
            >
          </dd>
        </div> -->
        {#if companyUrl}
          <div>
            <dt>홈페이지</dt>
            <dd>
              <a
                target="_blank"
                href={companyUrl.includes("https://")
                  ? companyUrl
                  : `https://${companyUrl}`}
                ><span>{companyUrl}</span><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  ><path
                    fill="#222"
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 1 0 0 2h3.586l-4.793 4.793a1 1 0 0 0 1.414 1.414L19.5 6.414V10a1 1 0 1 0 2 0V5a2 2 0 0 0-2-2h-5Zm-9 3.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V14a1 1 0 1 1 2 0v4.5a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3H10a1 1 0 1 1 0 2H5.5Z"
                    clip-rule="evenodd"
                  ></path></svg
                ></a
              >
            </dd>
          </div>
        {/if}
      </dl>
      {#if postUrl}
        <div class="sc-190507ae-0 jubIHb">
          <button
            type="button"
            class="sc-b0913d02-0 sc-b0913d02-2 heyaGD kPJGoV"
            on:click={() => openNewTab(postUrl)}>지원하러 가기</button
          >
        </div>
      {/if}
    </div>
  </div>
</aside>

<style>
  .title h1 {
    font-weight: 700;
    font-size: 40px;
    line-height: 1.25;
  }

  .gzkEnW {
    position: relative;
    padding: 60px 0px 24px;
    max-width: 1060px;
    margin: 0px auto;
  }
  .lkjbjv {
    position: relative;
    width: 630px;
  }
  .difxia {
    border-bottom: 1px solid rgb(234, 234, 234);
  }

  .hMPsbi {
    display: inline-block;
    position: relative;
    margin: 0px 6px 6px 0px;
    font-size: 12px;
    font-family:
      Montserrat,
      "Noto Sans KR",
      -apple-system,
      system-ui,
      "Apple SD Gothic Neo",
      "Malgun Gothic",
      "Nanum Gothic",
      sans-serif;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0px;
    color: rgb(0, 0, 0);
    padding: 0px 12px 0px 12px;
    background: rgb(244, 244, 244);
    border-radius: 4px;
  }
  .difxia .position_title_box_desc {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 24px;
  }
  a {
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
  /* .fyFRzM {
    display: none;
    margin-left: 16px;
    padding: 0px 12px;
    background: rgb(244, 244, 244);
    border-radius: 100px;
    font-size: 13px;
    font-weight: 500;
    line-height: 24px;
    color: rgb(68, 68, 68);
    cursor: pointer;
} */

  .blind {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(1px, 1px, 1px, 1px);
  }

  .jRSwwP {
    margin: 0px 0px 56px;
    text-align: left;
  }

  .gRSNea {
    padding-bottom: 12px;
    font-size: 18px;
    color: rgb(0, 0, 0);
    line-height: 32px;
    letter-spacing: -0.5px;
    font-weight: bold;
  }

  .jRSwwP dd pre {
    margin: 0px;
    padding: 0px;
    white-space: pre-line;
    word-break: break-all;
    overflow-wrap: break-word;
    font-family:
      "Noto Sans KR",
      -apple-system,
      system-ui,
      "Apple SD Gothic Neo",
      "Malgun Gothic",
      "Nanum Gothic",
      sans-serif;
    font-size: 16px;
    color: rgb(68, 68, 68);
    line-height: 28px;
    letter-spacing: -0.5px;
  }

  .DGezP {
    padding: 32px 0px;
    border-top: 1px solid rgb(234, 234, 234);
    border-bottom: 1px solid rgb(234, 234, 234);
  }

  .hTBFSn {
    position: relative;
    font-size: 15px;
    color: rgb(68, 68, 68);
    line-height: 20px;
    letter-spacing: 0px;
    margin: 10px 0px;
    display: flex;
    -webkit-box-align: baseline;
    align-items: baseline;
  }

  .hTBFSn dt {
    line-height: 24px;
    color: rgb(0, 0, 0);
    font-weight: 500;
    width: 90px;
    min-width: 90px;
  }
  ul,
  ol {
    list-style: none;
  }

  .fBgcaS {
    position: relative;
  }
  .fBgcaS .title {
    margin: 48px 0px 16px;
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.5px;
  }

  .iWGriZ {
    position: relative;
  }

  .kSjzbt {
    position: absolute;
    top: 50%;
    left: 16px;
    background: url(https://www.jumpit.co.kr/App/build/static/media/btn-prev.85cf9174.svg)
      center center / 32px 32px no-repeat;
    width: 32px;
    height: 32px;
    z-index: 1;
  }

  .cbXCAw {
    position: absolute;
    top: 50%;
    right: 16px;
    background: url(https://www.jumpit.co.kr/App/build/static/media/btn-next.6acd9890.svg)
      center center / 32px 32px no-repeat;
    width: 32px;
    height: 32px;
    z-index: 1;
  }

  button {
    border: none;
    border-radius: 0px;
    background: none;
    cursor: pointer;
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
  }

  .hIzUNT {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    padding-bottom: 6px;
    height: auto;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    overscroll-behavior: contain;
  }

  .hIzUNT > div {
    scroll-snap-align: start;
    position: relative;
    width: 100%;
    flex-shrink: 0;
    padding-bottom: 70%;
  }

  .hIzUNT > div > img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    border-radius: 4px;
    object-fit: cover;
    outline-offset: -1px;
  }

  .dfgXIj {
    position: absolute;
    right: 16px;
    bottom: 32px;
    padding: 6px 8px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    font-family:
      Montserrat,
      "Noto Sans KR",
      -apple-system,
      system-ui,
      "Apple SD Gothic Neo",
      "Malgun Gothic",
      "Nanum Gothic",
      sans-serif;
    font-size: 13px;
    font-weight: 500;
    line-height: 16px;
  }

  .bJsREk {
    margin-top: 14px;
    padding: 0px;
    font-size: 16px;
    color: rgb(68, 68, 68);
    line-height: 28px;
    letter-spacing: -0.5px;
    word-break: break-all;
    white-space: pre-line;
    overflow-wrap: break-word;
    font-family: "Noto Sans KR", serif;
    text-size-adjust: 100%;
  }

  .scrapBtn {
    cursor: pointer;
  }
  .scrapBtn > svg {
    width: 32px;
    height: 32px;
  }

  .scrapBtn > svg path {
    fill: rgb(255, 0, 0);
  }
  .scrapTags {
    color: red;
    display: inline-flex;
  }

  .scrapTags input {
    height: 23px;
    margin: 0px 10px;
  }

  .scrapTags ul {
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: flex-start;
  }
  .scrapTags li {
    display: inline-block;
    position: relative;
    margin-right: 10px;
    cursor: pointer;
    height: 32px;
    font-size: 20px;
  }

  .scrapTags ul > li:hover {
    opacity: 0.4;
  }

  .rating {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .rating > div {
    display: inline-block;
    margin-bottom: 20px;
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

  .review_item_inr {
    display: inline-flex;
    margin-bottom: 5px;
    width: 100%;
  }

  .review_item_inr > .star_score {
    display: inline-flex;
  }

  .bold {
    font-weight: bold;
  }

  .paginate span {
    margin-right: 5px;
  }

  .iOyFJs {
    width: 340px;
    height: calc(100% - 100px);
    position: absolute;
    top: 60px;
    right: calc(50% - 530px);
  }

  .iOyFJs .wrap {
    position: sticky;
    top: 180px;
  }
  .iOyFJs .contents {
    display: flex;
    flex-direction: column;
    padding: 32px 32px 40px;
    border: 1px solid rgb(228, 228, 228);
    border-image: initial;
    box-sizing: border-box;
    border-radius: 0px 0px 4px 4px;
  }
  .iOyFJs .contents .company {
    display: flex;
    gap: 18px;
  }

  .iOyFJs .contents .company > img {
    border-radius: 100px;
    border: 1px solid rgb(228, 228, 228);
  }

  .iOyFJs .contents .company .name {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .iOyFJs .contents .company .name > h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    color: rgb(0, 0, 0);
  }

  .iOyFJs .contents .company .name > span {
    display: flex;
    align-items: center;
    gap: 2px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
    color: rgb(68, 68, 68);
  }

  .iOyFJs .contents .company .name > span svg {
    width: 16px;
    height: 16px;
  }

  .iOyFJs .contents .details {
    margin: 24px 0px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 15px;
    line-height: 22px;
  }

  .iOyFJs .contents .details {
    margin: 24px 0px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 15px;
    line-height: 22px;
  }

  .iOyFJs .contents .details > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0px 14px;
  }

  .iOyFJs .contents .details > div dt {
    width: 76px;
    min-width: 76px;
    color: rgb(102, 102, 102);
  }
  .iOyFJs .contents .details > div dd > strong {
    font-weight: 500;
    color: rgb(68, 68, 68);
  }
  .iOyFJs .contents .details > div dd > strong > span {
    margin-left: 2px;
    font-size: 15px;
    line-height: 22px;
    color: rgb(136, 136, 136);
  }
  .iOyFJs .contents .details > div dt {
    width: 76px;
    min-width: 76px;
    color: rgb(102, 102, 102);
  }
  .iOyFJs .contents .details > div dd > a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
    color: rgb(0, 221, 109);
    text-decoration-line: underline;
  }
  .iOyFJs .contents .details > div dd > a > span {
    max-width: 160px;
    overflow-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    white-space: nowrap;
  }
  .iOyFJs .contents .details > div dd > a > svg {
    width: 16px;
    height: 16px;
  }
  .iOyFJs .contents .details > div dd > a > svg path {
    fill: rgb(0, 221, 109);
  }

  .jubIHb {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .jubIHb > button {
    font-size: 15px;
    line-height: 22px;
    width: 100%;
    height: 48px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .kPJGoV {
    background: rgb(0, 221, 109);
    border: 1px solid rgb(0, 221, 109);
    color: rgb(255, 255, 255);
    padding: 0px 16px;
    border-radius: 3px;
  }
</style>
