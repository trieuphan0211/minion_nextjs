import { auth, signOut } from "@/auth";

const SettingPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button>Signout</button>
      </form>
    </div>
  );
};

export default SettingPage;
