import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";


export const POST = withServerTokenApiHandler(async (api, req) => {
    const request = await req.json();
    const params = {
        page: request.pageNo-1, 
        size: request.pageSize
    }

    const url =`${API_PREFIX.postReports}/list`;
    return serverApiWrapper(() => api.post(url, request, {params}))
  });