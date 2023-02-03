import createPagination from "../../hooks/useCreatePag";
import "../../styles/UIStyles/Pagination.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useUrlBuilder } from "../../hooks/useUrlBuilder";
import SVGSelector from "../../svg/SvgSelector";

interface PaginationProps {
  totalMovies: number;
}

export default function Pagination({ totalMovies }: PaginationProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage: number = Number(searchParams.get("page"))
    ? Number(searchParams.get("page"))
    : 1;
  const { id } = useParams();
  const { queryParams } = useUrlBuilder();

  const { pagination }: any = createPagination({
    numberOfArticles: totalMovies,
    articlesPerPage: 10,
    numberOfButtons: 3,
    currentPage,
  });

  const handleClick = (page: number) =>
    typeof page == "string"
      ? null
      : navigate(`/movie-list/${id}?page=${page}${queryParams}`);
  return (
    <div className="pagination">
      <ul>
        <li
          className={`${pagination[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage - 1)}
          style={{ rotate: "180deg" }}
        >
          <SVGSelector id="btnIcon" />
        </li>
        {pagination.map((page: number, index: number) => (
          <li
            className={`${currentPage === page && "active"}`}
            onClick={handleClick.bind(null, page)}
            key={index}
          >
            {page}
          </li>
        ))}
        <li
          className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
          onClick={handleClick.bind(null, currentPage + 1)}
        >
          <SVGSelector id="btnIcon" />
        </li>
      </ul>
    </div>
  );
}
