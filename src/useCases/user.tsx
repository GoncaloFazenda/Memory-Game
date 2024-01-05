import { clearLocalStorageWithExeption } from '@/utils/helpers';

export function login(username: string) {
    clearLocalStorageWithExeption();
    localStorage.setItem('username', username);
}

export function logout() {
    clearLocalStorageWithExeption();
}
