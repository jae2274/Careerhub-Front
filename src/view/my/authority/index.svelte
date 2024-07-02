<script>
  import Layout from "~/components/my/Layout.svelte";
  import {
    getAuthorities,
    getTicketInfo,
    useTicket,
  } from "~/view/my/authority/api";
  import {convertDateTimeFormat} from "~/utils";

  $: authorities = [];
  $: now = new Date().getTime();
  getAuthorities().then((res) => {
    now = new Date().getTime();
    authorities = res.authorities;
  });
  $: ticketCode = "";
  $: ticketInfo = null;
  function getTicketInfoAction() {
    ticketCode = ticketCode.trim();
    getTicketInfo(ticketCode).then((res) => {
      ticketInfo = res;
    });
    ticketCode = "";
  }

  function convertMS(ms) {
    const date = {
      day: Math.floor(ms / (24 * 60 * 60 * 1000)),
      hour: Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
      minute: Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000)),
    };

    let dateStr = [];
    if (date.day) {
      dateStr.push(`${date.day}일`);
    }

    if (date.hour) {
      dateStr.push(`${date.hour}시간`);
    }

    if (date.minute) {
      dateStr.push(`${date.minute}분`);
    }

    return dateStr.join(" ");
  }

  function removeTicketInfoAction() {
    ticketInfo = null;
  }

  function useTicketAction() {
    useTicket(ticketInfo.ticketId).then((res) => {
      alert("티켓 사용이 완료되었습니다.");
      getAuthorities().then((res) => {
        authorities = res.authorities;
      });
    });

    ticketInfo = null;
  }
</script>

<Layout>
  <div slot="content">
    <div class="ticketInfo">
      {#if !ticketInfo}
        <div>
          <input
            type="text"
            placeholder="티켓 이름 또는 티켓 코드를 입력하세요"
            bind:value={ticketCode}
            on:keydown={(e) => {
              if (e.key === "Enter") {
                getTicketInfoAction();
              }
            }}
          />
          <button on:click={getTicketInfoAction}>티켓 조회</button>
        </div>
      {:else}
        <div>
          <h4>{ticketInfo.ticketId}</h4>
          <br />
          <span><strong>티켓 이름:</strong> {ticketInfo.ticketName}</span>
          <br />
          <span><strong>총 티켓 갯수:</strong> {ticketInfo.useableCount}</span>
          <br />
          <span><strong>사용된 티켓 갯수:</strong> {ticketInfo.usedCount}</span>
          <table>
            <tr>
              <th class="authority_name">추가될 권한명</th>
              <th>설명</th>
              <th class="expiry_duration">추가 기한</th>
            </tr>
            {#each ticketInfo.ticketAuthorities as authority}
              <tr>
                <td>{authority.authorityName}</td>
                <td>{authority.summary}</td>
                <td>
                  {#if authority.expiryDurationMS}
                    {convertMS(authority.expiryDurationMS)}
                  {:else}
                    기한 없음
                  {/if}
                </td>
              </tr>
            {/each}
          </table>
        </div>
        {#if ticketInfo.alreadyUsed}
          <button on:click={removeTicketInfoAction}
            >이미 사용된 티켓입니다. (다시 조회하기)</button
          >
        {:else if ticketInfo.useableCount <= ticketInfo.usedCount}
          <button on:click={removeTicketInfoAction}
            >사용 가능한 티켓이 없습니다.</button
          >
        {:else}
          <button on:click={useTicketAction}>티켓 사용하기</button>
          <button on:click={removeTicketInfoAction}>취소</button>
        {/if}
      {/if}
    </div>
    <div>
      <p>
        브라우저의 세션 상태에 따라 표기된 만료일보다 수십 분 연장될 수
        있습니다.
      </p>
      <table>
        <tr>
          <th class="authority_name">권한명</th>
          <th>설명</th>
          <th class="expiry_date">만료일</th>
        </tr>
        {#each authorities as authority}
          <tr>
            <td>{authority.authorityName}</td>
            <td>{authority.summary}</td>
            <td>
              <span
                class={now < authority.expiryUnixMilli ||
                !authority.expiryUnixMilli
                  ? "green"
                  : "red"}
              >
                {authority.expiryUnixMilli
                  ? convertDateTimeFormat(authority.expiryUnixMilli)
                  : "무기한"}</span
              ></td
            >
          </tr>
        {/each}
      </table>
    </div>
  </div>
</Layout>

<style>
  .ticketInfo {
    margin-bottom: 30px;
  }
  .summary {
    width: 300px;
  }

  .authority_name {
    width: 180px;
  }

  .expiry_duration {
    width: 120px;
  }

  .expiry_date {
    width: 150px;
  }

  .is_used {
    width: 60px;
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  table {
    border-collapse: collapse; /* 테두리 중복 제거 */
    width: 100%;
  }
  table > tr {
    text-align: left; /* 텍스트 정렬 */
    border-bottom: 1px solid black; /* 오른쪽 세로줄 추가 */
  }
</style>
