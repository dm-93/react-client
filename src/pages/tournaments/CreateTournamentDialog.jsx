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

const CreateTournamentDialog = ({ handleSave, handleClose, handleChange, open, formData }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Создать соревнование</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Пожалуйста заполните поля для создания нового соревнования.
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
          required
          name="startDate"
          margin="dense"
          label="Дата начала соревнования"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.startDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          name="endDate"
          margin="dense"
          label="Дата завершения соревнования"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.endDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
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

export default CreateTournamentDialog;
