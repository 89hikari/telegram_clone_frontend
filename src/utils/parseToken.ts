export interface IUserData {
    createdAt: string,
    email: string,
    exp: number,
    gender: "male" | "female",
    iat: string,
    id: number,
    is_validated: boolean
    name: string
    updatedAt: string
}

export const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    return JSON.parse(jsonPayload) as IUserData;
}

export const checkTokenExpired = (expNumber: number) => (Math.floor((new Date()).getTime() / 1000)) >= expNumber;