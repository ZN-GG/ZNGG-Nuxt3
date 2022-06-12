import http from '~/api/request';

export const article = {

    getDetail(id: string): Promise<ApiResponse> {
        return http.get("/portal/article/" + id)
    },

    getList(page: number, size: number, params: any): Promise<ApiResponse> {
        return http.get("/portal/article/" + page + "/" + size, params)
    },

    getCategories(): Promise<ApiResponse> {
        return http.get("/portal/article_category")
    },

    postArticle(params: any): Promise<ApiResponse> {
        return http.post("/user/article", params)
    },

}