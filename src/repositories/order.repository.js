export class OrderRepository {
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

  async delete(id) {
    try {
      return await this.model.destroy({ where: { id } });
    } catch (error) {
      return null;
    }
  }

  async findByUserId(userId) {
    try {
      return await this.model.findAll({ where: { user_id: userId } });
    } catch (error) {
      return null;
    }
  }

  async findAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      return null;
    }
  }
}
