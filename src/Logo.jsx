import logo from "./assets/logo.png";

export function Logo({ h = 80 }) {
  return <img src={logo} alt="ManthanPay" height={h} style={{ height: h, width: "auto", display: "block" }} />;
}
export default Logo;
