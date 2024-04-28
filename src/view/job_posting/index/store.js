import {writable} from "svelte/store";

export const initPage = 0;
export const request = setRequest();

function setRequest() {
  const request = {
    page: initPage,
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

  const nextPage = () => {
    update((request) => {
      request.page = request.page + 1;
      return request;
    });
  };

  const setQuery = (query) => {
    update((request) => {
      request.query = query;
      return request;
    });
  };

  const initRequest = (request) => set(request);

  return {
    initRequest,
    nextPage,
    subscribe,
    setQuery,
  };
}

function setPage() {
  const {subscribe, update} = writable(initPage);

  const nextPage = (page) => update((page) => page + 1);

  return {subscribe, nextPage};
}
