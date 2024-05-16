import "./styles/UserCard.css";

const UserCard = ({ user, deleteUsers, setUserSelected, setFormIsOpen }) => {
  
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "¿Está seguro de que desea eliminar este usuario?"
    );
    if (isConfirmed) {
      deleteUsers(user.id);
    }
  };

  const handleEdit = () => {
    setUserSelected(user);
    setFormIsOpen(true);
  };

  const handleImageUrlClick = (image_url) => {
    window.open(image_url);
  };

  return (
    <article className="user">
      <h3 className="user__name">
        {user.first_name} {user.last_name}
      </h3>
      <hr className="user__hr" />
      <ul className="user__list">
        <li className="user__item">
          <span className="user__label">Email</span>
          <span className="user__value">{user.email}</span>
        </li>
        <li className="user__item">
          <span className="user__label">Birthday</span>
          <span className="user__value">{user.birthday}</span>
        </li>
        <li className="user__item">
          <span className="user__label">Imagen</span>
          <img
            className="user__value url-image"
            src={user.image_url}
            alt="User Image"
            onClick={() => handleImageUrlClick(user.image_url)}
          />
        </li>
      </ul>
      <footer className="user__footer">
        <button className="user__btn user__delete" onClick={handleDelete}>
          <i className="bx bxs-trash"></i>
        </button>
        <button className="user__btn user__edit" onClick={handleEdit}>
          <i className="bx bx-edit"></i>
        </button>
      </footer>
    </article>
  );
};

export default UserCard;
