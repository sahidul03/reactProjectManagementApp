import {getRequest, postRequest} from './common/commonApiGetway';

export  const getCurrentUser = () => {
    return getRequest('/current_user');
};

export  const getAllUsers = () => {
    return getRequest('/users');
};

export  const getUser = (id) => {
    return getRequest('/users/' + id);
};

export  const sendFriendRequest = (data) => {
    return postRequest('/send-friend-request', data);
};
