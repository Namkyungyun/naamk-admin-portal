'use server'

import globalAxios from '@/app/api/api';
import { getAccessToken } from './token';

const prefixUrl = "/user-reports"

export async function getUserReportSearchOptions() {
    const token = await getAccessToken();
    const api = globalAxios(token);

    try {
        const url = `${prefixUrl}/search-options`;
        const result = await api.get(url);
        const entity = result.data.body.entity;
    
        if (!entity) {
            return null;
        }
    
        return entity;
    } catch(e) {
        return null;
    }
}

export async function getUserReportList(data) {
    const token = await getAccessToken();
    const api = globalAxios(token);

    try {
        const url = `${prefixUrl}/list`;
        const result = await api.post(url, data, {
            params: {
                page: data.pageNo-1, 
                size: data.pageSize
            }
        })
        const entity = result.data.body.entity;
    
        if (!entity) {
            return null;
        }
    
        return entity;
    } catch(e) {
        return null;
    }
}
