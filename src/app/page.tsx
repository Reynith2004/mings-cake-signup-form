// app/page.tsx
import SignupPage from "@/app/signup/page";  // Import SignupPage component from app/signup/page.tsx

const HomePage: React.FC = () => {
  return <SignupPage />;  // Directly render the SignupPage
};

export default HomePage;
