import { GetProductsRequest } from '@internalTypes/requestTypes';
import { GetProductsResponse } from '@internalTypes/responseTypes';
import axiosInstance from '@apis/instance';
import { PRODUCTS_PATHS } from '@apis/path';
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const getProducts = async (params: GetProductsRequest): Promise<GetProductsResponse> => {
  const res = await axiosInstance.get(PRODUCTS_PATHS.PRODUCTS(params));

  return res.data;
};

export const useGetProducts = ({
  categoryId,
  size,
  sort,
}: Omit<GetProductsRequest, 'page'>): UseInfiniteQueryResult<InfiniteData<GetProductsResponse>, AxiosError> =>
  useInfiniteQuery({
    queryKey: ['products', categoryId],
    queryFn: ({ pageParam = 0 }) => getProducts({ categoryId, page: pageParam, size, sort }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.pageable.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });