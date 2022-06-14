import http from '~/api/request';

export const tool = {

    stringToTimestamp(str: string): Promise<ApiResponse> {
        return http.get("/api/common/stringToTimestamp/v1", {
            str: str
        })
    },

}