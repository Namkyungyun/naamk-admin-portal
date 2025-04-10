import { NextResponse } from "next/server";
import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler } from "@/app/api/withServerApiHandler";


export const GET = withServerTokenApiHandler(async (api, req) => {
    const request = await req.json();
    const userId = request;

    const res = await api.get(`${API_PREFIX.userReports}/users/${userId}`);
    const data = res.data;
  
    if (!data) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
  
    return NextResponse.json(data);
  });