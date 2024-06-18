import {writable} from "svelte/store";

export const agreements = setAgreements();

function setAgreements() {
  const agreements = [];

  const {subscribe, set, update} = writable(agreements);

  const switchAgreement = (agreementId) => {
    update((agreements) => {
      for (const agreement of agreements) {
        if (agreement.agreementId === agreementId) {
          agreement.isAgree = !agreement.isAgree;
        }
      }

      return agreements;
    });
  };

  const switchTotalAgreements = (isAgree) => {
    update((agreements) => {
      for (const agreement of agreements) {
        agreement.isAgree = isAgree;
      }

      return agreements;
    });
  };

  return {
    subscribe,
    set,
    switchAgreement,
    switchTotalAgreements,
  };
}

export const loginStore = setLoginStore();

function setLoginStore() {
  const loginStore = {
    status: "sign_in",
    authToken: "",
    email: "",
    username: "",
  };

  const {subscribe, set, update} = writable(loginStore);

  const setAuthToken = (authToken) => {
    update((loginStore) => {
      loginStore.authToken = authToken;
      return loginStore;
    });
  };

  const setEmail = (email) => {
    update((loginStore) => {
      loginStore.email = email;
      return loginStore;
    });
  };

  const setUsername = (username) => {
    update((loginStore) => {
      loginStore.username = username;
      return loginStore;
    });
  };

  const setStatus = (status) => {
    update((loginStore) => {
      loginStore.status = status;
      return loginStore;
    });
  };

  const reset = () => {
    update((loginStore) => {
      loginStore.status = "sign_in";
      loginStore.authToken = "";
      loginStore.email = "";
      loginStore.username = "";
      return loginStore;
    });
  };

  return {
    subscribe,
    set,
    setAuthToken,
    setEmail,
    setUsername,
    setStatus,
    reset,
  };
}
