import { Breadcrumb } from "antd";
import { Link, useMatches } from "react-router-dom";

interface CustomRouteMatch {
  id: string;
  pathname: string;
  params: Record<string, string>;
  data?: object;
  handle?: {
    breadcrumb?: string | ((params: Record<string, string>) => string);
  };
}

const Breadcrumbs = () => {
  const matches = useMatches() as CustomRouteMatch[];
  
  return (
    <Breadcrumb>
      {matches
        .filter((match) => match.handle?.breadcrumb)
        .map((match) => {
          const breadcrumb =
            typeof match.handle?.breadcrumb === "function"
              ? match.handle?.breadcrumb(match.params)
              : match.handle?.breadcrumb;

          return (
            <Breadcrumb.Item key={match.pathname}>
              <Link to={match.pathname}>{breadcrumb}</Link>
            </Breadcrumb.Item>
          );
        })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
