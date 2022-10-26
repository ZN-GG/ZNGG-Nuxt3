import http from '~/api/request';

export const tool = {
    getCategories(): Promise<ApiResponse> {
        return http.get("/portal/tool_category")
    },

    getList(page: number, size: number, category: string): Promise<ApiResponse> {
        let c = category ? category + "/" : "";
        return http.get("/portal/tool/" + c + page + "/" + size)
    },
}