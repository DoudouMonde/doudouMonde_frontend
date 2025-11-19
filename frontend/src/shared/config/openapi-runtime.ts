import { CreateClientConfig } from '@/generated/openapi-client/client.gen';


const API_URL = "http://localhost:8000/api";

export const createClientConfig:CreateClientConfig = (config) =>( {
    ...config,
    baseURL: API_URL,
    
})