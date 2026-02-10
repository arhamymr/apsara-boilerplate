import { RegisterForm } from "@/components/auth/form/register";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <RegisterForm showTerms={true} />
      </div>
    </div>
  );
}
