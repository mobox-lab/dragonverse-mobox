import { STORAGE_KEY } from '@/constants/storage';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage';

/**
 * 获取 accessToken
 */
export function getAccessToken() {
  return getLocalStorage<string>(STORAGE_KEY.ACCESS_TOKEN);
}

/**
 * 设置 accessToken 缓存, 最多10个账户
 * @param accessToken
 */
export function setAccessToken(accessToken: string) {
  setLocalStorage(STORAGE_KEY.ACCESS_TOKEN, accessToken);
}

/**
 * 移除 accessToken
 */
export function removeAccessToken() {
  removeLocalStorage(STORAGE_KEY.ACCESS_TOKEN);
}
