import {writable} from "svelte/store";
export const initPage = 0;
export const promiseInfo = setPromiseInfo();

function setPromiseInfo() {
  const promiseInfo = {
    queryStr: "",
    scrollAnchor: 0,
    page: initPage,
    promises: [],
  };

  const {subscribe, set, update} = writable(promiseInfo);

  const setScrollAnchor = (scrollAnchor) => {
    update((promiseInfo) => {
      promiseInfo.scrollAnchor = scrollAnchor;
      return promiseInfo;
    });
  };

  const addPromise = (promise) => {
    update((promiseInfo) => {
      promiseInfo.promises.push(promise);
      return promiseInfo;
    });
  };

  const setPage = (page) => {
    update((promiseInfo) => {
      promiseInfo.page = page;
      return promiseInfo;
    });
  };

  const init = (queryStr) => {
    update((promiseInfo) => {
      promiseInfo.queryStr = queryStr;
      promiseInfo.page = initPage;
      promiseInfo.scrollAnchor = 0;
      promiseInfo.promises = [];
      return promiseInfo;
    });
  };

  return {
    addPromise,
    init,
    setScrollAnchor,
    subscribe,
    setPage,
  };
}
