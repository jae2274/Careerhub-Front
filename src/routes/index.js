import JobPostingDetail from '~/routes/job_posting/postingId.svelte'
import JobPostingList from '~/routes/job_posting/index.svelte'

export default {
    '/job_posting': JobPostingList,
    '/job_posting/:postingId': JobPostingDetail, // 파라미터가 있는 페이지
}