

export  async function findJobPostings(requestStr){

    return await (
        await fetch(`http://localhost:8081/job_posting${requestStr||""}`)
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

export function createQuery(req, isPaging){
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

    if(req.page && req.size && isPaging){
        parts.push(`page=${req.page}&size=${req.size}`)
    }

    const query = parts.join("&")

    return query? `?${query}`:""
}


export function parseQuery(queryString) {
    const queryParams = new URLSearchParams(queryString);

    return {
        page:1,
        size: 16,
        categoryIds: queryParams.getAll('category').flatMap(split),
        skillIds: queryParams.getAll('skill').flatMap(split),
        tagIds: queryParams.getAll('tag').flatMap(split),
        minCareer: Number(queryParams.get('minCareer')),
        maxCareer: Number(queryParams.get('maxCareer')),
    }
}

function split(listStr){
    return listStr.split(',').map(Number);
}
function isNotEmpty(list){
    return list && list.length>0
}