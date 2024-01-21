import classes from "./Button.module.css";

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  viewBag?: boolean;
  checkOut?: boolean;
  order?: boolean;
  disabled?: boolean;
  clicked?: ()=> void;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { type, viewBag, checkOut, order, disabled, clicked, children } = props;
  return (
    <button
      type={type || "button"}
      className={`${classes[`btn`]} ${viewBag ? classes[`view-bag`] : ""} ${
        checkOut ? classes[`check-out`] : ""
      } ${order ? classes[`order`] : ""}`}
      disabled={disabled}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
