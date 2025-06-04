import ProfileWalletBalance from "../components/ProfileWalletBalance";

const ProfilePage: React.FC = () => {
return (
<div className="min-h-screen flex flex-col  bg-dark-gray">
  <h1 className="text-4xl text-white mb-6">Profile Page</h1>
  <p className="text-lg text-amber-50">This is where user profile information will be displayed.</p>
  <ProfileWalletBalance />
</div>
);
}
export default ProfilePage;