import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const SignInOAuthButons = () => {
  const { signIn, isLoaded } = useSignIn();
  const navigate = useNavigate();
  if (!isLoaded) {
    return null;
  }
  const signInWithGoogle = async () => {
    console.log("signing in with google");

    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
    navigate("/auth-callback");
  };
  return (
    <Button
      variant="secondary"
      className=" text-white border-zinc-200 h-11"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </Button>
  );
};

export default SignInOAuthButons;
