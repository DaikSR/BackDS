export class ProductRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll() {
    try {
      return await this.model.findAll();
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
