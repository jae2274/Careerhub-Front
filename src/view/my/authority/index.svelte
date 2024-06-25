<script>
  import Layout from "~/components/my/Layout.svelte";
  import {getAuthorities} from "~/view/my/authority/api";

  $: authorities = [];
  getAuthorities().then((res) => {
    authorities = res.authorities;
  });
</script>

<Layout>
  <div slot="content">
    <table>
      <tr>
        <th>권한명</th>
        <th>설명</th>
        <th>만료일</th>
      </tr>
      {#each authorities as authority}
        <tr>
          <td>{authority.authorityName}</td>
          <td>{authority.summary}</td>
          <td>{authority.expiryDate || "무기한"}</td>
        </tr>
      {/each}
    </table>
  </div>
</Layout>
