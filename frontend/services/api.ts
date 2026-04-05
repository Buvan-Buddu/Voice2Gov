import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

/**
 * Backend API Configuration
 * We try to automatically detect the IP of the bundler to connect from mobile devices.
 */
let machineIP = 'localhost'; // Safe default for web

try {
  // Constants.expoConfig?.hostUri or debuggerHost
  // In Expo 50+ it's often in extra?.expoClient?.hostUri or similar
  const debuggerHost = Constants.expoConfig?.hostUri || '';
  const detectedIP = debuggerHost.split(':')[0];
  
  if (detectedIP && !['localhost', '127.0.0.1'].includes(detectedIP)) {
    machineIP = detectedIP;
    console.log('[Networking] 🚀 Auto-detected Bundler IP:', machineIP);
  } else {
    // If we're on a real device/emulator but couldn't detect, 
    // the user might need to specify their machine IP manually 
    // if localhost doesn't work (Android emulator uses 10.0.2.2 usually)
    console.log('[Networking] ⚠️ No specific IP detected, using:', machineIP);
  }
} catch (e) {
  console.warn('[Networking] Failed to probe network context:', e);
}

const API_BASE_URL = `http://${machineIP}:8000`; 
const API_VERSION = '/api/v1';


export const API_URL = `${API_BASE_URL}${API_VERSION}`;

/**
 * A resilient storage wrapper to prevent crashes if AsyncStorage is problematic
 */
const storage = {
  async getItem(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.warn(`[Storage] Failed to getItem for ${key}`, e);
      return null;
    }
  },
  async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[Storage] Failed to setItem for ${key}`, e);
    }
  },
  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Storage] Failed to removeItem for ${key}`, e);
    }
  }
};

/**
 * Auth Token Storage Keys
 */
const TOKEN_KEY = 'v2g_auth_token';
const USER_KEY = 'v2g_user_data';

/**
 * API Fetch Wrapper with Timeout
 */
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const token = await storage.getItem(TOKEN_KEY);
  const fullUrl = `${API_URL}${endpoint}`;
  
  console.log(`[API] Requesting: ${options.method || 'GET'} ${fullUrl}`);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  // 10 second timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.detail || 'Something went wrong');
    }

    return data;
  } catch (err: any) {
    clearTimeout(timeoutId);
    let errorMessage = err.message;
    if (err.name === 'AbortError') {
      errorMessage = 'Connection timed out. Is your backend running and accessible?';
    }
    console.error(`[API] Error on ${endpoint}:`, errorMessage);
    throw new Error(errorMessage);
  }
}


/**
 * Auth Service
 */
export const authService = {
  async login(credentials: any) {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.access_token) {
      await storage.setItem(TOKEN_KEY, response.data.access_token);
      await storage.setItem(USER_KEY, JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  async register(userData: any) {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.data?.access_token) {
      await storage.setItem(TOKEN_KEY, response.data.access_token);
      await storage.setItem(USER_KEY, JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  async logout() {
    await storage.removeItem(TOKEN_KEY);
    await storage.removeItem(USER_KEY);
  },

  async getCurrentUser() {
    const userStr = await storage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  async getProfile() {
    const response = await apiRequest('/auth/me');
    return response.data;
  }
};

/**
 * Complaint Service
 */
export const complaintService = {
  async getComplaints(params: any = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/complaints?${query}`;
    const response = await apiRequest(endpoint);
    return response.data?.complaints || response.data;
  },

  async getUserComplaints() {
    const response = await apiRequest('/complaints/user');
    return response.data?.complaints || [];
  },

  async createComplaint(complaintData: any) {
    // Using the /json endpoint which matches the JSON.stringify approach
    const response = await apiRequest('/complaints/json', {
      method: 'POST',
      body: JSON.stringify(complaintData),
    });
    return response.data;
  },


  async getComplaint(id: string) {
    const response = await apiRequest(`/complaints/${id}`);
    return response.data;
  },

  async updateStatus(id: string, statusData: { status: string, admin_notes?: string }) {
    const response = await apiRequest(`/complaints/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(statusData),
    });
    return response.data;
  },

  async getAuthorityComplaints(department: string) {
    const response = await apiRequest(`/complaints/authority/complaints?department=${encodeURIComponent(department)}`);
    return response.data?.complaints || [];
  }
};


/**
 * Notification Service
 */
export const notificationService = {
  async getNotifications() {
    const response = await apiRequest('/notifications');
    return response.data?.notifications || [];
  },

  async markRead(id: string) {
    const response = await apiRequest(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
    return response.data;
  },

  async markAllRead() {
    const response = await apiRequest('/notifications/read-all', {
      method: 'PATCH',
    });
    return response.data;
  }
};

