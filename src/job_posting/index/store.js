import {writable} from "svelte/store";

export const initPage = 0;
export const request = setRequest();

function setRequest() {
  const request = {
    page: initPage,
    size: 16,
    categories: [],
    skillNames: [],
    tagIds: [],
    minCareer: null,
    maxCareer: null,
  };

  const {subscribe, set, update} = writable(request);

  const nextPage = () => {
    update((request) => {
      request.page = request.page + 1;
      return request;
    });
  };
  const addCategory = (site, categoryName) => {
    update((request) => {
      if (!request.categories.includes({site, categoryName})) {
        request.categories.push({site, categoryName});
        request.page = initPage;
      }
      return request;
    });
  };
  const removeCategory = (site, categoryName) => {
    update((request) => {
      request.categories = request.categories.filter(
        (cate) => cate.site != site || cate.categoryName != categoryName
      );
      request.page = initPage;
      return request;
    });
  };

  const clearCategory = () => {
    update((request) => {
      request.categories = [];
      request.page = initPage;
      return request;
    });
  };

  const addSkill = (skillId) => {
    update((request) => {
      if (!request.skillNames.includes(skillId)) {
        request.skillNames.push(skillId);
        request.page = initPage;
      }
      return request;
    });
  };
  const removeSkill = (skillId) => {
    update((request) => {
      request.skillNames = request.skillNames.filter((id) => skillId !== id);
      request.page = initPage;
      return request;
    });
  };

  const setMinCareer = (career) => {
    update((request) => {
      request.minCareer = career;
      request.page = initPage;
      return request;
    });
  };
  const setMaxCareer = (career) => {
    update((request) => {
      request.maxCareer = career;
      request.page = initPage;
      return request;
    });
  };

  const setTag = (tags) => {
    update((request) => {
      request.tagIds = tags;
      request.page = initPage;
      return request;
    });
  };

  const initRequest = (request) => set(request);

  return {
    initRequest,
    nextPage,
    subscribe,
    setMinCareer,
    setMaxCareer,
    removeCategory,
    addCategory,
    clearCategory,
    addSkill,
    removeSkill,
    setTag,
  };
}

function setPage() {
  const {subscribe, update} = writable(initPage);

  const nextPage = (page) => update((page) => page + 1);

  return {subscribe, nextPage};
}
