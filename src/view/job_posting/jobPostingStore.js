import {writable} from "svelte/store";
export const initPage = 0;
export const jobPostingInfo = setJobPostingInfo();

function setJobPostingInfo() {
  const jobPostingInfo = {
    queryStr: "",
    scrollAnchor: 0,
    page: initPage,
    jobPostings: [],
  };

  const {subscribe, set, update} = writable(jobPostingInfo);

  const setScrollAnchor = (scrollAnchor) => {
    update((jobPostingInfo) => {
      jobPostingInfo.scrollAnchor = scrollAnchor;
      return jobPostingInfo;
    });
  };

  const addJobPostings = (jobPostings) => {
    update((jobPostingInfo) => {
      jobPostingInfo.jobPostings.push(...jobPostings);
      return jobPostingInfo;
    });
  };

  const setPage = (page) => {
    update((jobPostingInfo) => {
      jobPostingInfo.page = page;
      return jobPostingInfo;
    });
  };

  const init = (queryStr) => {
    update((jobPostingInfo) => {
      jobPostingInfo.queryStr = queryStr;
      jobPostingInfo.page = initPage;
      jobPostingInfo.scrollAnchor = 0;
      jobPostingInfo.jobPostings = [];
      return jobPostingInfo;
    });
  };

  return {
    addJobPostings,
    init,
    setScrollAnchor,
    subscribe,
    setPage,
  };
}
