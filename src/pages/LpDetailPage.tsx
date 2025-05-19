import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";
import { Heart } from "lucide-react";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import { useAuth } from "../context/AuthContext.tsx";
import usePostLike from "../hooks/mutation/usePostLike.ts";
import useDeleteLike from "../hooks/mutation/useDeleteLike.ts";


const LpDetailPage = () => {
  

  const { lpId } = useParams(); // URL 파라미터에서 lpId 추출
  const { accessToken } = useAuth();

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });
  console.log("data", lp);

  const isLiked = lp?.data?.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

  const handleLike = () => {
    console.log("좋아요 누름");
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislike = () => {
    console.log("좋아요 취소");
    dislikeMutate({ lpId: Number(lpId) });
  };

  if (isPending) {
    return <div className="page">Loading...</div>;
  }

  if (isError || !lp) {
    return <div className="page">Error!</div>;
  }

  return (
    <div className="page">
      <h1 className="lp-title">{lp.data.title}</h1>
      <div className="lp-wrapper">
        <div
          className="lp-disc"
          style={{ backgroundImage: `url(${lp.data.thumbnail})` }}
        >
          <div className="lp-center-label"></div>
        </div>
      </div>
      <p>{lp.data.content}</p>

      <br />
      <p>작성자: {lp.data.author.name}</p>

      <button onClick={isLiked ? handleDislike : handleLike}>
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
