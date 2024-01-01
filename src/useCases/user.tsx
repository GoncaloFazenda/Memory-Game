export function login(username: string) {
    localStorage.setItem('username', username);
}

export function logout() {
    localStorage.removeItem('username');
}
