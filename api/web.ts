import http from "~/api/request";

export const web = {
    getFriendLinks(): Promise<ApiResponse> {
        return http.get("/portal/web/friendlyLinks")
    },

}