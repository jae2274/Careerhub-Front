<script>
  import Layout from "~/components/admin/Layout.svelte";
  import CreateTicket from "~/view/admin/ticket/create/index.svelte";
  import {getTickets} from "~/view/admin/ticket/api";
  import {convertDateTimeFormat} from "~/utils";

  $: tickets = [];
  $: filteredStatus = "all";
  $: byMe = true;
  $: getTickets(byMe).then((res) => {
    tickets = res.tickets;
  });
  $: filteredTickets = tickets.filter((ticket) => {
    if (filteredStatus === "all") {
      return true;
    }

    if (filteredStatus === "used") {
      return ticket.usedCount >= ticket.useableCount;
    }

    if (filteredStatus === "unused") {
      return !(ticket.usedCount >= ticket.useableCount);
    }
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

  $: isCreatingTicket = false;
  function afterCreateTicket() {
    isCreatingTicket = false;
    getTickets(byMe).then((res) => {
      tickets = res.tickets;
    });
  }
</script>

<Layout>
  <div slot="content">
    {#if isCreatingTicket}
      <CreateTicket {afterCreateTicket} />
      <button on:click={() => (isCreatingTicket = false)}>생성 취소</button>
    {:else}
      <button class="linkCreate" on:click={() => (isCreatingTicket = true)}>
        티켓 생성
      </button>
    {/if}

    <div class="filteredStatus">
      <select bind:value={filteredStatus}>
        <option value="all">전체</option>
        <option value="used">사용됨</option>
        <option value="unused">미사용</option>
      </select>
      <label for="byMe"
        >내가 생성한 티켓만 보기
        <input id="byMe" type="checkbox" bind:checked={byMe} />
      </label>
    </div>
    <table class="ticketTable">
      <tr>
        <th class="ticket_name">티켓명</th>
        <!-- <th>티켓 코드</th> -->
        <th class="created_at">생성일</th>
        <th class="used_count">사용 횟수</th>
        <th class="used_user">사용자 명단</th>
        <th>권한 목록</th>
      </tr>
      {#each filteredTickets as ticket}
        <tr>
          <td>{ticket.ticketName}</td>
          <!-- <td class="ticket_id">{ticket.ticketId}</td> -->
          <td>
            {convertDateTimeFormat(ticket.createUnixMilli)}
          </td>
          <td>
            <span
              class={ticket.useableCount <= ticket.usedCount ? "red" : "green"}
            >
              {ticket.usedCount}/{ticket.useableCount}
            </span>
          </td>
          <td>
            <table class="used_info">
              {#each ticket.usedInfos as usedInfo}
                <tr>
                  <td>{usedInfo.usedUserName}</td>
                  <td>{convertDateTimeFormat(usedInfo.usedUnixMilli)}</td>
                </tr>
              {/each}
            </table>
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

  .ticket_name {
    width: 150px;
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

  .used_count {
    width: 70px;
  }

  .used_user {
    width: 200px;
  }

  .created_at {
    width: 150px;
  }

  table {
    border-collapse: collapse; /* 테두리 중복 제거 */
  }
  table > tr {
    text-align: left; /* 텍스트 정렬 */
    border-bottom: 1px solid black; /* 오른쪽 세로줄 추가 */
  }

  table.authorities > tr:last-child,
  table.used_info > tr:last-child {
    border-bottom: none; /* 마지막 열의 세로줄 제거 */
  }
  .red {
    color: red;
  }

  .green {
    color: green;
  }
</style>
