<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {link} from "svelte-spa-router";

  import {getTickets} from "~/view/admin/ticket/api";

  $: tickets = [];
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
    <button>
      <a use:link href="/admin/ticket/create">티켓 생성</a>
    </button>
    {#each tickets as ticket}
      <table>
        <tr>
          <th>티켓ID</th>
          <th>권한명</th>
          <th>추가기한</th>
          <th>생성일</th>
        </tr>
        {#each ticket.ticketAuthorities as authority}
          <tr>
            <td>{ticket.ticketId}</td>
            <td>{authority.authorityName}</td>
            <td>
              {#if authority.expiryDurationMS}
                {convertMS(authority.expiryDurationMS)}
              {:else}
                기한 없음
              {/if}
            </td>
            <td>{new Date(ticket.createUnixMilli).toLocaleString()}</td>
          </tr>
        {/each}
      </table>
    {/each}
  </div>
</Layout>
