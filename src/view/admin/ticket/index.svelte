<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {link} from "svelte-spa-router";

  import {getTickets} from "~/view/admin/ticket/api";

  $: tickets = [];
  $: filteredStatus = "all";
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
    <table>
      <tr>
        <th class="authority_name">권한명</th>
        <th class="expiry_duration">추가기한</th>
        <th class="is_used">사용여부</th>
        <th class="created_at">생성일</th>
      </tr>
    </table>
    {#each filteredTickets as ticket}
      <div class="ticketInfo">
        <h4>{ticket.ticketId}</h4>
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
              <td class="is_used">{ticket.isUsed ? "사용됨" : "미사용"}</td>
              <td class="created_at"
                >{new Date(ticket.createUnixMilli).toLocaleString()}</td
              >
            </tr>
          {/each}
        </table>
      </div>
    {/each}
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
</style>
