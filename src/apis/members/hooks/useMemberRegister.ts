import axiosInstance from '@apis/instance';
import { AxiosError } from 'axios';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { UserInfoData } from '@internalTypes/dataTypes';
import { MemberResponse } from '@internalTypes/responseTypes';
import { MEMBERS_PATHS } from '@apis/path';

const postMemberRegister = async ({ email, password }: UserInfoData): Promise<MemberResponse> => {
  const res = await axiosInstance.post(MEMBERS_PATHS.REGISTER, {
    email,
    password,
  });
  return res.data;
};

export const useMemberRegister = (): UseMutationResult<MemberResponse, AxiosError, UserInfoData> =>
  useMutation({
    mutationFn: ({ email, password }: UserInfoData) => postMemberRegister({ email, password }),
  });
