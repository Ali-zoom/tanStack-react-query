import React, { Dispatch, SetStateAction } from "react";
interface Iprops {
  queryTitle: string;
  setqueryTitle: Dispatch<SetStateAction<string>>;
}

const SearchByTitle = ({ queryTitle, setqueryTitle }: Iprops) => {
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setqueryTitle(e.target.value);
  };
  return (
    <div className="w-full max-w-xl mx-auto my-5 bg-blue-300 text-black">
      <form className="grid ">
        <input
          onChange={inputOnChange}
          value={queryTitle}
          className="border border-black mb-1"
          type="text"
          placeholder="enter post title"
        />
        <button type="submit" onSubmit={(e) => e.preventDefault()}>
          submit
        </button>
      </form>
    </div>
  );
};

export default SearchByTitle;
