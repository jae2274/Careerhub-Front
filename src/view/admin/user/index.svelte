<script>
  import Layout from "~/components/admin/Layout.svelte";
  import {getAllUsers} from "~/view/admin/user/api";

  const now = new Date().getTime();
  $: users = [];
  getAllUsers().then((res) => {
    console.log(res);
    users = res.users;
  });
</script>

<Layout>
  <div slot="content">
    <table>
      <tr>
        <th>oauth id</th>
        <th class="username">아이디</th>
        <th>이메일</th>
        <th>권한</th>
        <th>가입일</th>
      </tr>
      {#each users as { authorizedBy, authorizedId, userName, email, authorities, createdUnixMilli }}
        <tr>
          <td>{authorizedBy}<br />{authorizedId}</td>
          <td>{userName}</td>
          <td>{email}</td>
          <td>
            <table class="authorities">
              {#each authorities as { authorityName, expiryUnixMilli }}
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
          <td>{new Date(createdUnixMilli).toLocaleString()}</td>
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
