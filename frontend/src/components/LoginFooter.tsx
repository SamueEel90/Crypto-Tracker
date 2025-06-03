const LoginFooter: React.FC = () => {
  return (
    <div>
      <footer className="bg-dark-gray text-center py-4 mt-8">
      
        <p className="text-sm text-gray-400">
          <a href="/language" className="hover:underline mx-2.5">Language</a>
          <a href="/terms" className="hover:underline mx-2.5">Terms</a>
          <a href="/privacy" className="hover:underline mx-2.5">Privacy</a>
        </p>  
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SCrypto. All rights reserved.
        </p>
      </footer>
    </div>
  );
} 
export default LoginFooter;