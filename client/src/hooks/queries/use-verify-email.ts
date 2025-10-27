import { trpc } from "@/trpc/client";

export const useVerifyEmail = () => {
  const mutation = trpc.authRouter.verify.useMutation();

  const verify = async (
    email: string,
    code: string,
    new_register: boolean | undefined = false
  ) => {
    return await mutation.mutateAsync({ email, code, new_register });
  };

  return { verify };
};
