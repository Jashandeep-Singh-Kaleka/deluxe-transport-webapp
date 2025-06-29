export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager' | 'driver' | 'dispatcher';
  name: string;
}

export const demoUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@deluxetransport.com',
    role: 'admin',
    name: 'Happy Saini'
  },
  {
    id: '2',
    username: 'manager',
    email: 'manager@deluxetransport.com',
    role: 'manager',
    name: 'Sarah Johnson'
  },
  {
    id: '3',
    username: 'dispatcher',
    email: 'dispatcher@deluxetransport.com',
    role: 'dispatcher',
    name: 'Mike Rodriguez'
  },
  {
    id: '4',
    username: 'driver',
    email: 'driver@deluxetransport.com',
    role: 'driver',
    name: 'Tom Wilson'
  }
];

export const authenticate = (username: string, password: string): User | null => {
  if (password === 'demo123') {
    return demoUsers.find(user => user.username === username) || null;
  }
  return null;
};

export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  return null;
};

export const setCurrentUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};