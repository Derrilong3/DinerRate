import axios, { AxiosRequestConfig } from 'axios';

const axiosBaseQuery =
    ({ baseUrl }: { baseUrl: string }) =>
    async ({ url, method, data, params }: AxiosRequestConfig) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return { data: result.data };
        } catch (axiosError: any) {
            const err = axiosError.response || axiosError;
            return {
                error: {
                    status: err.status || 500,
                    data: err.data || err.message,
                },
            };
        }
    };

export default axiosBaseQuery;
