import { FC, useRef, ChangeEvent, useState, DragEventHandler } from "react";

export const AttachFile: FC<{ isAttachMessageShow: boolean }> = ({ isAttachMessageShow }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList>();


  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target?.files as FileList);
  };

  const dragEnterHandler: DragEventHandler<HTMLDivElement> = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dragOverHandler: DragEventHandler<HTMLDivElement> = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
  };

  return (
    <section
      className={`w-[18rem] sm:w-[30rem] h-80 bg-[#fff] shadow-z24 absolute bottom-12 right-0 z-50 ${isAttachMessageShow ? 'block' : 'hidden'}`}
    >
      <header className="w-full h-[30%] bg-[#fff] flex justify-center items-center">
        <div className="w-32 h-10 bg-grey-300 flex justify-center items-center rounded-lg">
          <button
            type="button"
            className="w-28 h-8 bg-[#4353FF] text-[#fff] text-bold text-btn  rounded-lg"
          >
            New Upload
          </button>
        </div>
      </header>
      <section className="w-full h-[70%] bg-[#F8F8F8] p-6 flex flex-col justify-center items-center gap-4">
        <div
          className="w-full border border-dashed border-grey-300 rounded-full p-4 flex justify-end items-center"
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDrop={dropHandler}
        >
          <input
            type="file"
            name="file"
            id="file"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={onFileInputChange}
          />
          <button
            type="button"
            className="w-[15rem] text-grey text-[1.5rem]"
            onClick={() => fileInputRef.current?.click()}
          >
            Click to browse or drag and drop your files
          </button>
        </div>
        <p className="text-subtitle1 text-grey-700">
          <span className="text-secondary text-bold text-[1.3rem]">
            {files?.length || 0}
          </span>
          {' '}
          files selected!
        </p>
      </section>
    </section>
  );
};
