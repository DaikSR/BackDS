import models from "../models/index.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { UserRepository } from "../repositories/user.repository.js";

const productRepository = new ProductRepository(models.Producto);

const userRepository = new UserRepository(models.Usuario);

import bcrypt from "bcrypt";

class SeedController {
  async seed(req, res) {
    try {
      const products = [
        {
          titulo: "Ramo de Rosas Rojas",
          image: "https://via.placeholder.com/150/rosas-rojas.jpg",
          precio: 120,
          description: "Un hermoso ramo de 12 rosas rojas frescas.",
          content: "Content dynamic",
          detail:
            "Perfecto para ocasiones románticas como aniversarios o Día de San Valentín.",
        },
        {
          titulo: "Caja de Tulipanes",
          image: "https://via.placeholder.com/150/tulipanes.jpg",
          precio: 150,
          description: "Tulipanes frescos en una elegante caja decorativa.",
          content: "Content dynamic",
          detail:
            "Un regalo elegante y sofisticado para cualquier ocasión especial.",
        },
        {
          titulo: "Arreglo Floral Tropical",
          image: "https://via.placeholder.com/150/arreglo-tropical.jpg",
          precio: 200,
          description: "Un vibrante arreglo floral con flores tropicales.",
          content: "Content dynamic",
          detail:
            "Ideal para decorar espacios y sorprender en eventos importantes.",
        },
        {
          titulo: "Gift Box: Amor y Dulzura",
          image: "https://via.placeholder.com/150/gift-box.jpg",
          precio: 250,
          description: "Una caja con flores, chocolates y una vela aromática.",
          content: "Content dynamic",
          detail: "Perfecta para un detalle romántico y significativo.",
        },
        {
          titulo: "Orquídea Blanca en Maceta",
          image: "https://via.placeholder.com/150/orquidea.jpg",
          precio: 300,
          description: "Una elegante orquídea blanca en una maceta decorativa.",
          content: "Content dynamic",
          detail: "Un regalo refinado para amantes de las plantas.",
        },
        {
          titulo: "Ramo Silvestre",
          image: "https://via.placeholder.com/150/ramo-silvestre.jpg",
          precio: 110,
          description: "Un ramo de flores silvestres y frescas.",
          content: "Content dynamic",
          detail: "Perfecto para expresar gratitud o celebrar la naturaleza.",
        },
        {
          titulo: "Rosas Arcoíris",
          image: "https://via.placeholder.com/150/rosas-arcoiris.jpg",
          precio: 180,
          description: "Un ramo de rosas teñidas en colores vibrantes.",
          content: "Content dynamic",
          detail: "Un regalo único y colorido para alegrar el día de alguien.",
        },
        {
          titulo: "Bouquet Clásico",
          image: "https://via.placeholder.com/150/bouquet-clasico.jpg",
          precio: 95,
          description: "Un bouquet tradicional con rosas y lilas.",
          content: "Content dynamic",
          detail: "Una elección elegante para cualquier evento especial.",
        },
        {
          titulo: "Florero de Lirios Blancos",
          image: "https://via.placeholder.com/150/florero-lirios.jpg",
          precio: 140,
          description: "Un florero lleno de lirios blancos fragantes.",
          content: "Content dynamic",
          detail: "Un regalo lleno de pureza y elegancia.",
        },
        {
          titulo: "Ramo de Girasoles",
          image: "https://via.placeholder.com/150/girasoles.jpg",
          precio: 130,
          description: "Un radiante ramo de girasoles amarillos.",
          content: "Content dynamic",
          detail: "Perfecto para alegrar el día de alguien especial.",
        },
        {
          titulo: "Gift Box: Navidad Encantada",
          image: "https://via.placeholder.com/150/navidad.jpg",
          precio: 220,
          description: "Un set de flores y dulces temático navideño.",
          content: "Content dynamic",
          detail: "Ideal para regalar en Navidad y expresar buenos deseos.",
        },
        {
          titulo: "Caja de Flores y Macarons",
          image: "https://via.placeholder.com/150/flores-macarons.jpg",
          precio: 270,
          description: "Un regalo delicioso y hermoso con flores y macarons.",
          content: "Content dynamic",
          detail: "Perfecto para ocasiones románticas o celebraciones.",
        },
        {
          titulo: "Arreglo de Flores Secas",
          image: "https://via.placeholder.com/150/flores-secas.jpg",
          precio: 160,
          description: "Un arreglo duradero con flores secas naturales.",
          content: "Content dynamic",
          detail: "Ideal para decoración del hogar o regalos únicos.",
        },
        {
          titulo: "Cesta de Frutas y Flores",
          image: "https://via.placeholder.com/150/cesta-frutas.jpg",
          precio: 350,
          description: "Una cesta combinada con frutas y flores frescas.",
          content: "Content dynamic",
          detail:
            "Perfecta para regalos corporativos o celebraciones familiares.",
        },
        {
          titulo: "Mini Jardín Suculento",
          image: "https://via.placeholder.com/150/suculentas.jpg",
          precio: 180,
          description: "Un mini jardín con suculentas variadas.",
          content: "Content dynamic",
          detail: "Un regalo duradero para amantes de las plantas.",
        },
        {
          titulo: "Rosas Blancas de Lujo",
          image: "https://via.placeholder.com/150/rosas-blancas.jpg",
          precio: 200,
          description: "Un elegante ramo de rosas blancas premium.",
          content: "Content dynamic",
          detail: "Un regalo ideal para bodas o aniversarios importantes.",
        },
      ];

      await Promise.all(
        products.map(async (product) => {
          await productRepository.create(product);
        })
      );

      await userRepository.create({
        nombre_completo: "Admin",
        correo: "admin@admin.com",
        contrasena: bcrypt.hashSync("admin", 10),
        role: "admin",
      });

      res.status(200).json({ message: "Base de datos inicializada" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al inicializar la base de datos" });
    }
  }
}

export const seedController = new SeedController();
