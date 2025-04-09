'use server';

import { logout, getMe, getMenuTree } from '@/app/lib/me';
import { redirect } from "next/navigation";

export async function tryLogout() {
 await logout();
 redirect("/login");
}

export async function getLoginUserInfo() {
    try {
        const result = await getMe();
        return result;
    } catch(e) {
         // 401로 이어짐 ?
        throw e;

    }
}

export async function getLoginUserMenutree() {
    try {
        const result = await getMenuTree();
        return result;
    } catch(e) {
        // 401로 이어짐
        throw e;
    }
}