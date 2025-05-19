import { PaginationDto } from "../types/common";
import { NewLpDetail, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";
import {
  RequestLpDetailDto,
  ResponseLpDetailDto,
  ResponseLikeLpDto,
} from "../types/lp";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async ({
  lpId,
}: RequestLpDetailDto): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  console.log("서버 응답:", data); // CommonResponse 전체
  console.log("내가 반환하는 값:", data.data); // LP 상세 내용

  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDetailDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDetailDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
};

export const postLp = async (data: NewLpDetail) => {
  console.log("New LP data", data);
  const response = await axiosInstance.post("/v1/lps", data); // 실제 API 경로로 변경
  return response.data;
};
