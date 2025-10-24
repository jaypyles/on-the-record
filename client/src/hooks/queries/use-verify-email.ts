import { trpc } from "@/trpc/client";

type useVerifyEmailProps = {
  onSuccess: () => void;
};

export const useVerifyEmail = ({ onSuccess }: useVerifyEmailProps) => {
  const mutation = trpc.authRouter.verify.useMutation({ onSuccess });

  const verify = async (email: string, code: string, password: string) => {
    await mutation.mutateAsync({ email, code, password });
  };

  return { verify };
};
