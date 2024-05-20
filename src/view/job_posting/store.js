import {writable} from "svelte/store";

export const request = setRequest();

function setRequest() {
  const request = {
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

  const setQuery = (query) => {
    update((request) => {
      request.query = query;
      return request;
    });
  };

  const initRequest = (query) => {
    update((request) => {
      request.page = initPage;
      request.query = query;
      return request;
    });
  };

  return {
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
