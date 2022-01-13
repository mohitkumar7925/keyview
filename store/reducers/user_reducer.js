import {
    INSERT_CURRENT_LOCATION,
    UPDATEFEED,
    UPDATE_BANKLIST,
    NOTICE_COUNT,
    UPDATEWALLETINFO,
    UPDATENOTICE,
    SETTOKEN,
    UPDATEIM,
    UPDATEMODE,
    UPDATEINR,
    UPDATEWALLET,
    VERFIFYUSER,
    ADD_USERMOBILE,
    Save_CODE,
    FINGERPRINTACCESS,
    SAVEUSERID,
    LOGOUT,
    LOAD_USER_STARTED,
    CONFIRM_LOCATION,
    CHANGE_USER_DETAIL,
    CHANGE_USER_ID,
    CHANGE_SMS_STATE,
} from "../types";
const initialState = {
    username: "",
    name: "",
    mobile: "",
    email: "",
    dob: "",
    city: "",
    state: "",
    country: "",
    gender: "",
    profile_pic: "",
    location: "",
    about_me: "",
    user_id: "",
    first_name: "",
    last_name: "",
    latitude: "",
    longitude: "",
    is_private: "",
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USERMOBILE:
            // console.log("mobile_update"+action.payload);
            return { ...state, MoneyfirstUserMobile: action.payload };
        case UPDATEIM:
            return {
                ...state,
                min_amount: action.payload.min_amount,
                max_amount: action.payload.max_amount,
                Payeeim: action.payload.Payeeim,
                kycim: action.payload.kycim,
                topupim: action.payload.topupim,
                sendim: action.payload.sendim,
                intrac_im: action.payload.intrac_im,
            };
        case VERFIFYUSER:
            return {
                ...state,
                VerifiedUser: action.payload.verified,
                isLoggedIn: action.payload.isLogin,
            };
        case Save_CODE:
            return { ...state, AccessCode: action.payload };
        case UPDATENOTICE:
            return { ...state, pushNotice: action.payload };
        case FINGERPRINTACCESS:
            return { ...state, FingerPrintAccess: action.payload };
        case SAVEUSERID:
            return { ...state, MoneyFirstUserID: action.payload };
        case SETTOKEN:
            return { ...state, pushToken: action.payload };
        case UPDATE_BANKLIST:
            return { ...state, banklist: action.payload };
        case UPDATEWALLET:
            return { ...state, walletAmount: action.payload };
        case INSERT_CURRENT_LOCATION:
            return { ...state, coords: action.payload };
        case CONFIRM_LOCATION:
            return {
                ...state,
                coords: action.payload.coords,
                address: action.payload.address,
                location_confirmed: true,
            };
        case UPDATEINR:
            return { ...state, currentINRVl: action.payload };
        case UPDATEFEED:
            return { ...state, feedback_form: action.payload };
        case UPDATEMODE:
            //   console.log(action.payload)
            return {
                ...state,
                graphColor: action.payload.graphColor,
                modalColor: action.payload.modalColor,
                darkmode: action.payload.darkmode,
                historybutton: action.payload.historybutton,
                textColor: action.payload.textColor,
                headerColor: action.payload.headerColor,
            };

        case UPDATEWALLETINFO:
            var payload = action.payload;

            return {
                ...state,
                walletCode: payload.walletCode,
                message_code: payload.message_code,
                company_name: payload.company_name,
                Company_email: payload.Company_email,
                security_question: payload.security_question,
            };
        case CHANGE_USER_ID:
            var payload = action.payload;

            return {
                ...state,
                user_id: payload.user_id,
            };
        case NOTICE_COUNT:
            var payload = action.payload;

            return {
                ...state,
                noticecount: action.payload,
            };
        case LOAD_USER_STARTED:
            return { ...state, processing: true };
        case LOGOUT:
            return {
                ...state,
                user_id: 0,
                address: "",
                username: "Customer",
                mobile: "",
                email: "",
                state: "",
                city: "",
                first_name: "",
                last_name: "",
            };
        case CHANGE_USER_DETAIL:
            var payload = action.payload;
            console.log(payload);
            return {
                ...state,
                username: payload.username,
                name: payload.name,
                mobile: payload.mobile,
                email: payload.email,
                dob: payload.dob,
                city: payload.city,
                state: payload.state,
                country: payload.country,
                gender: payload.gender,
                profile_pic: payload.profile_pic,
                location: payload.location,
                about_me: payload.about_me,
                user_id: payload.user_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
                latitude: payload.latitude,
                longitude: payload.longitude,
                is_private: payload.is_private,
            };
        case NOTICE_COUNT:
            var payload = action.payload;

            return {
                ...state,
                noticecount: action.payload,
            };
        case LOAD_USER_STARTED:
            return { ...state, processing: true };
        case LOGOUT:
            return {
                ...state,
                user_id: 0,
                address: "",
                username: "Customer",
                mobile: "",
                email: "",
                state: "",
                city: "",
                first_name: "",
                last_name: "",
            };

        // case CHANGE_USER_DETAIL_VALUE:

        //     var payload=action.payload;

        //                 return (
        //                     {
        //                         ...state,
        //                         username: payload.username,
        //                         name: payload.name,
        //                         mobile:payload.mobile,
        //                         email:payload.email,
        //                         dob:payload.dob,
        //                         city:payload.city,
        //                         state:payload.state,
        //                         country:payload.country,
        //                         gender:payload.gender,
        //                         profile_pic:payload.profile_pic,
        //                         location:payload.location,
        //                         about_me:payload.about_me,
        //                         user_id:payload.user_id,
        //                     }
        //                 )
        //                 case NOTICE_COUNT:
        //                  var payload=action.payload;

        //                 return {
        //                     ...state,
        //                     noticecount: action.payload,

        //                 }
        //                 case LOAD_USER_STARTED:
        //                     return {...state, processing: true};
        //                     case LOGOUT:
        //                         return {...state, user_id: 0,address:'',username:'Customer',mobile:'',email:'',state:'',city:''};
        case CHANGE_SMS_STATE:
            var payload = action.payload;
            return {
                ...state,
                username: payload.username,
                name: payload.name,
                mobile: payload.mobile,
                email: payload.email,
                dob: payload.dob,
                city: payload.city,
                state: payload.state,
                country: payload.country,
                gender: payload.gender,
                profile_pic: payload.profile_pic,
                location: payload.location,
                about_me: payload.about_me,
                user_id: payload.user_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
            };
        default:
            return state;
    }
};

export default userReducer;
