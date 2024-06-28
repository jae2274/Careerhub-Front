import {writable} from "svelte/store";

export const addedAuthorities = setAddedAuthorities();

function setAddedAuthorities() {
  const authorities = [];

  const {subscribe, set, update} = writable(authorities);

  function addAuthority(authority) {
    update((authorities) => {
      authorities.push(authority);
      return authorities;
    });
  }

  function deleteAuthority(index) {
    update((authorities) => {
      authorities.splice(index, 1);
      return authorities;
    });
  }

  function clear() {
    set([]);
  }

  return {
    subscribe,
    addAuthority,
    deleteAuthority,
    clear,
    set,
  };
}
