import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    
    if (!token) {
      return null;
    }
    
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token?: string): boolean {
    const currentToken = token || this.getToken();

    if (!currentToken) {
      return true; // No token means it's considered expired
    }

    try {
      const decoded = jwtDecode<JwtPayload>(currentToken);
      
      // Check if exp exists and compare against current time
      if (decoded.exp) {
        return decoded.exp < Math.floor(Date.now() / 1000);
      }
      
      return false; // If no expiration, assume token is valid
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true; // Consider token expired if decoding fails
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout(): void {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();