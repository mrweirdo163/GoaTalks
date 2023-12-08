import React, { useContext, useEffect } from "react";
import { Button } from "components/button";
import { Field } from "components/field";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import TextArea from "components/input/TextArea";
import { authContext } from "contexts/authContext";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const {
    authState: { user },
    updateUser,
  } = useContext(authContext);

  const updateuser = async (values) => {
    /*
    let last_username, last_password, last_email, last_description, last_number
    last_username = values.username ? values.form_username : username
    last_password = values.password ? values.password : password
    last_email = values.email ? values.email : email
    last_description = values.textarea ? values.textarea : ""
    last_number = values.number ? values.number : ""
    let last_values = {last_username, last_email, last_number, last_password, last_description}
    */
    console.log(values);
    let { username, email, contact, password, textarea } = values;
    username = username == undefined ? user.username : username;
    password = password == undefined ? user.password : password;
    email = email == undefined ? user.email : email;
    const description = textarea !== "" ? textarea : user.description;
    //console.log({username, email, password, contact, description})
    const id = user._id;
    console.log({ username, email, password, contact, description, id });
    try {
      const updateData = await updateUser(
        { username, email, password, contact, description, id },
        user._id
      );
      if (updateData["success"]) {
        toast.success(`User updated successfully`);
        console.log(updateData["message"]);
        setTimeout(1000);
        window.location.reload(true);
      } else {
        toast.error(updateData["message"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Account Information"
        desc="Update your account information"
      ></DashboardHeading>
      <form
        classname="form"
        onSubmit={handleSubmit(updateuser)}
        autoComplete="off"
      >
        <div className="solo-form-layout">
          <Field>
            <ImageUpload className="p-5 rounded-full"></ImageUpload>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder={user.username}
            ></Input>
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder={user.email}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Contact Number</Label>
            <Input
              control={control}
              name="contact"
              placeholder={user.contact}
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPasswordToggle
              control={control}
              defaultValue={`${user.password}`}
            ></InputPasswordToggle>
          </Field>
        </div>
        <div className="solo-form-layout">
          <Label>Description</Label>
          <TextArea
            control={control}
            name="textarea"
            placeholder={user.description}
          ></TextArea>
        </div>
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
