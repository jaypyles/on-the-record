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
import { signIn, signOut } from "next-auth/react";
import { useCallback, useState } from "react";

type VerificationProps = {
  email: string;
  password: string;
};

export const Verification = ({ email, password }: VerificationProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(false);
  };

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
      </CardHeader>
      <CardContent>
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
