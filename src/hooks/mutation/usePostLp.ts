import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";
// import { queryClient } from "../../App";
// import { QUERY_KEY } from "../../constants/key";

export default function usePostLp() {
  return useMutation({
    mutationFn: postLp,
    onSuccess: () => {
      // 요청에 대한 응답이 이 data 안으로 들어옴
    },
  });
}
