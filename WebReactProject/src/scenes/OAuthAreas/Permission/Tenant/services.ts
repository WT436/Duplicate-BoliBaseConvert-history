import { PagedResultDto } from '../../../../services/dto/pagedResultDto';
import { ResponsesResource } from '../../../../services/dto/responsesResource';
import { SearchRequest } from '../../../../services/dto/searchRequest ';
import http from '../../../../services/httpService';
import { PermissionUri } from '../../../../services/urlApi/permisionUri';
import { TenantBasicDto, TenantInsertDto, TenantUpdateDto } from './dtos/tenantDto';

class TenantAdminService {
    public async GetAllTenant(input: SearchRequest)
        : Promise<ResponsesResource<PagedResultDto<TenantBasicDto>>> {
        let rs = await http.get(PermissionUri.MYTENANT_GETALL,
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

    public async InsertTenant(input: TenantInsertDto)
        : Promise<ResponsesResource<number>> {
        let rs = await http.post(PermissionUri.MYTENANT_CREATETENANT, input);
        return rs ? rs.data : rs;
    }

    public async UpdateTenant(input: TenantUpdateDto)
    : Promise<ResponsesResource<number>> {
    let rs = await http.put(PermissionUri.MYTENANT_UPDATETENANT, input);
    return rs ? rs.data : rs;
}
}

export default new TenantAdminService();