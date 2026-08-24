import './ButtonSideBar.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ButtonSideBar = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className="button-sidebar">
      {children}
    </button>
  );
};

export default ButtonSideBar;