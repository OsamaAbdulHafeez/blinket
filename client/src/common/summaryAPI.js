export const baseURL = 'http://localhost:4000/api'

const summary = {
    register:{
        url:'user/register',
        method:'post'
    },
    login:{
        url:'user/login',
        method:'post'
    },
    forgotPassword:{
        url:'user/forgot-password',
        method:'put'
    },
    forgot_password_otp_verification:{
        url:'user/forgot-password-otp-verify',
        method:'post'
    },
    reset_password:{
        url:'user/reset-password',
        method:'put'
    },
    refresh_token:{
        url:'user/refresh-token',
        method:'post'
    },
    user_details:{
        url:'user/user-details',
        method:'get'
    },
    logout_user:{
        url:'user/logout',
        method:'get'
    },
    upload_avatar:{
        url:'user/upload-avatar',
        method:'put'
    },
}
export default summary