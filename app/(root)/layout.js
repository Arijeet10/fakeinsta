import PostsContextProvider from "@/providers/PostsContextProvider";
import UserContextProvider from "@/providers/UserContextProvider";

export default function HomeLayout({ children }) {
  return (
    <main>
      <UserContextProvider>
      <PostsContextProvider>
      {children}
      </PostsContextProvider>
      </UserContextProvider>
    </main>
  );
}
