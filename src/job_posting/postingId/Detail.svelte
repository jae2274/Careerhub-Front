<script>
  import {link} from "svelte-spa-router";

  export let postingDetail;
  $: site = postingDetail.site;
  $: title = postingDetail.title;
  $: skills = postingDetail.skills;
  $: mainTask = postingDetail.mainTask;
  $: qualifications = postingDetail.qualifications;
  $: preferred = postingDetail.preferred;
  $: benefits = postingDetail.benefits;
  $: recruitProcess = postingDetail.recruitProcess;
  $: intro = postingDetail.intro;
  $: careerMin = postingDetail.careerMin;
  $: careerMax = postingDetail.careerMax;
  //   $: tags = postingDetail.tags;
  $: companyId = postingDetail.companyId;
  //   $: companyImages = [""]; //TODO: postingDetail.companyImages;
  $: companyName = postingDetail.companyName;
</script>

<div class="gzkEnW">
  <div class="sc-gVkuDy lkjbjv">
    <section class="sc-cvlWTT difxia">
      <h1>{title}</h1>
      <div class="position_title_box_desc">
        <a use:link href={`/company/${companyId}`}
          >{companyName}<br /> from {site}</a
        >
      </div>
      <ul class="position_tags">
        {#each postingDetail.tags as tag}
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
            {#each postingDetail.addresses as address}
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
          {#each postingDetail.companyImages as image}
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

<style>
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
  .difxia h1 {
    font-weight: 700;
    font-size: 40px;
    margin-bottom: 16px;
    line-height: 1.25;
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
</style>
