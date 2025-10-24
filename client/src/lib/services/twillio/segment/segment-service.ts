import { Session } from "next-auth";

export const identifyUser = (session: Session) => {
  const { user } = session;

  window.analytics?.identify(user.id, {
    name: user.name,
    email: user.email,
  });
};

export const updateUser = (id: string, update: Object) => {
  window.analytics?.identify(id, update);
};

export const track = (eventName: string, data: Object) => {
  window.analytics?.track(eventName, data);
};
