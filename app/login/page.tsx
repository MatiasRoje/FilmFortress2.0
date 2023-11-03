import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login",
};

function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center py-8">
      <LoginForm />
    </main>
  );
}

export default LoginPage;
