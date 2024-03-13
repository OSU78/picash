import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput = ({ password, handlePassword }) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleBlur = () => {
    // Lorsque l'utilisateur n'est plus en focus, cachez le mot de passe
    setShowPassword(false);
  };

  return (
    <TextField
      style={{
        maxWidth: "300px",
        borderRadius: "10px"
      }}
      // Utilisez l'état showPassword pour basculer entre type="text" et type="password"
      type={showPassword ? "text" : "password"}
      label="Password"
      value={password}
      onChange={handlePassword}
      onBlur={handleBlur} // Ajout de l'événement onBlur
      required={true}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default PasswordInput;
