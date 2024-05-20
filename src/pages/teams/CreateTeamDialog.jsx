import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const CreateTeamDialog = ({ handleSave, handleClose, handleChange, open, formData }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Создать команду</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Пожалуйста заполните поля для создания новой команды.
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
          autoFocus
          autoComplete="off"
          name="name"
          margin="dense"
          label="Номер школы"
          type="text"
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
          Создать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeamDialog;