<script>
  import AddAuthority from "~/components/admin/authority/AddAuthority.svelte";
  import {addedAuthorities} from "~/components/admin/authority/addAuthorityStore";
  import {addAuthorities} from "~/view/admin/user/api";

  export let user = {};
  export let afterAddAuthorities = () => {};

  function addAuthoritiesAction() {
    addAuthorities(user.userId, $addedAuthorities).then(() => {
      afterAddAuthorities();
      addedAuthorities.set([]);
    });
  }
</script>

<div>
  <p>{user.userName} 대상 권한 조정</p>
  <AddAuthority />
  <p>권한 부여 이후 사용자에게 재로그인을 요청해주세요</p>
  <button on:click={addAuthoritiesAction}>권한 부여</button>
</div>
