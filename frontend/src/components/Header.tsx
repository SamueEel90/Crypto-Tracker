const Header: React.FC = () => {
  return (
<div className=" fixed top-0 w-full p-4  h-16 bg-dark-gray text-white">
    <ul className="flex space-x-4">
      <li><a className="text-white text-2xl" href="/homePage">SCrypto</a></li>
      <li><a href="/homePage">Buy Crypto</a></li>
      <li><a href="/homePage">Markets</a></li>
      <li><a href="/homePage">Auto-Invest</a></li>
      <li><a href="/homePage">Wallet</a></li>
      <li><a href="/homePage">Crypto Bots</a></li>
      <li><a href="/homePage">Profile</a></li>
    </ul>
</div>
  );
}
export default Header;