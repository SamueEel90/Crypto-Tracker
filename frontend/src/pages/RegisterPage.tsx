import LoginFooter from "../components/LoginFooter";
import RegisterForm from "../components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
 <div className="min-h-screen flex flex-col items-center justify-center bg-dark-gray">
  <RegisterForm/>
  <LoginFooter/>
 </div>
 )
}
export default RegisterPage;
