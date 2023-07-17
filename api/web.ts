import http from "~/api/request";

export const web = {
    getFriendLinks(): Promise<ApiResponse> {
        return http.get("/portal/web/friendlyLinks")
    },
    getNavInfo():Promise<ApiResponse>{
        return http.get("/portal/web/nav")
    }

}