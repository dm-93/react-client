import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox
} from "@mui/material";

const MemberDialog = ({
  open,
  handleClose,
  handleSave,
  handleChange,
  isEditing,
  formData,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isEditing ? "Изменить участника" : "Создать участника"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Пожалуйста, заполните поля для {isEditing ? "изменения" : "создания"}{" "}
          участника.
        </DialogContentText>
        <TextField
          autoFocus
          required
          autoComplete="off"
          name="firstName"
          margin="dense"
          label="Имя"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="lastName"
          margin="dense"
          label="Фамилия"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="age"
          margin="dense"
          label="Возраст"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="weight"
          margin="dense"
          label="Вес"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.weight}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.gender}
              onChange={handleChange}
              name="gender"
              color="primary"
            />
          }
          label="Пол (Мужчина)"
        />
        <TextField
          required
          autoComplete="off"
          name="phone"
          margin="dense"
          label="Телефон"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="email"
          margin="dense"
          label="Эл.Почта"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="address.street"
          margin="dense"
          label="Улица"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address.street}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="address.houseNr"
          margin="dense"
          label="Номер дома"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address.houseNr}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="address.appartmentNr"
          margin="dense"
          label="Номер квартиры"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address.appartmentNr}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="address.city"
          margin="dense"
          label="Город"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address.city}
          onChange={handleChange}
        />
        <TextField
          required
          autoComplete="off"
          name="address.zip"
          margin="dense"
          label="Почтовый индекс"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.address.zip}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Закрыть
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          {isEditing ? "Изменить" : "Создать"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberDialog;
