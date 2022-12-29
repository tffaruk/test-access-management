import { Grid } from "@mui/material";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn({ providers }) {
  const { data: session } = useSession;
  const router = useRouter();
  //   const signin = async (id) => {
  //     const res = await signIn(id);
  //     if (res.status === 200) {
  //       router.replace("/");
  //     }

  //     console.log(res);
  //   };

  return (
    <Grid
      textAlign="center"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {Object.values(providers).map((provider) => (
        <Grid key={provider.name} width="100%">
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </Grid>
      ))}
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  const providers = await getProviders(context);
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/users" },
    };
  }
  return {
    props: { providers },
  };
}
