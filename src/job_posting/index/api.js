

export  async function findJobPostings(request){

    return await (
        await fetch(`http://localhost:8081/job_posting${createQuery(request)||""}`)
    ).json()
}

export  async function category(){
    return await (
        await fetch(`http://localhost:8081/category`)
    ).json()
}

export  async function getSkill(name){
    if(!name)
        return new Promise((resolve,_)=>resolve([]))

    return await (
        await fetch(`http://localhost:8081/skill?name=${name}`)
    ).json()
}

export function createQuery(req){
    const parts = []

    if(isNotEmpty(req.categoryIds))
        parts.push(`category=${req.categoryIds.join(",")}`)
    if(isNotEmpty(req.skillIds))
        parts.push(`skill=${req.skillIds.join(",")}`)
    if(isNotEmpty(req.tagIds))
        parts.push(`tag=${req.tagIds.join(",")}`)

    if(req.minCareer)
        parts.push(`minCareer=${req.minCareer}`)
    if(req.maxCareer)
        parts.push(`maxCareer=${req.maxCareer}`)

    if(req.page && req.size){
        parts.push(`page=${req.page}&size=${req.size}`)
    }

    const query = parts.join("&")

    return query? `?${query}`:""
}

function isNotEmpty(list){
    return list && list.length>0
}