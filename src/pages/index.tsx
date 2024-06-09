import BlogPreview from "@/components/BlogPreview";
import { getBlogs } from "@/server/blogs";
import { BlogPost } from "@/types/blog";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useMemo, useState } from "react";

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter));
        })
      : blogData;
  }, [filterWord]);
  const filterLabel = (tag: any, index: number) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((id) => id !== index));
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText));
    } else {
      setSelectedIndex([...selectedIndex, index]);
      setFilterWord([...filterWord, tag.innerText]);
    }
  };
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
        <div className="flex gap-3 mb-12">
          {tags.map((tag: string, index: number) => {
            return (
              <button
                className={`${
                  selectedIndex.includes(index)
                    ? "label-selected hover:bg-sky-400 transition-all duration-300 "
                    : "label hover:bg-sky-400 transition-all duration-300"
                }`}
                key={index}
                onClick={(e) => filterLabel(e.target, index)}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
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
  let tags: string[] = [];
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
  }
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  };
};
