import { Query } from "react-apollo";
import Link from "next/link";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const PleaseSignIn = (props) => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <Link href="/">
              <a>
                <h1>Sign In/Up</h1>
              </a>
            </Link>
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);

export default PleaseSignIn;
