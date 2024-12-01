export class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async findById(id) {
    try {
      return await this.model.findOne({ where: { id: id } });
    } catch (error) {
      return null;
    }
  }

  async findByEmail(email) {
    try {
      return await this.model.findOne({ where: { correo: email } });
    } catch (error) {
      return null;
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      return null;
    }
  }
}
