import Layout from "../../components/Layout";
import Content from "../../modules/OAuth";

const OAuthAuthorize = () => {
  return (
    <Layout page={{ title: "Authorize App", hideHeader: true }}>
      <Content />
    </Layout>
  );
};

export default OAuthAuthorize;
