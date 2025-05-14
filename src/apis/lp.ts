import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";
import { LpDetail } from "../types/lp";
import { RequestLpDetailDto } from "../types/lp";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async ({ lpId }: RequestLpDetailDto): Promise<LpDetail> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
//   console.log("서버 응답:", data); // CommonResponse 전체
//   console.log("내가 반환하는 값:", data.data); // LP 상세 내용

  return data.data; // CommonResponse<T> 구조에서 실제 LP 상세 정보만 추출
};
