
import PortfolioGraph from "../components/PortFolioGraph";
import ProfilePicture from "../components/ProfilePicture";
import ProfileWalletBalance from "../components/ProfileWalletBalance";
import TradeHistory from "../components/TradeHistory";

const ProfilePage: React.FC = () => {
return (
<div className="min-h-screen flex flex-col  bg-dark-gray">
  <h1 className="text-4xl text-white mb-6">Profile Page</h1>
  
  <ProfilePicture />
  <ProfileWalletBalance />
  <PortfolioGraph />
  <TradeHistory />

</div>
);
}
export default ProfilePage;