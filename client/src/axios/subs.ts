import request from "./core";

interface payload {
  name: string;
  title: string;
  description: string;
}

export const submitCreate = async ({ name, title, description }: payload) => {
  try {
    await request.post("/subs", {
      name,
      title,
      description,
    });
  } catch (error: any) {
    throw error;
  }
};
