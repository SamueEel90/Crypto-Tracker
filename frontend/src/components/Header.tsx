const Header: React.FC = () => {
  return (
<div className="flex  p-4 bg-blue-500 text-white">
    <ul className="flex space-x-4">
      <li><a className="text-twitter-blue text-2xl" href="/">SCrypto</a></li>
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