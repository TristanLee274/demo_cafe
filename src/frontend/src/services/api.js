const API_BASE_URL = '/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const request = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        // Token might be expired or invalid
        localStorage.removeItem('token');
        // We let the caller handle the error or redirect
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.msg || 'API Request Failed');
    }

    return response.json();
};

export const api = {
    // Auth
    async login(credentials) {
        return request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    async register(userData) {
        return request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    async getCurrentUser() {
        return request('/auth/me');
    },

    // Products
    async getProducts(categoryId = null, search = null) {
        const params = new URLSearchParams();
        if (categoryId) params.append('category_id', categoryId);
        if (search) params.append('search', search);

        return request(`/products?${params}`);
    },

    async getProduct(id) {
        return request(`/products/${id}`);
    },

    async getFeaturedProducts(limit = 6) {
        return request(`/products/featured/list?limit=${limit}`);
    },

    // Categories
    async getCategories() {
        return request('/categories');
    },

    // Orders
    async createOrder(orderData) {
        return request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData),
        });
    },

    async getOrder(id) {
        return request(`/orders/${id}`);
    },

    async getMyOrders() {
        return request('/orders/mine');
    },
};

export default api;
