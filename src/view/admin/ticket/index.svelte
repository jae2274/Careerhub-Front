<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {link} from "svelte-spa-router";

  import {getTickets} from "~/view/admin/ticket/api";

  $: tickets = [];
  $: filteredStatus = "unused";
  $: filteredTickets = tickets.filter((ticket) => {
    if (filteredStatus === "all") {
      return true;
    }

    if (filteredStatus === "used") {
      return ticket.isUsed;
    }

    if (filteredStatus === "unused") {
      return !ticket.isUsed;
    }
  });
  getTickets().then((res) => {
    tickets = res.tickets;
  });

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
</script>

<Layout>
  <div slot="content">
    <button class="linkCreate">
      <a use:link href="/admin/ticket/create">티켓 생성</a>
    </button>

    <div class="filteredStatus">
      <select bind:value={filteredStatus}>
        <option value="all">전체</option>
        <option value="used">사용됨</option>
        <option value="unused">미사용</option>
      </select>
    </div>
    <table class="ticketTable">
      <tr>
        <th>티켓 코드</th>
        <th>생성일</th>
        <th>사용여부</th>
        <th>권한 목록</th>
      </tr>
      {#each filteredTickets as ticket}
        <tr>
          <td class="ticket_id">{ticket.ticketId}</td>
          <td class="created_at">
            {new Date(ticket.createUnixMilli).toLocaleString()}
          </td>
          <td class="is_used">
            <span class={ticket.isUsed ? "red" : "green"}>
              {ticket.isUsed ? "사용됨" : "미사용"}
            </span>
          </td>
          <td>
            <table class="authorities">
              {#each ticket.ticketAuthorities as authority}
                <tr>
                  <td class="authority_name">{authority.authorityName}</td>
                  <td class="expiry_duration">
                    {#if authority.expiryDurationMS}
                      {convertMS(authority.expiryDurationMS)}
                    {:else}
                      기한 없음
                    {/if}
                  </td>
                </tr>
              {/each}
            </table>
          </td>
        </tr>
      {/each}
    </table>
    <!-- <div class="ticketInfo">
        <h4>{ticket.ticketId}</h4>
        <p>
          <strong>생성일:</strong>
          {new Date(ticket.createUnixMilli).toLocaleString()}
        </p>
        <p><strong>사용여부:</strong> {ticket.isUsed ? "사용됨" : "미사용"}</p>
        <div class="ticketAuthorities">
          <div style="width: 100px;"><strong>권한 목록:</strong></div>
          <table>
            {#each ticket.ticketAuthorities as authority}
              <tr>
                <td class="authority_name">{authority.authorityName}</td>
                <td class="expiry_duration">
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
      </div> -->
  </div>
</Layout>

<style>
  .linkCreate {
    margin-bottom: 10px;
  }
  .filteredStatus {
    width: 540px;
    text-align: right;
  }
  .ticketInfo {
    margin-top: 10px;
  }

  .ticket_id {
    width: 310px;
  }
  .authority_name {
    width: 180px;
  }

  .expiry_duration {
    width: 120px;
  }

  .is_used {
    width: 60px;
  }

  .created_at {
    width: 180px;
  }

  table {
    border-collapse: collapse; /* 테두리 중복 제거 */
  }
  table > tr {
    text-align: left; /* 텍스트 정렬 */
    border-bottom: 1px solid black; /* 오른쪽 세로줄 추가 */
  }

  table.authorities > tr:last-child {
    border-bottom: none; /* 마지막 열의 세로줄 제거 */
  }
  .red {
    color: red;
  }

  .green {
    color: green;
  }
</style>
