import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useVerifyEmail } from "@/hooks/queries/use-verify-email";
import { useCart } from "@/hooks/use-cart";
import { Twillio } from "@/lib/services";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

type VerificationProps = {
  email: string;
  password: string;
};

export const Verification = ({ email, password }: VerificationProps) => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { getCartQuery, loadCart } = useCart();

  const onSuccess = useCallback(async () => {
    await signOut();
    await signIn("credentials", {
      redirect: true,
      callbackUrl: "/",
      email,
      password,
    });
  }, [email, password]);

  const { verify } = useVerifyEmail({ onSuccess });

  const handleVerify = async (_e: React.FormEvent) => {
    setLoading(true);
    await verify(email, code, password);

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    const session = await getSession();

    if (session) {
      const { data } = await getCartQuery.refetch();
      loadCart(data.items);

      Twillio.segment.identifyUser(session, Twillio.segment.getAnonymousId());
    }

    router.push("/");

    setLoading(false);
  };

  return (
    <Card className="max-w-lg w-full">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-8">
          A verification code has been sent to{" "}
          <b>{email || "jaydenpyles0524@gmail.com"}.</b>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <Label htmlFor="code" className="mb-2">
              Verification Code
            </Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
