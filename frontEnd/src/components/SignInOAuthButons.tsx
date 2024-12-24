import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButons = () => {
  const { signIn, isLoaded } = useSignIn();
  if (!isLoaded) {
    return null;
  }
  const signInWithGoogle = () => {
    console.log("signing in with google");

    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
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
