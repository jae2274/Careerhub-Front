import {writable} from "svelte/store";

export const request = setRequest();
export const initPage = 0;

function setRequest() {
  const request = {
    page: 0,
    size: 16,
    query: {
      categories: [],
      skillNames: [],
      tagIds: [],
      minCareer: null,
      maxCareer: null,
    },
  };

  const {subscribe, set, update} = writable(request);

  // const nextPage = () => {
  //   update((request) => {
  //     request.page = request.page + 1;
  //     return request;
  //   });
  // };
  const setPage = (page) => {
    update((request) => {
      request.page = page;
      return request;
    });
  };

  const setQuery = (query) => {
    update((request) => {
      request.query = query;
      request.page = initPage;
      return request;
    });
  };

  const initRequest = (page, size, query) => {
    update((request) => {
      request.page = initPage;
      request.query = query;
      return request;
    });
  };

  return {
    setPage,
    initRequest,
    subscribe,
    setQuery,
  };
}

function setPage() {
  const {subscribe, update} = writable(initPage);

  const nextPage = (page) => update((page) => page + 1);

  return {subscribe, nextPage};
}
