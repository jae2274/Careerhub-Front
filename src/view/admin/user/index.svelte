<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {getAllUsers} from "~/view/admin/user/api";
  import AddAuthorities from "~/view/admin/user/add_authority/index.svelte";

  const now = new Date().getTime();
  $: users = [];
  getAllUsers().then((res) => {
    users = res.users;
  });

  $: targetUser = null;

  function afterAddAuthorities() {
    targetUser = null;
    getAllUsers().then((res) => {
      users = res.users;
    });
  }
</script>

<Layout>
  <div slot="content">
    {#if targetUser}
      <AddAuthorities user={targetUser} {afterAddAuthorities} />
      <button on:click={() => (targetUser = null)}>취소</button>
    {/if}

    <table>
      <tr>
        <th>oauth id</th>
        <th class="username">아이디</th>
        <th>이메일</th>
        <th>권한</th>
        <th class="startAddAuthority"></th>
        <th>가입일</th>
      </tr>
      {#each users as user}
        <tr>
          <td>{user.authorizedBy}<br />{user.authorizedId}</td>
          <td>{user.userName}</td>
          <td>{user.email}</td>
          <td>
            <table class="authorities">
              {#each user.authorities as { authorityName, expiryUnixMilli }}
                <tr>
                  <td class="authority_name">{authorityName}</td>
                  <td>
                    <span
                      class={now < expiryUnixMilli || !expiryUnixMilli
                        ? "green"
                        : "red"}
                    >
                      {expiryUnixMilli
                        ? new Date(expiryUnixMilli).toLocaleString()
                        : "무기한"}
                    </span>
                  </td>
                </tr>
              {/each}
            </table>
          </td>
          <td
            ><button on:click={() => (targetUser = user)}>권한 부여</button></td
          >
          <td>{new Date(user.createdUnixMilli).toLocaleString()}</td>
        </tr>
      {/each}
    </table>
  </div>
</Layout>

<style>
  .username {
    width: 80px;
  }

  .authority_name {
    width: 180px;
  }

  .startAddAuthority {
    width: 60px;
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
