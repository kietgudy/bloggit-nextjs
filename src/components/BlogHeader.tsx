import React from "react";

interface headerProps {
  createdAt: string;
  author: {
    name: string;
    avatar: string;
    url: string;
  };
}

const BlogHeader: React.FC<headerProps> = (props) => {
  const { createdAt, author } = props;
  const createdDate: Date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="flex">
      <img
        src={author.avatar}
        className="rounded-[50%] mb-4 mr-4"
        width={50}
        height={50}
      />
      <div className="flex flex-col">
        <p className="font-semibold text-[1rem]">{author.name}</p>
        <div className="flex gap-[7rem]">
          <li className="list-none font-normal text-[0.85rem]">{author.url}</li>
          <li className=" font-normal ml-2 text-[0.85rem]">
            {createdDate.toLocaleDateString("en-US", options)}
          </li>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
