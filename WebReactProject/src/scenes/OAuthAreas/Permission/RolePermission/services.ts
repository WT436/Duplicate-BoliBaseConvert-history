import http from '../../../../services/httpService';

class AtomicResourceService {
    // public async checkToken(token: string): Promise<CheckTokenResult> {
    //     let rs = await http.post('/auth/checkToken', {
    //         Token: token
    //     });
    //     if (rs) {
    //         return rs.data.result;
    //     }
    //     else {
    //         return rs;
    //     }
    // }
}
  
export default new AtomicResourceService();