import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";

const LpDetailPage = () => {
  const { lpId } = useParams(); // URL 파라미터에서 lpId 추출

  const id = Number(lpId);
  const { data, isPending, isError } = useGetLpDetail(id);
  console.log("data", data);

  if (isPending) {
    return <div className="page">Loading...</div>;
  }

  if (isError || !data) {
    return <div className="page">Error!</div>;
  }

  return (
    <div className="page">
      <h1 className="lp-title">{data.title}</h1>
      <div className="lp-wrapper">
        <div
          className="lp-disc"
          style={{ backgroundImage: `url(${data.thumbnail})` }}
        >
          <div className="lp-center-label"></div>
        </div>
      </div>
      <p>{data.content}</p>

      <br />
      <p>작성자: {data.author.name}</p>
    </div>
  );
};

export default LpDetailPage;
