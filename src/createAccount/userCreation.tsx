import GradientBackgroundContainer from "@/components/GradientBackgroundContainer";
import { Headers } from "@/createAccount/_componetns/headers.tsx";
import { RegisterForm } from "@/createAccount/_componetns/registerForm.tsx";

const CreateUserPage = () => {
  return (
    <GradientBackgroundContainer className="bg-white w-full h-full py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Headers />
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <RegisterForm />
        </div>
      </div>
    </GradientBackgroundContainer>
  );
};

export default CreateUserPage;
