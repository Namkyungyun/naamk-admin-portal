import { NextResponse } from "next/server";
import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler } from "@/app/api/withServerApiHandler";


export const POST = withServerTokenApiHandler(async (api, req) => {
    const request = await req.json();
    const params = {
        page: request.pageNo-1, 
        size: request.pageSize
    }

    const res = await api.post(`${API_PREFIX.userReports}/list`, request, {params});
    const data = res.data;
  
    if (!data) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  
    return NextResponse.json(data);
  });