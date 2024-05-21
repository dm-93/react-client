import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Box,
} from "@mui/material";

const TeamDialog = ({
  handleSave,
  handleClose,
  handleChange,
  isEditing,
  open,
  formData,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditing ? "Изменить команду" : "Создать команду"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Пожалуйста заполните поля для {isEditing ? "изменения" : "создания"} команды.
        </DialogContentText>
        <TextField
          autoFocus
          required
          autoComplete="off"
          name="name"
          margin="dense"
          label="Название"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
         <TextField
          autoComplete="off"
          name="description.description"
          margin="dense"
          label="Описание"
          type="text"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={formData.description.description}
          onChange={handleChange}
        />
        <TextField
          autoComplete="off"
          name="description.schoolNr"
          margin="dense"
          label="Номер школы"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.description.schoolNr}
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

export default TeamDialog;
