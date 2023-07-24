import { TextInput } from "flowbite-react";
import { ComponentProps } from "react";

export const TextField = (props: ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      color="gray"
      theme={{
        field: {
          input: {
            base: "bg-transparent text-slate-300 w-full text-slate-300",
            colors: {
              gray: "bg-transparent text-slate-300 w-full text-slate-300 border-[1px] rounded-md border-slate-700",
            },
          },
          base: "w-full",
        },
      }}
      {...props}
    />
  );
};
