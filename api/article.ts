import http from '~/api/request';

export const article = {

    getDetail(id: string): Promise<ApiResponse> {
        return http.get("/portal/article/" + id)
    },

    getList(page: number, size: number, category: string): Promise<ApiResponse> {
        let c = category ? category + "/" : "";
        return http.get("/portal/article/" + c + page + "/" + size)
    },

    getCategories(): Promise<ApiResponse> {
        return http.get("/portal/article_category")
    },

    postArticle(params: any): Promise<ApiResponse> {
        return http.post("/user/article", params)
    },

    updateArticle(params: any): Promise<ApiResponse> {
        return http.put("/user/article", params)
    },

    getUserList(page: number, size: number, category: string): Promise<ApiResponse> {
        let c = category ? category + "/" : "";
        return http.get("/user/article/list/" + c + page + "/" + size)
    },

}