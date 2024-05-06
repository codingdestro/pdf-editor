import { Link } from "react-router-dom";

interface Props {
  path: string;
  children: string;
}

const Button = ({ path, children }: Props) => {
  return (
    <div>
      <div
        className="px-5 m-2 min-w-44 text-center py-3 bg-blue-400 text-white rounded-lg 
        hover:bg-blue-500 transition-colors cursor-pointer shadow-md

        "
      >
        <Link to={path}>{children}</Link>
      </div>
    </div>
  );
};

export default Button;
