const Footer:React.FC = () => {
  return (
    
    <div className='bg-dark-gray h-20 w-full flex justify-center items-center text-amber-50'>

      <p className='text-sm'>
        © {new Date().getFullYear()} Crypto Tracker. All rights reserved.
      </p>
    </div>
  );
}
export default Footer;