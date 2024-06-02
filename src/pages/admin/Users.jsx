import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import http from "../../api/http";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await http.get("/api/Admin");
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.userId !== userId));
  };

  const handleDeleteRole = (userId, role) => {
    setUsers(
      users.map((user) =>
        user.userId === userId
          ? { ...user, roles: user.roles.filter((r) => r !== role) }
          : user
      )
    );
  };

  const handleEditRoles = (user) => {
    setEditUser(user);
  };

  const handleAddRole = () => {
    if (newRole && editUser) {
      setUsers(
        users.map((user) =>
          user.userId === editUser.userId
            ? { ...user, roles: [...user.roles, newRole] }
            : user
        )
      );
      http.post("/api/Admin/addRole", {id: editUser.userId, roleName: newRole})
      setNewRole("");
      setEditUser(null);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="users table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Имя</TableCell>
            <TableCell>Роль</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>
                {user.roles &&
                  user.roles.map((role) => (
                    <div
                      key={role}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {role}
                      <IconButton
                        onClick={() => handleDeleteRole(user.userId, role)}
                        size="small"
                        color="secondary"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </div>
                  ))}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDeleteUser(user.userId)}
                  color="secondary"
                >
                  <Delete />
                </IconButton>
                <IconButton
                  onClick={() => handleEditRoles(user)}
                  color="primary"
                >
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editUser && (
        <Dialog open={Boolean(editUser)} onClose={() => setEditUser(null)}>
          <DialogTitle>Редактировать роль</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Добавить новую роль для {editUser.userName}
            </DialogContentText>
            <FormControl fullWidth margin="dense">
              <InputLabel id="role-select-label">Новая роль</InputLabel>
              <Select
                labelId="role-select-label"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                label="New Role"
              >
                <MenuItem value="Admin">Администратор</MenuItem>
                <MenuItem value="User">Пользователь</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditUser(null)} color="primary">
              Закрыть
            </Button>
            <Button onClick={handleAddRole} color="primary">
              Добавить роль
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </TableContainer>
  );
};

export default Users;
