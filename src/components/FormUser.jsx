import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./styles/FormUser.css";

const FormUser = ({
  createUser,
  userSelected,
  updateUser,
  setUserSelected,
  formIsOpen,
  setFormIsOpen
}) => {
  const [showPwd, setShowPwd] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(userSelected);
  }, [userSelected]);

  const currentDate = new Date().toISOString().split("T")[0];

  const submit = (data) => {
    if (userSelected) {
      // Update
      updateUser(userSelected.id, data);
      setUserSelected();
    } else {
      // Create
      createUser(data);
    }
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
      image_url: "",
    });
    setFormIsOpen(false);
  };

  const handleExit = () => {
    setFormIsOpen(false);
    reset({
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "",
      image_url: "",
    });
  };

  return (
    <div className={`form-container ${formIsOpen || "form__close"}`}>
      <form className="form" onSubmit={handleSubmit(submit)}>
        <span onClick={handleExit} className="form__exit">
          x
        </span>
        <h2 className="form__title">
          {userSelected ? "Register Form" : "New User"}
        </h2>
        <div className="form__list">
          <label className="form__field">
            <span className="form__label">Email</span>
            <input
              className="form__input"
              {...register("email")}
              type="email"
              placeholder="e.g. alex@smith.com"
              required
            />
          </label>
          <div className="input-container" onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? (
              <svg
                className="form__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="form__icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
              </svg>
            )}
            <label className="form__field">
              <span className="form__label">Password</span>
              <input
                className={`form__input ${errors.password ? 'error' : ''}`}
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "¡Incorrecto! Debe tener mínimo 8 caracteres",
                  },
                })}
                type={showPwd ? "text" : "password"}
                required
              />
              <p className={`error-message ${errors.password ? 'active' : ''}`}>{errors.password?.message}</p>
            </label>
          </div>
          <label className="form__field">
            <span className="form__label"> First Name</span>
            <input
              className="form__input"
              {...register("first_name")}
              type="text"
              required
            />
          </label>
          <label className="form__field">
            <span className="form__label">Last Name</span>
            <input
              className="form__input"
              {...register("last_name")}
              type="text"
              required
            />
          </label>
          <label className="form__field">
            <span className="form__label">Birthday</span>
            <input
              className="form__input"
              {...register("birthday")}
              type="date"
              max={currentDate} //Establece la fecha maxima a la actual
              required
            />
          </label>
          <label className="form__field">
            <span className="form__label">Image url</span>
            <input
              className="form__input"
              {...register("image_url")}
              type="url"
              placeholder="Enter image URL"
              required
            />
          </label>
        </div>
        <button className="form__btn">Submit</button>
      </form>
    </div>
  );
};

export default FormUser;
