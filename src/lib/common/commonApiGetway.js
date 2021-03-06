import config from '../../config'
import createHistory from "history/createBrowserHistory"

const history = createHistory({forceRefresh:true})
const baseUrl = config.backendBaseUrl;

export const getRequest = (apiUrl) => {
    return fetch(baseUrl + apiUrl, {
        method: 'GET',
        headers: headers()

    })
        .then(res => successHandle(res))
        .catch(err => errorHandle(err))

};

export const postRequest = (apiUrl, data) => {
    return fetch(baseUrl + apiUrl, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(data)
    })
        .then(res => successHandle(res))
        .catch(err => errorHandle(err))
};

export const postUploadImage = (apiUrl, formData)=> {
    return fetch(baseUrl + apiUrl, {
        method:'POST',
        headers: formHeaders(),
        body: formData
    })
        .then(res => successHandle(res))
        .catch(err => errorHandle(err))
};

function errorHandle(err) {
    console.log(err);
    if(err.status === 401 && window.location.href !== config.frontendBaseUrl + '/#/login' && window.location.href !== config.frontendBaseUrl + '/#/signup'){
      localStorage.removeItem('token');
      localStorage.removeItem('currentChannelOrContact');
      localStorage.removeItem('currentConversationBox');
      history.push('/login');
    }
}

function successHandle(res) {
    if(res.status === 401){
        if(window.location.href !== config.frontendBaseUrl + '/login' && window.location.href !== config.frontendBaseUrl + '/signup'){
          localStorage.removeItem('token');
          localStorage.removeItem('currentChannelOrContact');
          localStorage.removeItem('currentConversationBox');
          history.push('/login');
        }
    }else if(res.status === 404){
      history.push('/404');
    }
    else {
        return res.json();
    }
}

function headers() {
    let accessToken =  localStorage.getItem('token');
    let headers = {
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': accessToken
    };
    return headers;
}
function formHeaders() {
    let accessToken =  localStorage.getItem('token');
    let headers = {
        'Access-Control-Allow-Origin':'*',
        // 'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data',
        'x-access-token': accessToken
    };
    return headers;
}
