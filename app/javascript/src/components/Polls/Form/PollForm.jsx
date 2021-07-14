import React from "react";
import Button from "components/Button";
import Input from "components/Input";

const PollForm = ({
  type = "create",
  title,
  setTitle,
  option_1,
  setOption_1,
  option_2,
  setOption_2,
  option_3,
  setOption_3,
  option_4,
  setOption_4,
  loading,
  handleSubmit,
}) => {
  return (
    <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
      <Input
        label="Title"
        placeholder="Enter Poll"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Input
        label="First Option"
        placeholder="Option 1"
        value={option_1}
        onChange={e => setOption_1(e.target.value)}
      />

      <Input
        label="Second Option"
        placeholder="Option 2"
        value={option_2}
        onChange={e => setOption_2(e.target.value)}
      />

      <Input
        label="Third Option"
        placeholder="Option 3"
        value={option_3}
        onChange={e => setOption_3(e.target.value)}
      />

      <Input
        label="Fourth Option"
        placeholder="Option 4"
        value={option_4}
        onChange={e => setOption_4(e.target.value)}
      />
      <Button
        type="submit"
        buttonText={type === "create" ? "Create Poll" : "Update Poll"}
        loading={loading}
      />
    </form>
  );
};

export default PollForm;
