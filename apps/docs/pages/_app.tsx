import { NotifiWrapper } from "@emilshr/notifi";
import { AppType } from "next/app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <NotifiWrapper
      projectApiKey="U2FsdGVkX1+X/zolnEDMMCHwJm6C415YbEgeUqNK6wGiucwTcdsTLzPEbAclLxOH"
      projectId="cllb24n140007yys62as1wwy6"
      connectionEndpoint="http://localhost:3000"
    >
      <Component {...pageProps} />
    </NotifiWrapper>
  );
};

export default MyApp;
