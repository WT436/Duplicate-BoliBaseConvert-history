import { AuthenticationInput } from './dtos/authenticationInput';
import { AuthenticationResult } from './dtos/authenticationResult';
import { CheckTokenResult } from './dtos/checkTokenResult';
import http from '../../../services/httpService';

class LoginService {
    public async authenticate(input: AuthenticationInput): Promise<AuthenticationResult> {
        let rs = await http.post('/auth/checkLogin', input);
        if (rs) {
            return rs.data.result;
        }
        else {
            return rs;
        }
    }
  
    public async checkToken(token: string): Promise<CheckTokenResult> {
        let rs = await http.post('/auth/checkToken', {
            Token: token
        });
        if (rs) {
            return rs.data.result;
        }
        else {
            return rs;
        }
    }
}
  
export default new LoginService();