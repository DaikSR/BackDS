export class CartRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      return null;
    }
  }

  async update(data, id) {
    try {
      return await this.model.update(data, {
        where: { id },
      });
    } catch (error) {
      return null;
    }
  }

  async findProductByUserId(productId, userId) {
    try {
      return await this.model.findAll({
        where: { user_id: userId, product_id: productId },
      });
    } catch (error) {
      return null;
    }
  }

  async incrementQuantity(quantityActual, id) {
    try {
      return await this.model.update(
        { quantity: quantityActual + 1 },
        {
          where: { id },
        }
      );
    } catch (error) {
      return null;
    }
  }

  async findCartByUserId(userId) {
    try {
      return await this.model.findAll({ where: { user_id: userId } });
    } catch (error) {
      return null;
    }
  }

  async removeProductFromCart(id) {
    try {
      return await this.model.destroy({
        where: { id: id },
      });
    } catch (error) {
      return null;
    }
  }

  async deleleCart(id) {
    try {
      return await this.model.destroy({ where: { id } });
    } catch (error) {
      return null;
    }
  }
}
