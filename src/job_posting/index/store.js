import {writable} from 'svelte/store'

export const request = setRequest()
function setRequest(){
    const request = {
        page:1,
        size: 16,
        categoryIds: [],
        skillIds: [],
        tagIds: [],
    }

    const {subscribe, set, update} = writable(request)

    const nextPage = ()=>{
        update(request=>{
            request.page = request.page+1
            return request
        })
    }
    const addCategory = (categoryId)=>{
        update(request=>{
            if(!request.categoryIds.includes(categoryId)){
                request.categoryIds.push(categoryId)
                request.page=1
            }
            return request
        })
    }    
    const removeCategory = (category)=>{
        update(request=>{
            request.categoryIds = request.categoryIds.filter(cate=>category!==cate)
            request.page=1
            return request
        })
    }

    const addSkill = (skillId)=>{
        update(request=>{
            if(!request.skillIds.includes(skillId)){
                request.skillIds.push(skillId)
                request.page=1
            }
            return request
        })
    }
    const removeSkill = (skillId)=>{
        update(request=>{
            request.skillIds = request.skillIds.filter(id=>skillId!==id)
            request.page=1
            return request
        })
    }
    const setTag = (tags)=>{
        update(request=>{
            request.tagIds = tags
            request.page=1
            return request
        })
    }


    return {
        nextPage, subscribe, removeCategory, addCategory, addSkill, removeSkill, setTag
    }
}

function setPage(){
    const page = 1
    const {subscribe,  update} = writable(page)

    const nextPage = (page)=>update(page=>page+1)

    return {subscribe, nextPage}
}