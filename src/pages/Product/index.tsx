import React from 'react';
import styled from '@emotion/styled';
import Layout from '@features/Layout';
import { CenteredContainer } from '@components/common';
import ProductInfo from '@features/Product/ProductInfo';
import { ROUTE_PATH } from '@routes/path';
import useRedirectIfNoParam from '@hooks/useRedirectIfNoParam';
// import ProductOrder from '@features/Product/ProductOrder';
import useProductData from './hooks/useProductData';

export default function Product() {
  const { productDetailData, productOptionData } = useProductData();
  useRedirectIfNoParam('productId', ROUTE_PATH.HOME);

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <ProductInfo
            name={productDetailData?.name}
            image={productDetailData?.imageUrl}
            price={productDetailData?.price}
          />
          {/* <ProductOrder
            name={productDetailData?.detail.name}
            giftOrderLimit={productOptionData?.options.giftOrderLimit}
          /> */}
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 100px;
`;
