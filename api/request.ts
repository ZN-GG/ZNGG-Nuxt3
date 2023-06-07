const baseUrl = "https://api.zngg.net"
const version = "19"

const errorResponse: ApiResponse = {
    success: false,
    code: 0,
    message: "",
    data: null
}


const get = async (url: string, params = {}): Promise<ApiResponse> => {
    try {
        const token = useCookie("token")
        const res = await $fetch<ApiResponse>(baseUrl + url, {
            headers: {
                "Authorization": token.value,
                "version": version
            },
            method: 'GET',
            params: params
        });
        return res;
    } catch (error) {
        errorResponse.message = error
        return errorResponse;
    }
}

const post = async (url: string, params = {}): Promise<ApiResponse> => {
    try {
        const token = useCookie("token")
        const res = await $fetch<ApiResponse>(baseUrl + url, {
            headers: {
                // "Accept": "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                "Authorization": token.value
            },
            method: 'POST',
            body: params
        });
        return res;
    } catch (error) {
        errorResponse.message = "" + error
        return errorResponse;
    }
}

const put = async (url: string, params = {}): Promise<ApiResponse> => {
    try {
        const token = useCookie("token")
        const res = await $fetch<ApiResponse>(baseUrl + url, {
            headers: {
                // "Accept": "application/json, text/plain, */*",
                // "Content-Type": "application/json",
                "Authorization": token.value
            },
            method: 'PUT',
            body: params
        });
        return res;
    } catch (error) {
        errorResponse.message = error
        return errorResponse;
    }
}

export default { get, post, put, baseUrl }