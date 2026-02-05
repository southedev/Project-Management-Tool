// Debug utility for API calls
export const debugApiCall = (config) => {
  if (import.meta.env.DEV) {
    console.group('🔍 API Request Debug');
    console.log('Method:', config.method?.toUpperCase());
    console.log('URL:', config.baseURL + config.url);
    console.log('Headers:', config.headers);
    if (config.data) {
      console.log('Data:', config.data);
    }
    console.groupEnd();
  }
};

export const debugApiResponse = (response) => {
  if (import.meta.env.DEV) {
    console.group('✅ API Response Debug');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    console.log('Headers:', response.headers);
    console.log('Data:', response.data);
    console.groupEnd();
  }
};

export const debugApiError = (error) => {
  if (import.meta.env.DEV) {
    console.group('❌ API Error Debug');
    console.log('Message:', error.message);
    if (error.response) {
      console.log('Response Status:', error.response.status);
      console.log('Response Data:', error.response.data);
      console.log('Response Headers:', error.response.headers);
    }
    if (error.request) {
      console.log('Request:', error.request);
    }
    console.log('Config:', error.config);
    console.groupEnd();
  }
};