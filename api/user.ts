import http from '~/api/request';



export const user = {
    login(params: any, captcha: string, captcha_key: string): Promise<ApiResponse> {
        return http.post("/user/user/" + captcha + '/' + captcha_key, params)
    },
    getInfo(): Promise<ApiResponse> {
        return http.get("/user/user/info")
    },

    register(params: any, email_code: string, captcha_code: string, captcha_key): Promise<ApiResponse> {
        return http.post("/user/user?email_code=" + email_code + "&captcha_code=" + captcha_code + "&captcha_uuid=" + captcha_key, params)
    },
    sendEmailCaptcha(email: string): Promise<ApiResponse> {
        return http.get("/user/user/email_verify_code?type=register&email=" + email)
    }
}