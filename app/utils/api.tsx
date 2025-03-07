export const getApiURL = () => {
    if (process.env.NEXT_PUBLIC_ENV) {
        return `https://${process.env.NEXT_PUBLIC_API_URL}/api`;
    }

    return `http://localhost:3000/api`;
}