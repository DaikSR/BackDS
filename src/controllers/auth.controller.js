import models from "../models/index.js";
import { UserRepository } from "../repositories/user.repository.js";

const userRepository = new UserRepository(models.Usuario);

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class AuthController {
  async login(req, res) {
    const body = req.body;

    if (body.email && body.password) {
      const user = await userRepository.findByEmail(body.email);

      if (user) {
        const isPasswordCorrect = bcrypt.compareSync(
          body.password,
          user.contrasena
        );

        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              id: user.id,
            },
            "jwt-secret"
          );
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Contraseña incorrecta" });
        }
      } else {
        res.status(401).json({ message: "Error en la autenticación" });
      }
    } else {
      res.status(400).json({ message: "Faltan datos para la autenticación" });
    }
  }

  async register(req, res) {
    try {
      const body = req.body;

      if (body.email && body.password && body.nombre_completo) {
        const user = await userRepository.findByEmail(body.email);

        if (user) {
          res.status(400).json({ message: "El usuario ya existe" });
        } else {
          const hashedPassword = bcrypt.hashSync(body.password, 10);
          const newUser = await userRepository.create({
            nombre_completo: body.nombre_completo,
            correo: body.email,
            contrasena: hashedPassword,
            role: "user",
          });

          if (newUser) {
            const token = jwt.sign(
              {
                id: newUser.id,
              },
              "jwt-secret"
            );
            res.status(201).json({ token });
          } else {
            res.status(500).json({ message: "Error al registrar usuario" });
          }
        }
      } else {
        res.status(400).json({ message: "Faltan datos para el registro" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  }

  async update(req, res) {
    try {
      const body = req.body;

      let token = req.headers.authorization;

      token = token.split(" ")[1];

      const tokenDecrypt = jwt.verify(token, "jwt-secret");

      const user = await userRepository.findById(tokenDecrypt.id);

      if (body.email && body.nombre_completo) {
        const newUser = await userRepository.update(
          {
            nombre_completo: body.nombre_completo,
            correo: body.email,
          },
          user.id
        );

        if (newUser) {
          const token = jwt.sign(
            {
              id: newUser.id,
            },
            "jwt-secret"
          );
          res.status(201).json({ token });
        } else {
          res.status(500).json({ message: "Error al registrar usuario" });
        }
      } else if (body.email && body.nombre_completo && body.password) {
        const hashedPassword = bcrypt.hashSync(body.password, 10);
        const newUser = await userRepository.update(
          {
            nombre_completo: body.nombre_completo,
            correo: body.email,
            contrasena: hashedPassword,
          },
          user.id
        );

        if (newUser) {
          const token = jwt.sign(
            {
              id: newUser.id,
            },
            "jwt-secret"
          );
          res.status(201).json({ token });
        } else {
          res.status(500).json({ message: "Error al registrar usuario" });
        }
      } else {
        res.status(400).json({ message: "Faltan datos para el registro" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al registrar usuario" });
    }
  }

  async me(req, res) {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "jwt-secret", async (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Error en la autenticación" });
        } else {
          const user = await userRepository.findById(decoded.id);

          res.status(200).json({ user });
        }
      });
    } else {
      res.status(401).json({ message: "Error en la autenticación" });
    }
  }

  verfyToken(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
      const tokenValue = token.split(" ")[1];
      jwt.verify(tokenValue, "jwt-secret", async (err, decoded) => {
        if (err) {
          res.status(401).json({ message: "Error en la autenticación" });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({ message: "Error en la autenticación" });
    }
  }
}

export const authController = new AuthController();
