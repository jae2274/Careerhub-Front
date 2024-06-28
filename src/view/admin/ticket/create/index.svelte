<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {createTicket} from "~/view/admin/ticket/api";

  import AddAuthority from "~/components/admin/authority/AddAuthority.svelte";
  import {addedAuthorities} from "~/components/admin/authority/addAuthorityStore";

  // $: addedAuthorities = [];

  function createTicketAction() {
    if ($addedAuthorities.length === 0) {
      alert("권한을 추가해주세요.");
      return;
    }
    createTicket($addedAuthorities).then((res) => {
      addedAuthorities.clear();
      window.location.href = "/#/admin/ticket";
    });
  }
</script>

<Layout>
  <div slot="content">
    <button on:click={createTicketAction}>티켓 생성</button>
    <AddAuthority />
  </div>
</Layout>
