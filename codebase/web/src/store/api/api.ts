import { API_PATH } from "../../constants";
import { isNNObject, json2Str, isNN } from "../../util/index";

export default class Api {
    private url: string = API_PATH;

    /**
    * HTTP GET operation
    * @ param url
    * @ param callback
    */
    public get = (url: string, callback: Function) => {
        this.fetch(url, 'GET', callback);
    };

    /**
    * HTTP POST operation
    * @ param url
    * @ param callback
    */
    public post = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'POST', callback, data);
    };

    /**
    * HTTP DELETE operation
    * @ param url
    * @ param callback
    */
    public delete = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'DELETE', callback, data);
    };

    /**
    * HTTP PATCH operation
    * @ param url
    * @ param callback
    * @ param data
    */
    public patch = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'PATCH', callback, data);
    };

    /**
    * HTTP PUT operation
    * @ param url
    * @ param callback
    * @ param data
    */
    public put = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'PUT', callback, data);
    };

    private getAS = async (key: string) => {
        try {
            return await sessionStorage.getItem(key);
        } catch (error) {
            return '';
        }
    };
    
    private fetch = async(url: string, method: string, callback: Function, data?: any) => {
        let token = await this.getAS('auth_token');
        let userId = await this.getAS('user_id');
        fetch(this.url + url, 
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': (isNN(token) ? 'Bearer ' + token : ''),
                    'user-id': (isNN(userId) ? '' + userId : '')
                },
                body: isNNObject(data) ? json2Str(data) : null,
            }).then(response => {
                return response.json(); 
            }).then((response: any) => {
                if(isNNObject(response)){
                    if(isNNObject(response.data)){
                        this.callback(callback, response, 'Some problem occurs. Please contact administrator.');
                    }else{
                        this.callback(callback, null, response.message);
                    }
                }else{
                    this.callback(callback, null, 'Some problem occurs. Please contact administrator.');
                }
            }).catch((error: any) => {
                console.log('err', error);
                this.callback(callback, null, error.toString());
            });
    };

    private callback = (callback: Function, data: any, message: any) => {
        // console.log('message: '+ message);
        if(isNNObject(callback) && typeof callback == "function"){
            callback(data, message);
        }
    };
};