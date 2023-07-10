import { getServerSession } from "next-auth";
import { authOptions } from "../../server/auth";

export default async function Post() {
  const user = await getServerSession(authOptions);
  console.log({ user });
  return <>post</>;
}
