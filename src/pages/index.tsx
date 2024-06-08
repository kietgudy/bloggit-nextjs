import BlogPreview from "@/components/BlogPreview";
import { getBlogs } from "@/server/blogs";
import { BlogPost } from "@/types/blog";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

const Home: NextPage = ({
  blogData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <main className="font-poppins w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-300">
      <title>Home Page</title>
      <section>
        <div className="mt-3 text-center">
          <h1 className="text-[3rem]">Welcome to Bloggit</h1>
          <p className="text-[18px]">
            This blog is based on the Github GraphQL API
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12"></div>
        {blogData.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300 cursor-pointer"
            >
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs();
  return {
    props: {
      blogData: blogs,
    },
  };
};
