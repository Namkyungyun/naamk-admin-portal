import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";

export const GET = withServerTokenApiHandler(async (api, req, context) => {
    const { userId } = await context.params
    const { searchParams } = new URL(req.url);
    const params = {
        page: searchParams.pageNo-1, 
        size: searchParams.pageSize
    }
    
    const url =`${API_PREFIX.users}/${userId}/penalty-hist`;
    return serverApiWrapper(() => api.get(url, {params}))
});