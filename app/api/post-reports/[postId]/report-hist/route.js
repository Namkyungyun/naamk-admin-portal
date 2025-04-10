import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";


export const GET = withServerTokenApiHandler(async (api, req, context) => {
    const { postId } = await context.params
    
    const uri = await req.url;
    const { searchParams } =  new URL(uri);
    const page = searchParams.get("pageNo") ?? 0;
    const size = searchParams.get("pageSize") ?? 10;

    const params = {
      page: page-1, 
      size: size
    }
    
    const url =`${API_PREFIX.postReports}/${postId}/report-hist`;
    return serverApiWrapper(() => api.get(url, {params}))
});