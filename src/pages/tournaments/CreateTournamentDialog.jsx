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

const CreateTournamentDialog = ({
  handleSave,
  handleClose,
  handleChange,
  open,
  formData,
  setFormData,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        TournamentPictureBase64: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

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
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="16px"
          marginY="normal"
        >
          <Button variant="contained" component="label">
            Загрузить картинку
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </Box>
        {formData.TournamentPictureBase64 && (
          <Box display="flex" justifyContent="center" marginY="normal">
            <img
              src={formData.TournamentPictureBase64}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          </Box>
        )}
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
