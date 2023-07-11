import {writable} from 'svelte/store'

export const request = setRequest()
function setRequest(){
    const request = {
        categoryIds: [],
        skillIds: [],
        tagIds: [],
    }

    const {subscribe, set, update} = writable(request)

    const addCategory = (categoryId)=>{
        update(request=>{
            if(!request.categoryIds.includes(categoryId)){
                request.categoryIds.push(categoryId)
            }
            return request
        })
    }    
    const removeCategory = (category)=>{
        update(request=>{
            request.categoryIds = request.categoryIds.filter(cate=>category!==cate)
            return request
        })
    }

    const addSkill = (skillId)=>{
        update(request=>{
            if(!request.skillIds.includes(skillId)){
                request.skillIds.push(skillId)
            }
            return request
        })
    }
    const removeSkill = (skillId)=>{
        update(request=>{
            request.skillIds = request.skillIds.filter(id=>skillId!==id)
            return request
        })
    }
    const setTag = (tags)=>{
        update(request=>{
            request.tagIds = tags
            return request
        })
    }

    const reset = ()=>set({
        skillIds:[],
        skillIds:[],
        tagIds:[]
    })

    return {
        subscribe, removeCategory, addCategory, addSkill, removeSkill, setTag, reset
    }
}

function setPage(){
    const page = 1
    const {subscribe,  update} = writable(page)

    const nextPage = (page)=>update(page=>page+1)

    return {subscribe, nextPage}
}