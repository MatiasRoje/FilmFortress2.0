import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login",
};

function LoginPage() {
  //  const { login, isAuthenticated } = useAuth();
  //  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/app", { replace: true });
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <main className="flex flex-col items-center justify-center py-8">
      <LoginForm />
    </main>
  );
}

export default LoginPage;
