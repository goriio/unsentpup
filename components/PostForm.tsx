import { db } from "@/firebase";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import toast from "react-hot-toast";
import { BiUpArrowAlt } from "react-icons/bi";
import { Button } from "./Button";
import { badgeVariants, cardVariants, Color } from "./Card";
import { Spinner } from "./Spinner";

const colors: Color[] = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "violet",
  "pink",
];

const NAME_MAX_LENGTH = 10;
const TAG_MAX_LENGTH = 5;
const MESSAGE_MAX_LENGTH = 120;

interface PostFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function PostForm({ isOpen, setIsOpen }: PostFormProps) {
  const [name, setName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [color, setColor] = useState<Color>(colors[0]);
  const [loading, setLoading] = useState<boolean>(false);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length > NAME_MAX_LENGTH) return;
    setName(value);
  }

  function handleTagChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value.length > TAG_MAX_LENGTH) return;
    if (value.match(/[^A-Za-z]/)) return;
    setTag(value.toUpperCase());
  }

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    if (value.length > MESSAGE_MAX_LENGTH) return;
    setMessage(value);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setName((prev) => prev.trim());
    setMessage((prev) => prev.trim());
    if (!name.trim()) {
      toast.error("You did not input their name.");
      return;
    }
    if (!message.trim()) {
      toast.error("You did not write a message.");
      return;
    }

    const post = {
      to: name,
      badge: tag,
      message: message,
      color: color,
      date: serverTimestamp(),
    };

    try {
      setLoading(true);
      await addDoc(collection(db, "posts"), post);
      toast.success("Posted successfully.");
    } catch (error) {
      let message = "";

      if (error instanceof FirebaseError) {
        message = error.message;
      } else {
        message = "Something went wrong.";
      }

      toast.error(message);
    } finally {
      setIsOpen(false);
      setName("");
      setTag("");
      setMessage("");

      setLoading(false);
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                <form onSubmit={handleSubmit}>
                  <div
                    className={clsx(
                      cardVariants[color],
                      "flex flex-col fw-full mb-4 p-4 rounded-md cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-gray-50 font-semibold text-sm">
                        To:{" "}
                        <input
                          value={name}
                          onChange={handleNameChange}
                          className="w-[10rem] px-2 border-b border-color-gray-50 bg-transparent placeholder:text-gray-300 outline-none"
                          placeholder="Someone"
                          aria-label="Name"
                        />
                      </h2>
                      <span
                        className={clsx(
                          "px-1 py-0.5 rounded-lg text-[10px] font-bold",
                          badgeVariants[color]
                        )}
                      >
                        <input
                          value={tag}
                          onChange={handleTagChange}
                          className="w-14 center bg-transparent outline-none placeholder:text-gray-500"
                          placeholder="TAG"
                          aria-label="tag"
                        />
                        <span>{TAG_MAX_LENGTH - tag.length}</span>
                      </span>
                    </div>

                    <p className="text-gray-100 text-sm mb-3">
                      <textarea
                        value={message}
                        onChange={handleMessageChange}
                        className="bg-transparent w-full h-24 placeholder:text-gray-300 resize-none outline-none"
                        placeholder="Your message here"
                        aria-label="Message"
                      ></textarea>
                      <span className="text-gray-300 text-right text-xs">
                        {MESSAGE_MAX_LENGTH - message.length}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center justify-end gap-2 w-full mb-4">
                    {colors.map((color) => {
                      return (
                        <label
                          key={color}
                          className="inline-block w-6 h-6 cursor-pointer active:translate-y-0.5 ease-in-out"
                        >
                          <span
                            className={clsx(
                              "block w-full h-full bg-blue-500 rounded-md",
                              cardVariants[color]
                            )}
                          ></span>
                          <input
                            type="radio"
                            className="hidden"
                            name="color"
                            value={color}
                            onChange={(event) => {
                              setColor(event.target.value as Color);
                            }}
                          />
                        </label>
                      );
                    })}
                  </div>

                  <div className="flex gap-2 justify-end items-center mt-2">
                    <Button type="button" onClick={closeModal} variant="subtle">
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      icon={
                        loading ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          <BiUpArrowAlt />
                        )
                      }
                      disabled={loading}
                    >
                      Post
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
