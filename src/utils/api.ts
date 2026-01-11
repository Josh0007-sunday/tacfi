const API_URL = import.meta.env.VITE_API_URL || '';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UserData {
  user: {
    id: string;
    name: string;
    email: string;
    plan: string;
    isVerified: boolean;
    createdAt: string;
  };
  token: string;
}

// Signup API call
export const signup = async (data: SignupData): Promise<ApiResponse<UserData>> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Signup failed');
    }

    // Save token to localStorage
    if (result.data?.token) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Login API call
export const login = async (data: LoginData): Promise<ApiResponse<UserData>> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Login failed');
    }

    // Save token to localStorage
    if (result.data?.token) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<ApiResponse<{ user: UserData['user'] }>> => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to get user data');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Admin login/signup
export const adminLogin = async (data: LoginData) => {
  try {
    const response = await fetch(`${API_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Admin login failed');

    if (result.data?.token) {
      localStorage.setItem('adminToken', result.data.token);
      localStorage.setItem('admin', JSON.stringify(result.data.admin));

    // also keep `isAdmin` flag for frontend routing checks
    localStorage.setItem('isAdmin', '1');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const adminSignup = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await fetch(`${API_URL}/api/admin/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Admin signup failed');

    return result;
  } catch (error) {
    throw error;
  }
};

// Admin: get pending deposits
export const getPendingDeposits = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/deposits/pending`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch pending deposits');
    return result;
  } catch (error) {
    throw error;
  }
};

export const verifyManualDepositApi = async (userId: string, depositId: string) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/deposits/${userId}/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ depositId }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to verify deposit');
    return result;
  } catch (error) {
    throw error;
  }
};

// Admin users
export const getAdminUsers = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch users');
    return result;
  } catch (error) {
    throw error;
  }
};

// Get a single user (used to fetch pending deposits for that user)
export const getAdminUser = async (userId: string) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch user');
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteAdminUser = async (userId: string) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete user');
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateAdminUser = async (userId: string, updates: any) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update user');
    return result;
  } catch (error) {
    throw error;
  }
};

// Admins
export const getAdminsApi = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/admins`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to fetch admins');
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteAdminApi = async (adminId: string) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) throw new Error('No admin token');

    const response = await fetch(`${API_URL}/api/admin/admins/${adminId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete admin');
    return result;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('adminToken');
  localStorage.removeItem('admin');
  localStorage.removeItem('isAdmin');
};
