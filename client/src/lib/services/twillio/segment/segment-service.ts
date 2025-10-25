import { Session } from "next-auth";

export const identifyUser = (session: Session, anonymousId: string) => {
  const { user } = session;

  window.analytics?.identify(
    user.id,
    {
      name: user.name,
      email: user.email,
    },
    // @ts-ignore
    { anonymousId }
  );
};

export const getAnonymousId = () => {
  return window.analytics?.user()?.anonymousId?.();
};

export const updateUser = (id: string, update: Object) => {
  window.analytics?.identify(id, update);
};

export const track = (eventName: string, data: Object) => {
  window.analytics?.track(eventName, data);
};
