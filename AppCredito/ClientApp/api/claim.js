import qs        from 'qs'
import axios     from 'axios'
import config    from '../app/config'
import store     from '../app/store'

let SERVER = config.SERVER


let configAxios = {
    'FORM': {
        'headers': { 'Content-Type': 'application/x-www-form-urlencoded'}
    },
    'BLOB': {
        'responseType': 'blob',
        
    },
    'JSON': {
        'headers': { 'Content-Type': 'application/json;charset=utf-8'}
    },
    'FORMDATA' : {
        'headers': { 'Content-Type': 'multipart/form-data'}
    }
}

const VERBS_HTTP = 'put post get delete'
    .split(' ')

const encodeParams = (params) => {
    let newParams = new URLSearchParams()
    for (var key in params)
        newParams.append(key, params[key])
    return newParams
}

const encodeParamsGet = (params) => {
    return {
        'params': params
    }
}

const factoryClaim = (method) => {
    let encodeFunc = method !== 'get' ? encodeParams : encodeParamsGet
    return (controller, action, data, config = configAxios.JSON) => {        
        config.headers.Authorization="Bearer "+store.state.user.token;
        if(method=="get")
        {
          config.params=data;
          return axios[ method ](`${SERVER.SERVER_API_ADDRESS}/${controller}/${action}`,config)
        }
        else if(method=="delete")
        {
            
            return axios[ method ](`${SERVER.SERVER_API_ADDRESS}/${controller}/${action}/${data}`,config)
        }
        else if(method=="put")
        {
            return axios[ method ](`${SERVER.SERVER_API_ADDRESS}/${controller}/${action}`, data, config)
        }       
        else
        {
            return axios[ method ](`${SERVER.SERVER_API_ADDRESS}/${controller}/${action}`,encodeFunc(data) ,config)
        }          
    }
}

const claim = (function () {
    let claims = {}
    VERBS_HTTP.forEach(verb => claims[verb] = factoryClaim(verb))
    return claims
})()

export default claim