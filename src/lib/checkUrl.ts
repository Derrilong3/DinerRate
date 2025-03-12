const localAdress = process.env.EXPO_PUBLIC_API_URL?.replace('http://', '')
    .replace('https://', '')
    .split(':')[0];

function checkUrl(url: string) {
    if (url.includes('localhost')) {
        return url.replace('localhost', localAdress ?? '');
    }

    return url;
}

export default checkUrl;
