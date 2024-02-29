//import { config as apiConfig } from '../store/api/config';

export function parseJSON(response: any) {
     return response.json()
};

export function isNN(_input: any) { 
  return (isNNObject(_input) && _input.length > 0) 
};

export function isNNObject(_input: any) { 
  return (_input != null && _input != undefined) 
};

export function str2Json(_input: string) { 
  try {
    return JSON.parse(isNN(_input) ? _input : "{}"); 
  } catch (ex) { 
    jsError(ex, "String2JSON"); 
    return {}; 
  } 
};

export function json2Str(_input: any) { 
  try {
    return (isNNObject(_input) ? JSON.stringify(_input) : "");
  } catch (ex) { 
    jsError(ex, "JSON2String"); 
    return ""; 
  }
};

export function getBaseURL(_isApi: boolean) { 
  try {
    let baseURL: string = "";
    let arrURL = window.location.href.split("/");
    if(isNNObject(arrURL) && arrURL.length > 2){
      if(_isApi){
        //baseURL = arrURL[0] + "//" + arrURL[2] + apiConfig.baseURL;
        baseURL = arrURL[0] + "//" + arrURL[2];
      }else{
        baseURL = arrURL[0] + "//" + arrURL[2] + "/";
      }
    }else{
      baseURL = window.location.href;
    }
    return baseURL;
  } catch (ex) { 
    jsError(ex, "getBaseURL"); 
    return ""; 
  }
};

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function jsError(_ex: any, _funName: string) {
   //alert("Javascript Error\n------------------\nName: " + _ex.name + "\nMessage: " + _ex.message + "\nFunction: " + _funName + "\nFile: " + _ex.fileName + "\nLine Number: " + _ex.lineNumber + "\nColumn Number: " + _ex.columnNumber); 
   console.log("Error:" + _funName + ":" + _ex);
};