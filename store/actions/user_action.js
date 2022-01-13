import {ADD_USERMOBILE,UPDATE_BANKLIST,NOTICE_COUNT,UPDATEWALLETINFO,UPDATENOTICE,SETTOKEN,UPDATEIM,UPDATEMODE,UPDATEINR,FINGERPRINTACCESS,UPDATEWALLET,VERFIFYUSER,Save_CODE,SAVEUSERID,INSERT_CURRENT_LOCATION,LOGOUT, CONFIRM_LOCATION,LOAD_USER_STARTED, CHANGE_USER_DETAIL,CHANGE_USER_DETAIL_VALUE , CHANGE_USER_ID,GET_USER, CHANGE_SMS_STATE, UPDATEFEED} from "../types";



export const updatewalletinfo = payload =>{
    return {
        type :UPDATEWALLETINFO,
        payload:payload
    }
}
export const updateFeed = payload => {

    return {
        type:UPDATEFEED,
        payload:payload
    }
}
export const insert_location = payload =>{
    return {
        type:INSERT_CURRENT_LOCATION,
        payload:payload
    }
}
export const notice_count = payload =>{
    return {
        type:NOTICE_COUNT,
        payload:payload
    }
}
export const updatebanklist = payload => {
    return {
        type:UPDATE_BANKLIST,
        payload:payload
    }
}
export const add_usermobile = payload =>{

    
    return {
        type:ADD_USERMOBILE,
        payload:payload
    }
}
export const settoken = payload =>{
    return {
        type:SETTOKEN,
        payload:payload
    }
}
export const updateim = payload =>{
    return {
        type:UPDATEIM,
         payload:payload
    }
}
export const updateNotice = payload =>{
     return {
        type:UPDATENOTICE,
         payload:payload
    }
}
export const updatemode = payload =>{
    return {
        type:UPDATEMODE,
        payload:payload
    }
}
export const verifyuser = payload => {
   
    return {
        type:VERFIFYUSER,
        payload:payload
    }
}

export const saveCode = payload =>{
    return {
        type:Save_CODE,
        payload:payload
    }
}
export const fingerprint = payload =>{
  
     return {
        type:FINGERPRINTACCESS,
        payload:payload
    }
}
export const saveUserId = payload =>{
 
 return {
        type:SAVEUSERID,
        payload:payload
    }
}

export const updatewallet = payload =>{
    return{
        type:UPDATEWALLET,
         payload:payload
    }
}

export const UpdateInr = payload =>{
     return{
        type:UPDATEINR,
         payload:payload
    }
}
export const load_user_started = payload =>{
    return {
        type:LOAD_USER_STARTED,
        payload:payload
    }
}
export const confirm_location = payload =>{
    return {
        type:CONFIRM_LOCATION,
        payload:payload
    }
}
export const logout = payload =>{
    return {
        type:LOGOUT,
        payload:payload
    }
}
export const change_user_detail = payload =>{
    return {
        type:CHANGE_USER_DETAIL,
        payload:payload
    }
}
// export const change_user_detail_value = payload =>{
//     return {
//         type:CHANGE_USER_DETAIL_VALUE,
//         payload:payload
//     }
// }
export const change_user_id = payload =>{
    return {
        type:CHANGE_USER_ID,
        payload:payload
    }
}

export const change_sms_state = payload =>{
    return {
        type:CHANGE_SMS_STATE,
        payload: payload
    }
}
