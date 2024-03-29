import http from '~/api/request';

export const fun = {

    stringToTimestamp(str: string): Promise<ApiResponse> {
        return http.get("/api/common/stringToTimestamp/v1", {
            str: str
        })
    },

    getWhois(domain: string): Promise<ApiResponse> {
        return http.get("/api/common/whois/" + domain)
    },

    wordConvert(domain: string): Promise<ApiResponse> {
        return http.post("/api/common//office/wordConvert")
    }

}