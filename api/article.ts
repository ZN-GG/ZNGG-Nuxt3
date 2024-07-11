import http from '~/api/request';

export const article = {

    getDetail(id: string): Promise<ApiResponse> {
        return http.get("/portal/article/" + id)
    },

    getUserInteract(id: String): Promise<ApiResponse> {
        return http.get("/portal/article/user_interact/" + id)
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
    getAddLike(id: String): Promise<ApiResponse> {
        return http.get("/user/article/addLike/" + id)
    },
    getDeleteLike(id: String): Promise<ApiResponse> {
        return http.get("/user/article/deleteLike/" + id)
    },

    getAddCollect(id: String): Promise<ApiResponse> {
        return http.get("/user/article/addCollect/" + id)
    },
    getDeleteCollect(id: String): Promise<ApiResponse> {
        return http.get("/user/article/deleteCollect/" + id)
    },

}