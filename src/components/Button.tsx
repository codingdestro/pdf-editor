interface Props {
  children: string;
  onClickHandler?: () => void;
  disable: boolean;
}
const Button = ({ children, onClickHandler, disable }: Props) => {
  return (
    <div>
      <button
        onClick={!disable ? onClickHandler : () => { }}
        className={`py-2 px-5 bg-violet-300 rounded-lg shadow-lg font-semibold ${disable && "opacity-50"}
        `}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
