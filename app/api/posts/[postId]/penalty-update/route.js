import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";


export const POST = withServerTokenApiHandler(async (api, req, context) => {
  const { postId } = await context.params
  const request = await req.json();


  const url = `${API_PREFIX.posts}/${postId}/penalty`;
    return serverApiWrapper(() => api.post(url, request))
  });