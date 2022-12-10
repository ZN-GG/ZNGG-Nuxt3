export const isEmpty = (data: any) => {
    return data === "" || data === null || data === undefined || (typeof data === "number" && isNaN(data));
  };
  
  export const isRealEmpty = (data: any) => {
    return isEmpty(data) || (Array.isArray(data) && !data.length) || (typeof data === "object" && !Object.keys(data).length);
  };
  
  // 是不是链接
  export const isUrl = (url: string) => {
    return /^https?:\/\/.+/.test(url);
  };
  
  // 是不是email
  export const isEmail = (data: string) => {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(data);
  };
  
  // 是不是身份证号
  export const isIdcard = (data: string) => {
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(data);
  };
  
  // 车牌号的正则
  export const isCarNumber = (data: string) => {
    if (typeof data !== "string") {
      return false;
    }
    const regExp =
      /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}(([0-9]{5}[DFdf])|([DFdf]([A-HJ-NP-Za-hj-np-z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Za-z]{1}[A-Za-z]{1}[A-HJ-NP-Za-hj-np-z0-9]{4}[A-HJ-NP-Za-hj-np-z0-9挂学警港澳]{1})$/;
    return regExp.test(data);
  };
  
  // 手机号码的正则
  export const isPhoneNumber = (data: string) => {
    const regExp = /^[1]([3-9])[0-9]{9}$/;
    return regExp.test(data);
  };
  
  // 是不是数字
  export const isNumberLike = (data: string) => {
    return /^[\d]+$/g.test(data) && Number(data) < Number.MAX_SAFE_INTEGER;
  };
  
  // json字符串
  export const isJsonString = (data: string | any) => {
    if (typeof data !== "string") {
      return false;
    }
    try {
      if (typeof JSON.parse(data) === "object") {
        return true;
      }
    } catch (e) {}
    return false;
  };
  
  // 判断是不是IE浏览器
  //export const isIE = (() => "ActiveXObject" in window)();
  // 判断是不是IOS
  //export const isIos = (() => /(iPhone|iPad|iPod|iOS|Safari)/i.test(navigator.userAgent))();
  // 判断是不是Android
//   /export const isAndroid = (() => /(Android)/i.test(navigator.userAgent))();
  