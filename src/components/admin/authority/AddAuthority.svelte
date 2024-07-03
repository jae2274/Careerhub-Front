<script>
  import {getAllAuthorities} from "~/components/admin/authority/api";
  import {addedAuthorities} from "~/components/admin/authority/addAuthorityStore";

  let authorities = [];
  getAllAuthorities().then((res) => {
    authorities = res.authorities;
  });

  let selectedAuthorityCode = "";
  let checkedExpiry = true;
  let expiryDay = 90;
  let expiryHour = 0;
  let expiryMinute = 0;

  function clear() {
    selectedAuthorityCode = "";
    checkedExpiry = true;
    expiryDay = 90;
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
    addedAuthorities.addAuthority(ticketAuthority);
    clear();
  }

  function deleteAuthority(index) {
    addedAuthorities.deleteAuthority(index);
  }
</script>

<table>
  <tr>
    <th class="authority_name">권한 이름</th>
    <th class="expiry_duration">추가기한</th>
    <th>삭제</th>
  </tr>
  {#each $addedAuthorities as ticketAuthority, index}
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
            (ticketAuthority.expiryDurationMS % (60 * 60 * 1000)) / (60 * 1000)
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
      <option value={authority.authorityCode}>{authority.authorityName}</option>
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

<style>
  input[type="number"] {
    width: 50px;
  }

  table {
    margin-top: 10px;
    margin-bottom: 30px;
    border-collapse: collapse; /* 테두리 중복 제거 */
  }
  table > tr > td,
  table > tr > th {
    text-align: left; /* 텍스트 정렬 */
    border-bottom: 1px solid black; /* 오른쪽 세로줄 추가 */
  }

  .authority_name {
    width: 180px;
  }

  .expiry_duration {
    width: 120px;
  }
</style>
