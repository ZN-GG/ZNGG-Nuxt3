import http from '~/api/request';

export const tool = {
    getCategories(): Promise<ApiResponse> {
        return http.get("/portal/tool_category")
    },

    getList(page: number, size: number, params: any): Promise<ApiResponse> {
        return http.get("/portal/tool/" + page + "/" + size, params)
    },
}