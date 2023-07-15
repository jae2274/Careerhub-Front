
export  async function getPostingDetail(postingId){

    return await (
        await fetch(`http://localhost:8081/job_posting/${postingId}`)
    ).json()
}