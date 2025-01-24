import { THTTPMethod } from '@/types/types';

type TAPIOptions<TReq> = {
	method?: THTTPMethod;
	headers?: HeadersInit;
	params?: TReq;
	options?: Omit<RequestInit, 'method' | 'headers' | 'body'>;
};

export async function api<TRes, TReq>(
	url: string,
	{ method = 'GET', headers, params, options }: TAPIOptions<TReq>,
): Promise<TRes | null> {
	try {
		let body;

		if (method === 'GET' && params) {
			url += '?' + new URLSearchParams(params);
		} else if (params) {
			body = params instanceof FormData ? params : JSON.stringify(params);
		}

		const response = await fetch(url, {
			method,
			body,
			headers,
			...options,
		});
		return await response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}
