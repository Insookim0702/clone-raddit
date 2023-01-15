import { loadDefaultErrorComponents } from "next/dist/server/load-components";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { submitCreate } from "../../axios/subs";
import InputGroup from "../../components/InputGroup";

interface Props {
  /* properties */
}

const Create: FC<Props> = (/* props */) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>("");

  const handleCreate = async () => {
    try {
      const res = await submitCreate({ name, title, description });
      router.push(`/r/${res?.data.name}`);
    } catch (error: any) {
      console.error(error);
      setErrors(error.response.data);
    }
  };

  return (
    <div className="bg-white max-w-[300px] mx-auto">
      <h1 className="font-bold text-2xl">커뮤니티 만들기</h1>
      <div className="mb-5">
        <h2 className="font-bold text-[18px]">이름</h2>
        <small className="text-gray-400 mb-[10px]">커뮤니티 이름</small>
        <InputGroup
          placeholder={"커뮤니티 이름"}
          value={name}
          error={errors.name}
          setValue={setName}
        />
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-[18px]">주제</h2>
        <small className="text-gray-400 mb-[10px]">주제입니다.</small>
        <InputGroup
          placeholder={"주제"}
          value={title}
          error={errors.title}
          setValue={setTitle}
        />
      </div>
      <div className="mb-5">
        <h2 className="font-bold text-[18px]">커뮤니티 설명</h2>
        <small className="text-gray-400 mb-[10px]">커뮤니티 설명</small>
        <InputGroup
          placeholder={"커뮤니티 설명"}
          value={description}
          error={errors.description}
          setValue={setDescription}
        />
      </div>

      <button
        className="bg-blue-500 rounded p-2 text-white"
        onClick={handleCreate}
      >
        커뮤니티 만들기
      </button>
    </div>
  );
};

export default Create;
