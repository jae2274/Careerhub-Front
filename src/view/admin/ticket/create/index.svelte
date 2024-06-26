<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {getAllAuthorities, createTicket} from "~/view/admin/ticket/api";
  import {} from "svelte-spa-router";

  $: authorities = [];
  getAllAuthorities().then((res) => {
    authorities = res.authorities;
  });

  $: ticketAuthorities = [];

  let selectedAuthorityCode = "";
  let checkedExpiry = false;
  let expiryDay = 0;
  let expiryHour = 0;
  let expiryMinute = 0;

  function clear() {
    selectedAuthorityCode = "";
    checkedExpiry = false;
    expiryDay = 0;
    expiryHour = 0;
    expiryMinute = 0;
  }

  function addAuthority() {
    const selectedAuthority = authorities.find(
      (authority) => authority.authorityCode === selectedAuthorityCode
    );
    if (!selectedAuthority) {
      return;
    }
    const ticketAuthority = {
      authorityCode: selectedAuthority.authorityCode,
      authorityName: selectedAuthority.authorityName,
    };
    if (checkedExpiry) {
      ticketAuthority.expiryDay = expiryDay;
      ticketAuthority.expiryHour = expiryHour;
      ticketAuthority.expiryMinute = expiryMinute;
      ticketAuthority.expiryDurationMS =
        expiryDay * 24 * 60 * 60 * 1000 +
        expiryHour * 60 * 60 * 1000 +
        expiryMinute * 60 * 1000;
    }
    ticketAuthorities = [...ticketAuthorities, ticketAuthority];
    clear();
  }

  function deleteAuthority(index) {
    ticketAuthorities = ticketAuthorities.filter((_, i) => i !== index);
  }

  function createTicketAction() {
    createTicket(ticketAuthorities).then((res) => {
      window.location.href = "/#/admin/ticket";
    });
  }
</script>

<Layout>
  <div slot="content">
    <button on:click={createTicketAction}>티켓 생성</button>
    <table>
      <tr>
        <th>권한 이름</th>
        <th>추가기한</th>
        <th>삭제</th>
      </tr>
      {#each ticketAuthorities as ticketAuthority, index}
        <tr>
          <td>{ticketAuthority.authorityName}</td>
          <td
            >{#if ticketAuthority.expiryDurationMS}
              {Math.floor(
                ticketAuthority.expiryDurationMS / (24 * 60 * 60 * 1000)
              )}일
              {Math.floor(
                (ticketAuthority.expiryDurationMS % (24 * 60 * 60 * 1000)) /
                  (60 * 60 * 1000)
              )}시간
              {Math.floor(
                (ticketAuthority.expiryDurationMS % (60 * 60 * 1000)) /
                  (60 * 1000)
              )}분
            {/if}
          </td>
          <td>
            <button on:click={() => deleteAuthority(index)}>삭제</button>
          </td>
        </tr>
      {/each}
    </table>
    <div>
      <select bind:value={selectedAuthorityCode}>
        {#each authorities as authority}
          <option value={authority.authorityCode}
            >{authority.authorityName}</option
          >
        {/each}
      </select>
      <input type="checkbox" bind:checked={checkedExpiry} />추가기한 설정

      {#if checkedExpiry}
        <input type="number" bind:value={expiryDay} />일
        <input type="number" bind:value={expiryHour} />시간
        <input type="number" bind:value={expiryMinute} />분
      {/if}
      <button on:click={addAuthority}> 권한 추가 </button>
    </div>
  </div>
</Layout>

<style>
  input[type="number"] {
    width: 50px;
  }
</style>
