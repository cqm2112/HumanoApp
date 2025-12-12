const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

const config = {
    development: {
        API_URL: import.meta.env.VITE_API_URL || 'http://localhost:7293',
    },
    production: {
        API_URL: import.meta.env.VITE_API_URL || 'https://crisquiroz-001-site1.qtempurl.com',
    },
};

export const environment = {
    isDevelopment,
    isProduction,
    mode: import.meta.env.MODE,
    API_URL: isProduction ? config.production.API_URL : config.development.API_URL,
};


if (isDevelopment) {
    console.log('🚀 Environment:', environment.mode);
    console.log('🌐 API URL:', environment.API_URL);
}
