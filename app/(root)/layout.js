import Navbar from "@/components/Navbar";
import PostsContextProvider from "@/providers/PostsContextProvider";
import UserContextProvider from "@/providers/UserContextProvider";

export default function HomeLayout({ children }) {
  return (
    <main>
      <UserContextProvider>
      <PostsContextProvider>
      <Navbar />
      {children}
      </PostsContextProvider>
      </UserContextProvider>
    </main>
  );
}
