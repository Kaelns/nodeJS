import { LIMIT_ON_PAGE } from '@/services/api/v2/data/constants';
import type { IQueryProductsArgs } from '@/services/api/v2/data/types';
import type { ApiClient } from '@/services/api/v2/lib/ApiClient';
import type {
  Category,
  CategoryPagedQueryResponse,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse
} from '@commercetools/platform-sdk';

export class ProductsModel {
  public categories: Category[] = [];

  constructor(private apiClient: ApiClient) {}

  public async getProductByKey(key: string): Promise<ClientResponse<ProductProjection>> {
    return this.apiClient.getApiRoot().productProjections().withKey({ key }).get().execute();
  }

  public async getProducts(
    queryArgs: IQueryProductsArgs = {},
    amount?: number
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    queryArgs.limit = !amount ? LIMIT_ON_PAGE : amount;
    return this.apiClient.getApiRoot().productProjections().search().get({ queryArgs }).execute();
  }

  public async getCategoriesAll(): Promise<ClientResponse<CategoryPagedQueryResponse>> {
    return this.apiClient.getApiRoot().categories().get().execute();
  }
}
