import { WhoisSearchResult } from "whoiser";

const whoiser = import("whoiser")

export default defineEventHandler(async (event) => {

    const query = getQuery(event);
    try {
        let domainWhois: Promise<WhoisSearchResult>;
        if (query.domain != undefined && query.domain.toString().indexOf(".") > 0) {
            domainWhois = (await whoiser).domain(query.domain!.toString());
        } else if (query.domain != undefined && query.domain.toString().indexOf(".") <= 0) {
            domainWhois = (await whoiser).tld(query.domain!.toString());
        } else if (query.tld != undefined) {
            domainWhois = (await whoiser).tld(query.tld!.toString());
        } else {
           throw new Error("参数异常");
        }
        const result = {
            success: true,
            code: 200,
            message: "获取成功",
            data: await domainWhois!!
        }
        return result;
    } catch (e: any) {
        const result = {
            success: false,
            code: 201,
            message: "获取失败",
            data: e.message
        }
        return result;
    }


})