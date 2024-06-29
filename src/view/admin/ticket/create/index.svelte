<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {createTicket} from "~/view/admin/ticket/api";

  import AddAuthority from "~/components/admin/authority/AddAuthority.svelte";
  import {addedAuthorities} from "~/components/admin/authority/addAuthorityStore";

  // $: addedAuthorities = [];
  $: ticketName = "";
  export let afterCreateTicket = () => {};

  function createTicketAction() {
    if ($addedAuthorities.length === 0) {
      alert("권한을 추가해주세요.");
      return;
    }
    createTicket(ticketName, $addedAuthorities).then((res) => {
      addedAuthorities.clear();
      ticketName = "";
      afterCreateTicket();
    });
  }
</script>

<div>
  <button on:click={createTicketAction}>티켓 생성</button>
  <div>
    티켓 이름: <input type="text" bind:value={ticketName} />
  </div>
  <AddAuthority />
</div>
