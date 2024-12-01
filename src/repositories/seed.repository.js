export async function seedRepository(){ 

  try {
    const queryDatabase = `create database app_backend;`;

  } catch (error) {
    return {
      status: false,
      message: error.message
    }
  }

}