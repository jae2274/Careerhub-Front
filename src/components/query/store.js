import {writable} from "svelte/store";

export const initPage = 0;
export const query = setQuery();

function setQuery() {
  const query = {
    categories: [],
    skillNames: [],
    tagIds: [],
    minCareer: null,
    maxCareer: null,
  };

  const {subscribe, set, update} = writable(query);

  const nextPage = () => {
    update((query) => {
      query.page = query.page + 1;
      return query;
    });
  };
  const addCategory = (site, categoryName) => {
    update((query) => {
      if (!query.categories.includes({site, categoryName})) {
        query.categories.push({site, categoryName});
        query.page = initPage;
      }
      return query;
    });
  };
  const removeCategory = (site, categoryName) => {
    update((query) => {
      query.categories = query.categories.filter(
        (cate) => cate.site != site || cate.categoryName != categoryName
      );
      query.page = initPage;
      return query;
    });
  };

  const clearCategory = () => {
    update((query) => {
      query.categories = [];
      query.page = initPage;
      return query;
    });
  };

  const addSkill = (skillNames) => {
    update((query) => {
      for (const querySkill of query.skillNames) {
        if (querySkill == skillNames) return query;
      }
      query.skillNames.push(skillNames);
      query.page = initPage;
      return query;
    });
  };
  const removeSkill = (skillId) => {
    update((query) => {
      query.skillNames = query.skillNames.filter((id) => skillId !== id);
      query.page = initPage;
      return query;
    });
  };

  const setMinCareer = (career) => {
    update((query) => {
      query.minCareer = career;
      query.page = initPage;
      return query;
    });
  };
  const setMaxCareer = (career) => {
    update((query) => {
      query.maxCareer = career;
      query.page = initPage;
      return query;
    });
  };

  const setTag = (tags) => {
    update((query) => {
      query.tagIds = tags;
      query.page = initPage;
      return query;
    });
  };

  const initQuery = (query) => set(query);

  return {
    initQuery,
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
