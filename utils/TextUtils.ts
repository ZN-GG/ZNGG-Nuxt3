
export const TextUtils = {
    checkEmail(email: string): boolean {
        let reg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (email === "") {
            console.log("email ==> empty")
            return false;
        } else if (!reg.test(email)) {
            console.log("email ==> error")
            return false;
        }
        return true;
    },

    isNullOrEmpty(t: string): boolean {
        if (t && t.length > 0) {
            return false;
        }
        return true;
    }


}