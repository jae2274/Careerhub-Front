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
