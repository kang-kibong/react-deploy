import React from 'react';
import styled from '@emotion/styled';
import useDeleteWish from '@apis/wish/hooks/useDeleteWish';

export interface WishListItemProps {
  wishId: number;
  productImageUrl: string;
  productName: string;
  productPrice: number;
  onDelete: () => void;
}

export default function WishListItem({
  wishId,
  productImageUrl,
  productName,
  productPrice,
  onDelete,
}: WishListItemProps) {
  const { mutate } = useDeleteWish();

  const handleDelete = () => {
    mutate(
      { wishId },
      {
        onSuccess: () => {
          onDelete();
        },
        onError: (error) => {
          console.error('Failed to delete wish item', error);
        },
      },
    );
  };

  return (
    <WishListItemContainer>
      <InnerContainer>
        <WishListDetail>
          <ImageContainer>
            <img src={productImageUrl} alt="product" />
          </ImageContainer>
          <div>
            <Name>{productName}</Name>
            <Price>{productPrice}원</Price>
          </div>
        </WishListDetail>
        <button onClick={handleDelete}>삭제하기</button>
      </InnerContainer>
    </WishListItemContainer>
  );
}

const WishListItemContainer = styled.li`
  display: flex;
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const WishListDetail = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  img {
    max-width: 200px;
  }

  margin-right: 24px;
`;

const Name = styled.p`
  font-size: 24px;
  font-weight: 700px;
`;

const Price = styled.span`
  font-size: 18px;
`;
