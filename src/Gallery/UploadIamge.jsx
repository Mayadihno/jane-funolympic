import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { v4 } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import Loader from "../components/Loader/Loader";
const UploadIamge = () => {
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const storage = getStorage();
  const handleFileChange = (e) => {
    const files = e.target.files[0];
    setAvatar(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storageRef = ref(storage, `images/${avatar.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // get the Progress Function
          const progress =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //Update Progress
          console.log(`progres is ${progress}`);
          setLoading(true);
        },
        (error) => {
          //Error Function
          console.log(error);
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
            //   setImageUrl(url);
            const addRef = collection(db, "images");
            await addDoc(addRef, {
              imageUrl: url,
              desc: description,
              timestamp: serverTimestamp(),
            });
            toast.success("Image Upload Successfully");
            navigate("/gallery", { replace: true });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className=" bg-white shadow-md rounded-[5px] 800px:w-1/2 w-full">
        {loading && <Loader text={"Image uploading don't refresh the page"} />}
        <form onSubmit={handleSubmit}>
          <h2 className=" text-[16px] font-[600] font-Poppins pt-4 text-center">
            Upload the image of the day
          </h2>
          <div>
            <div className="mt-2 flex items-center justify-center py-5">
              <span
                className={`inline-block ${
                  avatar ? "h-1/3 w-1/3" : "h-8 w-8 "
                } rounded-full overflow-hidden`}
              >
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-[4px]"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex cursor-pointer items-center justify-center px-10 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  name="file"
                  id="file-input"
                  accept=".jpeg,.png,.jpg"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="p-2">
            <label
              htmlFor="description"
              className="pb-2 text-[14px] font-[600]"
            >
              Image Description <span className=" text-red-500">*</span>
            </label>
            <textarea
              cols={30}
              rows={8}
              type="text"
              name="description"
              value={description}
              id="description"
              required
              onChange={(e) => setDescription(e.target.value)}
              className=" mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter image description..."
            />
          </div>
          <div className="p-2">
            <input
              type="submit"
              value="Upload"
              className=" mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer hover:bg-blue-700 hover:text-white"
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default UploadIamge;
