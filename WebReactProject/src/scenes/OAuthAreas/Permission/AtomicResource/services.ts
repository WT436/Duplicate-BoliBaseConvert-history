import { SearchOrderPageInput } from '../../../../services/dto/searchOrderPageInput';
import http from '../../../../services/httpService';
import { AtomicInsertDto } from './dtos/atomicInsertDto';

class AtomicResourceService {
    public async resourceRead(search: SearchOrderPageInput) {
        return await http.get('/RBAC/ResourceRead', { params: { search: search } });
    }

    public async createResource(input: AtomicInsertDto) {
        return (await http.post('/RBAC/ResourceInsert', input).then(rs => {
            return rs.data;
        }));
    }
}

export default new AtomicResourceService();