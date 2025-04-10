import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";

export const GET = withServerTokenApiHandler(async (api, req, context) => {
    const { userId } = await context.params

    const uri = await req.url;
    const { searchParams } =  new URL(uri);
    const page = searchParams.get("pageNo") ?? 0;
    const size = searchParams.get("pageSize") ?? 10;

    const params = {
      page: page-1, 
      size: size
    }

    const url =`${API_PREFIX.users}/${userId}/penalty-hist`;
    return serverApiWrapper(() => api.get(url, {params}))
});