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
          descripcion: "Un hermoso ramo de 12 rosas rojas frescas.",
          content: [
            "12 rosas rojas de tallo largo",
            "Decoración con follaje verde",
            "Papel kraft y lazo rojo"
          ],
          detail: "Perfecto para ocasiones románticas como aniversarios o Día de San Valentín."
        },
        {
          titulo: "Caja de Tulipanes",
          image: "https://via.placeholder.com/150/tulipanes.jpg",
          precio: 150,
          descripcion: "Tulipanes frescos en una elegante caja decorativa.",
          content: [
            "10 tulipanes variados",
            "Caja rígida con lazo de seda",
            "Tarjeta para dedicatoria"
          ],
          detail: "Un regalo elegante y sofisticado para cualquier ocasión especial."
        },
        {
          titulo: "Arreglo Floral Tropical",
          image: "https://via.placeholder.com/150/arreglo-tropical.jpg",
          precio: 200,
          descripcion: "Un vibrante arreglo floral con flores tropicales.",
          content: [
            "Anturios, heliconias y orquídeas",
            "Base de cerámica decorativa",
            "Decoración con hojas exóticas"
          ],
          detail: "Ideal para decorar espacios y sorprender en eventos importantes."
        },
        {
          titulo: "Gift Box: Amor y Dulzura",
          image: "https://via.placeholder.com/150/gift-box.jpg",
          precio: 250,
          descripcion: "Una caja con flores, chocolates y una vela aromática.",
          content: [
            "Rosas rosadas frescas",
            "Caja de chocolates gourmet",
            "Vela aromática de lavanda"
          ],
          detail: "Perfecta para un detalle romántico y significativo."
        },
        {
          titulo: "Orquídea Blanca en Maceta",
          image: "https://via.placeholder.com/150/orquidea.jpg",
          precio: 300,
          descripcion: "Una elegante orquídea blanca en una maceta decorativa.",
          content: [
            "Orquídea phalaenopsis",
            "Maceta de cerámica blanca",
            "Decoración minimalista"
          ],
          detail: "Un regalo refinado para amantes de las plantas."
        },
        {
          titulo: "Ramo Silvestre",
          image: "https://via.placeholder.com/150/ramo-silvestre.jpg",
          precio: 110,
          descripcion: "Un ramo de flores silvestres y frescas.",
          content: [
            "Margaritas, girasoles y lirios",
            "Decoración rústica",
            "Tarjeta personalizada"
          ],
          detail: "Perfecto para expresar gratitud o celebrar la naturaleza."
        },
        {
          titulo: "Rosas Arcoíris",
          image: "https://via.placeholder.com/150/rosas-arcoiris.jpg",
          precio: 180,
          descripcion: "Un ramo de rosas teñidas en colores vibrantes.",
          content: [
            "6 rosas arcoíris",
            "Base de cristal",
            "Decoración con follaje"
          ],
          detail: "Un regalo único y colorido para alegrar el día de alguien."
        },
        {
          titulo: "Bouquet Clásico",
          image: "https://via.placeholder.com/150/bouquet-clasico.jpg",
          precio: 95,
          descripcion: "Un bouquet tradicional con rosas y lilas.",
          content: [
            "Rosas rojas y lilas blancas",
            "Decoración con gypsophila",
            "Papel kraft clásico"
          ],
          detail: "Una elección elegante para cualquier evento especial."
        },
        {
          titulo: "Florero de Lirios Blancos",
          image: "https://via.placeholder.com/150/florero-lirios.jpg",
          precio: 140,
          descripcion: "Un florero lleno de lirios blancos fragantes.",
          content: [
            "12 lirios blancos",
            "Florero de vidrio",
            "Decoración con cinta satinada"
          ],
          detail: "Un regalo lleno de pureza y elegancia."
        },
        {
          titulo: "Ramo de Girasoles",
          image: "https://via.placeholder.com/150/girasoles.jpg",
          precio: 130,
          descripcion: "Un radiante ramo de girasoles amarillos.",
          content: [
            "6 girasoles frescos",
            "Decoración con follaje verde",
            "Papel kraft amarillo"
          ],
          detail: "Perfecto para alegrar el día de alguien especial."
        },
        {
          titulo: "Gift Box: Navidad Encantada",
          image: "https://via.placeholder.com/150/navidad.jpg",
          precio: 220,
          descripcion: "Un set de flores y dulces temático navideño.",
          content: [
            "Arreglo de flores rojas y blancas",
            "Caja de bombones navideños",
            "Decoración temática"
          ],
          detail: "Ideal para regalar en Navidad y expresar buenos deseos."
        },
        {
          titulo: "Caja de Flores y Macarons",
          image: "https://via.placeholder.com/150/flores-macarons.jpg",
          precio: 270,
          descripcion: "Un regalo delicioso y hermoso con flores y macarons.",
          content: [
            "Rosas rosadas y lilas",
            "6 macarons de sabores variados",
            "Caja decorativa"
          ],
          detail: "Perfecto para ocasiones románticas o celebraciones."
        },
        {
          titulo: "Arreglo de Flores Secas",
          image: "https://via.placeholder.com/150/flores-secas.jpg",
          precio: 160,
          descripcion: "Un arreglo duradero con flores secas naturales.",
          content: [
            "Flores secas variadas",
            "Base de madera",
            "Decoración rústica"
          ],
          detail: "Ideal para decoración del hogar o regalos únicos."
        },
        {
          titulo: "Cesta de Frutas y Flores",
          image: "https://via.placeholder.com/150/cesta-frutas.jpg",
          precio: 350,
          descripcion: "Una cesta combinada con frutas y flores frescas.",
          content: [
            "Manzanas, uvas y peras",
            "Arreglo floral",
            "Cesta de mimbre"
          ],
          detail: "Perfecta para regalos corporativos o celebraciones familiares."
        },
        {
          titulo: "Mini Jardín Suculento",
          image: "https://via.placeholder.com/150/suculentas.jpg",
          precio: 180,
          descripcion: "Un mini jardín con suculentas variadas.",
          content: [
            "5 suculentas decorativas",
            "Base de cerámica",
            "Decoración con piedras blancas"
          ],
          detail: "Un regalo duradero para amantes de las plantas."
        },
        {
          titulo: "Rosas Blancas de Lujo",
          image: "https://via.placeholder.com/150/rosas-blancas.jpg",
          precio: 200,
          descripcion: "Un elegante ramo de rosas blancas premium.",
          content: [
            "12 rosas blancas de calidad premium",
            "Decoración con gypsophila",
            "Caja rígida de lujo"
          ],
          detail: "Un regalo ideal para bodas o aniversarios importantes."
        }
      ];
      
      products.forEach(async (product) => {
        await productRepository.create(product);
      });

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
