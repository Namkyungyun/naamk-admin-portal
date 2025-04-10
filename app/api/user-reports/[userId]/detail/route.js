import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";


export const GET = withServerTokenApiHandler(async (api, req, context) => {
  const { userId } = await context.params
  const url = `${API_PREFIX.userReports}/${userId}`;

  return serverApiWrapper(() => api.get(url))
  });