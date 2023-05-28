import axios from 'axios';
import qs from 'querystring'

const Mode = 'prod' // dev or stage or prod
let ip = '';

switch(Mode) {
    case 'stage':
        ip = '...StageUrl';
        break;
    case 'prod':
        ip = '...Release Url';
        break;
    default :
        ip = 'http://localhost:4000';
        break;
}

const axiosApi = axios.create({
    baseURL : ip,
})

export default axiosApi;
