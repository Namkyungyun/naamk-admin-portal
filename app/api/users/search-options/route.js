import { API_PREFIX } from "@/app/api/apiPrefix";
import { withServerTokenApiHandler, serverApiWrapper } from "@/app/api/withServerApiHandler";


export const GET = withServerTokenApiHandler(async (api) => {
    return serverApiWrapper(() => api.get(`${API_PREFIX.users}/search-options`))
  });