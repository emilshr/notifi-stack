import { TextInput, Textarea } from "flowbite-react";
import { ComponentProps } from "react";

export const TextArea = (props: ComponentProps<typeof Textarea>) => {
  return (
    <Textarea
      color="gray"
      className="rounded-md"
      theme={{
        base: "bg-transparent text-slate-300 w-full text-slate-300",
        colors: {
          gray: "bg-transparent text-slate-300 w-full text-slate-300",
        },
      }}
      {...props}
    />
  );
};
