export class CartRepository {
  constructor(model) {
    this.model = model;
  }

  async findCartByUserId(userId) {
    try {
      return await this.model.findOne({ where: { id: id } });
    } catch (error) {
      return null;
    }
  }

  async findById(id) {
    try {
      return await this.model.findOne({ where: { id: id } });
    } catch (error) {
      return null;
    }
  }
}
