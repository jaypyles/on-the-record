import { trpc } from "@/trpc/client";

export const useVerifyEmail = () => {
  const mutation = trpc.authRouter.verify.useMutation();

  const verify = async (email: string, code: string) => {
    return await mutation.mutateAsync({ email, code });
  };

  return { verify };
};
