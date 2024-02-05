import request, { Response } from '@/apis/request';
import {
  CodeDetail,
  DawnBringerStatus,
  DragonGameRank,
  DragonGovernInfo,
  DragonProposal,
  FetchDragonProposalParams,
  LoginParams,
  UserInfo,
} from './types';
import { Address } from 'viem';
import { DragonProposalSortField } from '@/constants/enum';

export const fetchLogin = (data: LoginParams) => request.post<any, Response<UserInfo>>('/modragon/code/login', data);

export const fetchDragonGovernInfo = (address?: Address) =>
  request.get<any, Response<DragonGovernInfo>>('/modragonGovern/basicInfo');

export const fetchNumberOfDragonProposals = (address?: Address) =>
  request.get<any, Response<number>>('/modragonGovern/numberOfProposals', { params: { userAddress: address } });

export const fetchDragonGameRank = ({ page = 1, size = 25 }: FetchDragonProposalParams) =>
  request.get<any, Response<DragonGameRank[]>>('/modragon/mo-rank/list', {
    params: { page, size },
  });

export const fetchDragonProposals = ({
  sortField = DragonProposalSortField.ALL,
  page = 1,
  size = 16,
}: FetchDragonProposalParams) =>
  request.get<any, Response<DragonProposal[]>>('/modragonGovern/proposals', {
    params: { sortField, first: size, skip: size * (page - 1) },
  });

export const fetchDawnBringerStatus = () => request.get<any, Response<DawnBringerStatus>>('/modragon/nft/dawn-bringer/status');
