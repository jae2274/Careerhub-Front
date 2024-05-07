import {writable} from "svelte/store";

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

  const addCategory = (site, categoryName) => {
    update((query) => {
      if (!query.categories.includes({site, categoryName})) {
        query.categories.push({site, categoryName});
      }
      return query;
    });
  };
  const removeCategory = (site, categoryName) => {
    update((query) => {
      query.categories = query.categories.filter(
        (cate) => cate.site != site || cate.categoryName != categoryName
      );
      return query;
    });
  };

  const clearCategory = () => {
    update((query) => {
      query.categories = [];
      return query;
    });
  };

  const addSkill = (skillNames) => {
    update((query) => {
      for (const querySkill of query.skillNames) {
        if (querySkill == skillNames) return query;
      }
      query.skillNames.push(skillNames);
      return query;
    });
  };
  const removeSkill = (skillId) => {
    update((query) => {
      query.skillNames = query.skillNames.filter((id) => skillId !== id);
      return query;
    });
  };

  const setMinCareer = (career) => {
    update((query) => {
      query.minCareer = career;
      return query;
    });
  };
  const setMaxCareer = (career) => {
    update((query) => {
      query.maxCareer = career;
      return query;
    });
  };

  const setTag = (tags) => {
    update((query) => {
      query.tagIds = tags;
      return query;
    });
  };

  const initQuery = (newQuery) => {
    update((query) => {
      query.categories = newQuery.categories || [];
      query.skillNames = newQuery.skillNames || [];
      query.tagIds = newQuery.tagIds || [];
      query.minCareer = newQuery.minCareer || null;
      query.maxCareer = newQuery.maxCareer || null;
      return query;
    });
  };

  const clearQuery = () =>
    update((query) => {
      query.categories = [];
      query.skillNames = [];
      query.tagIds = [];
      query.minCareer = null;
      query.maxCareer = null;
      return query;
    });
  return {
    initQuery,
    subscribe,
    setMinCareer,
    setMaxCareer,
    removeCategory,
    addCategory,
    clearCategory,
    addSkill,
    removeSkill,
    setTag,
    clearQuery,
  };
}
