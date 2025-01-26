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

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
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
    // TODO: return the token
      const loggedUser = localStorage.getItem('id_token') || '';
      return loggedUser;
    }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
