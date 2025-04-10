import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";


export const GET = withServerTokenApiHandler(async (api, req, context) => {
  const { postId } = await context.params
  const url = `${API_PREFIX.posts}/${postId}`;

  return serverApiWrapper(() => api.get(url))
  });