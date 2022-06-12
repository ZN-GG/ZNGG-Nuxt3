import http from '~/api/request';

export const upload = {
    uploadImage(params: any): Promise<ApiResponse> {
        return http.post("/user/image", params)
    },
    uploadImageCover(params: any): Promise<ApiResponse> {
        return http.post("/user/image/cover", params)
    }
}