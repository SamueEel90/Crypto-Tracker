import LoginFooter from "../components/LoginFooter";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    
<div className="min-h-screen flex flex-col items-center justify-center bg-dark-gray">
<LoginForm />
<LoginFooter />
</div>

  )
}
export default LoginPage;