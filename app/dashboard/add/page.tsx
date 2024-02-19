"use client";
import { Button, Input } from "@nextui-org/react";
import * as actions from "@/actions";
import { useFormState } from "react-dom";

const AddFriendPage = () => {
  const [formState, action] = useFormState(actions.sendFriendRequest, {
    errors: {},
  });

  return (
    <main className="pt-32 pl-14">
      <h1 className="text-5xl font-bold mb-6">Add a Friend</h1>
      <form action={action} className="flex items-start gap-2">
        <Input
          name="email"
          placeholder="your@example.com"
          size="sm"
          variant="bordered"
          isInvalid={
            !!formState.errors?.email?.length ||
            !!formState.errors?._form?.length
          }
          errorMessage={
            formState.errors?.email?.join(", ") ||
            formState.errors?._form?.join(", ") ||
            ""
          }
        />
        <Button variant="solid" radius="sm" className="h-11" type="submit">
          Add
        </Button>
      </form>
    </main>
  );
};

export default AddFriendPage;
