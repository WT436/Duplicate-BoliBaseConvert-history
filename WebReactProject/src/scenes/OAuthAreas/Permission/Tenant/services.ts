import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../../services/dto/responsesResource';
import { SearchRequest } from '../../../../services/dto/searchRequest ';
import http from '../../../../services/httpService';
import { AtomicInsertDto } from './dtos/atomicInsertDto';

class AtomicResourceService {
    public async getAllTenant(input: SearchRequest)
    : Promise<ResponsesResource<PagedResultDto<TenantCommonDto>>> {
    let rs = await http.get('/api/v1/TenantCommon/GetAll',
        {
            params: {
                propertySearch: input.propertySearch,
                valuesSearch: input.valuesSearch,
                propertyOrder: input.propertyOrder,
                valueOrderBy: input.valueOrderBy,
                pageIndex: input.pageIndex,
                pageSize: input.pageSize
            }
        });

    return rs ? rs.data : rs;
}

}

export default new AtomicResourceService();