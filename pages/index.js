import { Typography } from "@mui/material";
import LoginForm from "components/LoginForm";
import FullLayout from "layouts/FullLayout";
import { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Index() {
  const [login, setLogin] = useState(false);

  const { data: session } = useSession();

  return (
    <FullLayout>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
        }}
      >
        Welcome to Access Management System
      </Typography>
      {/* {login ? "Welcome" : <LoginForm setLogin={setLogin} />} */}
      <div>
        {!session ? (
          <>
            <p>Not signed in</p>
            <br />
            <button onClick={() => signIn()}>Sign in</button>
          </>
        ) : (
          <main>
            <div>
              <h4>Signed in as {session.session.user.name}</h4>
              <button onClick={() => signOut()}>Sign out</button>
            </div>
          </main>
        )}
      </div>
    </FullLayout>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
