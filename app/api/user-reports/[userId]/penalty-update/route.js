import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";


export const POST = withServerTokenApiHandler(async (api, req, context) => {
  const { userId } = await context.params
  const request = await req.json();


  const url = `${API_PREFIX.userReports}/penalty/${userId}`;
    return serverApiWrapper(() => api.post(url, request))
  });