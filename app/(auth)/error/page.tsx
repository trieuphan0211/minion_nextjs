import Link from "next/link";

const AuthErrorPage = () => {
  return (
    <div>
      <Link href="/signin">
        <button>Back to Sign in</button>
      </Link>
    </div>
  );
};

export default AuthErrorPage;
